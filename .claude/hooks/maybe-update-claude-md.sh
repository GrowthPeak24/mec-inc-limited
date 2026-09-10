#!/usr/bin/env bash
# Stop hook — two jobs.
#
# 1. Mirror CLAUDE.md into AGENTS.md. CLAUDE.md is the single source of
#    truth; AGENTS.md is generated from it and differs only in the title
#    and the guidance line. This runs on every Stop, before any of the
#    bails below, because a turn that edits CLAUDE.md leaves no source
#    file newer than it and would otherwise exit early without syncing.
#
# 2. If this session materially changed source files AND the codebase
#    currently type-checks, prompt for a CLAUDE.md review — only if a new
#    architectural pattern, locked constraint, gotcha, or command emerged.
#    Fires at most once per session (SessionStart hook clears the flag).
#
# Exit code 0 = allow Stop; exit code 2 with stderr = block Stop and
# inject the stderr text as a follow-up instruction.

set -e
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$PROJECT_DIR" || exit 0

FLAG=".claude/.claude-md-prompted"
CLAUDE_MD="CLAUDE.md"
AGENTS_MD="AGENTS.md"

# Nothing to keep in sync if CLAUDE.md doesn't exist yet.
[ ! -f "$CLAUDE_MD" ] && exit 0

# ---------------------------------------------------------------------
# 1. Mirror CLAUDE.md -> AGENTS.md
# ---------------------------------------------------------------------
# Only the title and the guidance line differ. Both substitutions are
# anchored full-line matches, so prose elsewhere that happens to mention
# CLAUDE.md is left alone.
MIRRORED=0
EXPECTED="$(mktemp)"
trap 'rm -f "$EXPECTED"' EXIT

sed \
  -e '1s|^# CLAUDE\.md$|# AGENTS.md|' \
  -e 's|^This file provides guidance to Claude Code (claude\.ai/code) when working with code in this repository\.$|This file provides guidance to Codex when working with code in this repository.|' \
  "$CLAUDE_MD" > "$EXPECTED"

# Refuse to clobber with an empty or obviously truncated render.
if [ -s "$EXPECTED" ] && [ "$(wc -c < "$EXPECTED")" -ge "$(( $(wc -c < "$CLAUDE_MD") - 200 ))" ]; then
  if ! cmp -s "$EXPECTED" "$AGENTS_MD" 2>/dev/null; then
    cp "$EXPECTED" "$AGENTS_MD"
    MIRRORED=1
  fi
fi

mirror_note() {
  echo "AGENTS.md was regenerated from CLAUDE.md by the Stop hook (they differ only in the title and guidance line)."
  echo "Commit it alongside the CLAUDE.md change so the pair does not drift."
}

# Exit path used by every early bail below: still surface a mirror rewrite.
finish() {
  if [ "$MIRRORED" -eq 1 ]; then
    mirror_note >&2
    exit 2
  fi
  exit 0
}

# ---------------------------------------------------------------------
# 2. Conservative CLAUDE.md review prompt
# ---------------------------------------------------------------------

# Bail: already prompted this session.
[ -f "$FLAG" ] && finish

# Which source files are newer than CLAUDE.md?
# Restrict to code paths that describe architecture — content/, actions/,
# lib/, schema/, components/, app/, migrations, config, package.json.
NEWER=$(
  {
    find src -type f \( -name '*.ts' -o -name '*.tsx' \) -newer "$CLAUDE_MD" 2>/dev/null
    find supabase -type f -name '*.sql' -newer "$CLAUDE_MD" 2>/dev/null
    find . -maxdepth 2 -type f \
      \( -name 'next.config.*' -o -name 'package.json' -o -name 'tsconfig.json' \) \
      -newer "$CLAUDE_MD" 2>/dev/null
  } | grep -v '^$' || true
)

# No qualifying changes — CLAUDE.md is current with respect to code mtime.
[ -z "$NEWER" ] && finish

# Require typecheck to pass — proxy for "implemented and tested".
if ! npx --no-install tsc --noEmit >/dev/null 2>&1; then
  # Typecheck failed — feature isn't "done" yet; skip the review prompt.
  finish
fi

# Set the flag so we don't loop within the same session.
mkdir -p .claude
touch "$FLAG"

# Emit a conservative follow-up via stderr + exit 2.
{
  echo "Post-turn CLAUDE.md check: source files were modified this session and typecheck is clean."
  echo ""
  echo "Files newer than CLAUDE.md:"
  echo "$NEWER" | head -30
  echo ""
  echo "Review these changes and update CLAUDE.md ONLY if a new architectural pattern, locked constraint, gotcha, or command emerged that a future session would benefit from. Be conservative:"
  echo "  - SKIP bug fixes, refactors that don't change the mental model, or edits to already-documented areas."
  echo "  - SKIP anything obvious from reading the code itself."
  echo "  - UPDATE for new client components (they contribute to the ceiling), new env vars, new commands, new gotchas, new external dependencies, or migrations that change RLS/CHECK invariants."
  echo ""
  echo "Edit CLAUDE.md only — AGENTS.md is generated from it by this hook."
  echo ""
  echo "If nothing new to document, reply with exactly: 'CLAUDE.md is current — no changes needed.' and stop. Do not restate what changed."
  if [ "$MIRRORED" -eq 1 ]; then
    echo ""
    mirror_note
  fi
} >&2
exit 2
