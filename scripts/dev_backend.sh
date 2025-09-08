#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."/backend

python3 -m venv .venv || true
source .venv/bin/activate
pip install -r requirements.txt

uvicorn src.app:app --reload --port 8000

