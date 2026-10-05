# Local operator scripts

Two jobs used to run in GitHub Actions because they need a Windows machine or a
real browser. Neither needs GitHub — these run them here instead.

| Job | Command | Why it can't be a Worker |
|---|---|---|
| Compile queued licence builds | `scripts\local\build-licenses.cmd` | MetaEditor is Windows-only |
| Sync Myfxbook performance | `scripts\local\collect-myfxbook.cmd` | Myfxbook 403s plain fetches, so it needs a real browser |

Both read their secrets from `.dev.vars` (via `with-env.mjs`) and default to the
production URL. An explicitly-set environment variable wins, so you can point one
at localhost without editing anything:

```
set APP_URL=http://localhost:4321 && scripts\local\build-licenses.cmd
```

## Scheduling them

Task Scheduler, from an elevated prompt. Note the escaped quotes — the path
contains a space:

```powershell
schtasks /create /tn "BestMT4EA licence builds" ^
  /tr "\"D:\website\BESTMT4EA astro\scripts\local\build-licenses.cmd\"" ^
  /sc hourly /mo 2

schtasks /create /tn "BestMT4EA performance sync" ^
  /tr "\"D:\website\BESTMT4EA astro\scripts\local\collect-myfxbook.cmd\"" ^
  /sc daily /st 04:00
```

Both default to running only while you are logged on, which is what these need —
they rely on your files and your `.dev.vars`.

## The trade-off

A workflow runner compiles around the clock. This machine only compiles while it
is awake, so a customer who activates a licence late in the evening may wait
until morning for their build. Every two hours keeps that short during the day; if
that is ever not good enough, the GitHub workflow is still there and does the same
work — it just needs `MT4_INSTALLER_URL` and the app URL as repository secrets.
