@echo off
echo Starting Match Management Application...
echo.
echo ============================================
echo Starting Backend API (FastAPI)...
echo ============================================
cd backend
start cmd /k "python -m pip install -q -r requirements.txt 2>nul && uvicorn main:app --reload --port 8000"

timeout /t 3 /nobreak

echo.
echo ============================================
echo Starting Frontend (React + Vite)...
echo ============================================
cd ..\frontend
start cmd /k "npm install -q 2>nul || npm install && npm run dev"

cd ..
echo.
echo ============================================
echo ✅ Both servers starting!
echo ============================================
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo Docs:     http://localhost:8000/docs
echo.
echo Press Ctrl+C in either terminal to stop the servers.
pause
