@echo off
cd /d ..
start cmd /k npx @11ty/eleventy --serve
start chrome http://localhost:49100/
