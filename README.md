# Event Growth Copilot

Monorepo: FastAPI (backend) + PostgreSQL + Next.js (frontend).

## Backend quickstart

```bash
cd backend
# Use Python 3.12 (pydantic core wheels). If you have 3.13, prefer Docker or pyenv.
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn src.app:app --reload --port 8000
```

Health check: GET http://localhost:8000/health

## Migrations

See `db/migrations/0001_initial.sql` for the initial schema draft.

Run migration locally (requires `psql`):

```bash
export DATABASE_URL=postgres://user:pass@localhost:5432/egc
bash scripts/migrate.sh
```

## Frontend quickstart

```bash
cd app/web
npm run dev
```

Landing: http://localhost:3000
Dashboard: http://localhost:3000/dashboard

## Docker (recommended for consistent toolchains)

```bash
docker compose up --build
```

Services:
- API: http://localhost:8000
- Web: http://localhost:3000
- Postgres: localhost:5432 (postgres/postgres)
- Redis: localhost:6379


