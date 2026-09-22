@echo off
title Quantum-DR - Retinal Clinical Dashboard Launcher
color 0A

echo ======================================================================
echo           Quantum-DR Retinal Clinical Analysis Platform
echo                     One-Click System Launcher
echo ======================================================================
echo.

:: Ensure current working directory is the script directory
cd /d "%~dp0"

echo [1/3] Checking prerequisites...
where python >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Python is not installed or not found in system PATH.
    echo Please install Python and ensure it is added to your PATH.
    pause
    exit /b 1
)

where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js/npm is not installed or not found in system PATH.
    echo Please install Node.js and ensure npm is added to your PATH.
    pause
    exit /b 1
)
echo [OK] Python and Node.js detected.
echo.

echo [2/3] Starting Backend Server (FastAPI + PennyLane QPU)...
start "Quantum-DR Backend (Port 8000)" cmd /k "cd /d "%~dp0" && python backend/run.py"

echo [3/3] Starting Frontend Server (Vite + React)...
start "Quantum-DR Frontend (Port 5173)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Waiting for servers to initialize...
timeout /t 3 /nobreak >nul

echo Opening Quantum-DR Dashboard in default browser...
start http://localhost:5173/

echo.
echo ======================================================================
echo   Quantum-DR is now running!
echo   - Frontend: http://localhost:5173
echo   - Backend:  http://127.0.0.1:8000
echo   - API Docs: http://127.0.0.1:8000/docs
echo.
echo   Keep the server windows open while using the application.
echo   To shut down, you can simply close the server command windows
echo   or run stop_quantum_dr.bat.
echo ======================================================================
echo.
pause
