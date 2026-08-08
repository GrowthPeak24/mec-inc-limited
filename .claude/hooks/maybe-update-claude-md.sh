#!/usr/bin/env bash
# Stop hook — if this session materially changed source files AND the
# codebase currently type-checks, prompt Claude to review the diff and
# update CLAUDE.md *only if* a new architectural pattern, locked
# constraint, gotcha, or command emerged. Fires at most once per
# session (SessionStart hook clears the flag).
#
# Exit code 0 = allow Stop; exit code 2 with stderr = block Stop and
# inject the stderr text as a follow-up instruction for Claude.

set -e
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$PROJECT_DIR" || exit 0

FLAG=".claude/.claude-md-prompted"
CLAUDE_MD="CLAUDE.md"

# Bail early: already prompted this session.
[ -f "$FLAG" ] && exit 0

# Nothing to keep in sync if CLAUDE.md doesn't exist yet.
[ ! -f "$CLAUDE_MD" ] && exit 0

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
[ -z "$NEWER" ] && exit 0

# Require typecheck to pass — proxy for "implemented and tested".
if ! npx --no-install tsc --noEmit >/dev/null 2>&1; then
  # Typecheck failed — feature isn't "done" yet; skip silently.
  exit 0
fi

# Set the flag so we don't loop within the same session.
mkdir -p .claude
touch "$FLAG"

# Emit a conservative follow-up for Claude via stderr + exit 2.
{
  echo "Post-turn CLAUDE.md check: source files were modified this session and typecheck is clean."
  echo ""
  echo "Files newer than CLAUDE.md:"
  echo "$NEWER" | head -30
  echo ""
  echo "Review these changes and update CLAUDE.md ONLY if a new architectural pattern, locked constraint, gotcha, or command emerged that a future Claude Code session would benefit from. Be conservative:"
  echo "  - SKIP bug fixes, refactors that don't change the mental model, or edits to already-documented areas."
  echo "  - SKIP anything obvious from reading the code itself."
  echo "  - UPDATE for new client components (they contribute to the ceiling), new env vars, new commands, new gotchas, new external dependencies, or migrations that change RLS/CHECK invariants."
  echo ""
  echo "If nothing new to document, reply with exactly: 'CLAUDE.md is current — no changes needed.' and stop. Do not restate what changed."
} >&2
exit 2
