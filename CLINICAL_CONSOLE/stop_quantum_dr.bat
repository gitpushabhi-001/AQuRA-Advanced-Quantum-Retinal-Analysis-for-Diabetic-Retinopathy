@echo off
title Stop Quantum-DR Servers
color 0C

echo ======================================================================
echo              Stopping Quantum-DR Application Services
echo ======================================================================
echo.

echo Terminating processes on Port 8000 (Backend)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000') do (
    taskkill /f /pid %%a >nul 2>nul
)

echo Terminating processes on Port 5173 (Frontend)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do (
    taskkill /f /pid %%a >nul 2>nul
)

echo.
echo [OK] Quantum-DR backend and frontend servers have been stopped.
echo ======================================================================
pause
