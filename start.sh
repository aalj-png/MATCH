#!/bin/bash

echo "Starting Match Management Application..."
echo ""
echo "============================================"
echo "Starting Backend API (FastAPI)..."
echo "============================================"

cd backend
pip install -q -r requirements.txt
uvicorn main:app --reload --port 8000 &

BACKEND_PID=$!

sleep 3

echo ""
echo "============================================"
echo "Starting Frontend (React + Vite)..."
echo "============================================"

cd ../frontend
npm install -q
npm run dev &

FRONTEND_PID=$!

cd ..

echo ""
echo "============================================"
echo "✅ Both servers starting!"
echo "============================================"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8000"
echo "Docs:     http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the servers."
echo ""

wait $BACKEND_PID $FRONTEND_PID
