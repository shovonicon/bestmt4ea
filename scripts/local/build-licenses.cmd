@echo off
REM ---------------------------------------------------------------------------
REM Compile queued licence builds on this machine - no GitHub Actions needed.
REM
REM MetaEditor only runs on Windows, which is the only reason a CI runner was
REM ever involved. This does the same work locally: pull the queue, bind each
REM account number and expiry into the product's MQL source, compile, attach.
REM
REM Secrets come from .dev.vars. APP_URL defaults to production, but an
REM explicitly-set APP_URL wins, so you can aim this at localhost for testing.
REM
REM Keep this file ASCII-only: cmd.exe reads batch files in the OEM codepage,
REM so a stray UTF-8 character becomes a syntax error.
REM ---------------------------------------------------------------------------
cd /d "%~dp0..\.."

if not defined APP_URL set APP_URL=https://bestmt4ea.com

node scripts/local/with-env.mjs node scripts/build-licenses.mjs %*
