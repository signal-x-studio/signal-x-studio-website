# Signal X Studio Gateway

## Project Overview

Lightweight Vercel gateway that serves as a landing page directory for Signal X Studio services.

## Tech Stack

- **Framework:** Static HTML
- **Deployment:** Vercel
- **Routing:** Vercel rewrites (vercel.json)

## Project Structure

```
signalx-labs-gateway/
├── index.html       # Landing page with app directory
├── vercel.json      # Routing configuration
└── .git/            # Git repository
```

## Domains

### Production
- `signalx.studio` - Primary domain
- `www.signalx.studio` - WWW subdomain

### Vercel
- `signalx-labs-gateway.vercel.app` - Auto-generated

## Current Routing

The gateway currently only serves the landing page. All app-specific domains are handled directly by their respective projects.

### Landing Page Serves:
- `signalx.studio` → Landing page directory
- `www.signalx.studio` → Landing page directory

### Direct Project Routing (not through gateway):
- `clear-cite.signalx.studio` → clear-cite project (direct)

## DNS Configuration

**Provider:** Squarespace
**Domain:** signalx.studio

**Records:**
- `@ → 76.76.21.21` (A record)
- `www → cname.vercel-dns.com` (CNAME)
- `clear-cite → cname.vercel-dns.com` (CNAME)

## Related Projects

- **Clear Cite App:** `~/Workspace/02-local-dev/apps/clear-cite`
- **Clear Cite Docs:** `~/Workspace/02-local-dev/apps/clear-cite-docs`

## Git Repository

- **Remote:** `git@github.com:signal-x-studio/signalx-labs-gateway.git`
- **Branch:** `main`
- **Auto-deploy:** Yes (Vercel GitHub integration)

## Common Tasks

### Update Landing Page
1. Edit `index.html`
2. Commit and push to GitHub
3. Vercel auto-deploys

### Modify Routing
1. Edit `vercel.json`
2. Test routing logic
3. Commit and push
4. Force new deployment if edge cache is stale: `vercel --prod --force --yes`

### Clear Edge Cache
```bash
vercel --prod --force --yes
```

## Notes

- Gateway is minimal by design - just a landing page
- Most complexity moved to individual projects
- Avoid using gateway for proxying (causes caching issues)
