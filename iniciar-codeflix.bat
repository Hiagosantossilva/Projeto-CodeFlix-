@echo off
cd /d "%~dp0"
title CodeFlix - npm start
set BROWSER=none
set HOST=127.0.0.1
set PORT=3000
npm start
