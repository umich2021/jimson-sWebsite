# TODO: point r1.jimsonyang.com at the omakase page

Run this from a machine that has SSH access to the Oracle VM (the box behind projects.jimsonyang.com).
Delete this file once it's done.

## Goal

`https://r1.jimsonyang.com` should redirect to `https://www.jimsonyang.com/omakase/`.

## What we know (checked 2026-11-08)

- DNS: `r1.jimsonyang.com` is an A record to the same VM as `projects.jimsonyang.com` (Porkbun). No DNS change needed.
- `http://r1.jimsonyang.com` gets a 308 to https from Caddy.
- `https://r1.jimsonyang.com` currently answers `302 Location: https://www.jimsonyang.com`, with response header
  `server: redirect1`. So something on the VM named or labelled "redirect1" (a Caddy `header Server redirect1`
  line, or a small redirect container behind Caddy) is producing the 302.
- Other VM notes are in `SERVER-SETUP.md` (gitignored, local only). Caddy config lives under `~/apps/`.

## Steps

1. Find where r1 is configured:
   ```sh
   ssh <user>@projects.jimsonyang.com 'grep -rn -i "r1\.jimsonyang\|redirect1" ~/apps /etc/caddy 2>/dev/null'
   ```
2. Change the redirect target from `https://www.jimsonyang.com` to `https://www.jimsonyang.com/omakase/`.
   - If it's a Caddy site block, it will look like `redir https://www.jimsonyang.com 302`; make it
     `redir https://www.jimsonyang.com/omakase/ 302`.
   - If it's a separate redirect service/container, change its target setting (env var or config) instead.
   - Keep it a 302 (temporary) so it's easy to change later.
3. Reload:
   - Caddy in Docker: `docker exec <caddy-container> caddy reload --config /etc/caddy/Caddyfile`
     (or `docker compose restart caddy` from its folder).
   - A redirect container: restart that container.
4. Verify:
   ```sh
   curl -sI https://r1.jimsonyang.com | grep -i '^location'
   # expect: location: https://www.jimsonyang.com/omakase/
   ```
5. Delete this file, commit, push.
