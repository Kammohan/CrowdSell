#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${DATABASE_URL:-}" ]]; then
	echo "DATABASE_URL is not set. Example: export DATABASE_URL=postgres://user:pass@localhost:5432/egc"
	exit 1
fi

echo "Applying migrations to ${DATABASE_URL}"
psql "${DATABASE_URL}" -v ON_ERROR_STOP=1 -f "$(dirname "$0")/../db/migrations/0001_initial.sql"
echo "Migrations applied."

