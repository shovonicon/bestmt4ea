@echo off
REM ---------------------------------------------------------------------------
REM Collect Myfxbook performance data and post it to the app.
REM
REM Myfxbook answers 403 to a plain fetch, so this needs a real browser - which
REM is why it cannot be a Worker, and why it ran in a Windows CI runner.
REM Playwright is already a dependency, so it runs here just as well.
REM
REM INGEST_URL defaults to production. PERF_INGEST_TOKEN comes from .dev.vars.
REM
REM Keep this file ASCII-only: cmd.exe reads batch files in the OEM codepage,
REM so a stray UTF-8 character becomes a syntax error.
REM ---------------------------------------------------------------------------
cd /d "%~dp0..\.."

if not defined INGEST_URL set INGEST_URL=https://bestmt4ea.com

node scripts/local/with-env.mjs node scripts/collect-myfxbook.mjs %*
