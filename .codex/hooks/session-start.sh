#!/usr/bin/env bash
# SessionStart hook — clear the per-session "already prompted CLAUDE.md
# update" flag so the Stop hook can fire once per new session.
set -e
FLAG="${CLAUDE_PROJECT_DIR:-.}/.claude/.claude-md-prompted"
rm -f "$FLAG" 2>/dev/null || true
exit 0
