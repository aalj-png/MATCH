#!/usr/bin/env bash

# Install dependencies
pip install -r requirements.txt

# Run migrations (if needed)
# python -m alembic upgrade head

# Start the application
uvicorn main:app --host 0.0.0.0 --port 8000
