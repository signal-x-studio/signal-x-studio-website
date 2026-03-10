# Signal X Studio — Holding Company Website

## Project Overview

Single-page holding company website for Signal X Studio, LLC. Serves as the gateway to all 7 brands operated under the LLC.

## Tech Stack

- **Framework:** Static HTML (no build step)
- **Typography:** Space Grotesk (display), Inter (body), JetBrains Mono (mono)
- **Deployment:** Vercel (auto-deploy via GitHub push)
- **APIs:** Cal.com (scheduling), Resend (newsletter)

## Design System

### Colors
- Background: `#05050a` (deep void)
- Accent: `#6b88ff` (Signal X blue)
- Secondary: `#ff6dd8` (magenta)
- Per-brand card accents on hover via `--card-accent` and `data-brand` attribute

### Brand Colors
| Brand | Color | CSS Variable |
|-------|-------|-------------|
| Rally HQ | `#6366f1` | `--brand-rallyhq` |
| Let's Pepper | `#f97316` | `--brand-letspepper` |
| 630 Volleyball | `#3b82f6` | `--brand-630` |
| Flickday Media | `#facc15` | `--brand-flickday` |
| Nino Chavez | `#ff6dd8` | `--brand-nino` |
| VolleyRX | `#22c55e` | `--brand-volleyrx` |
| Zero Specs | `#00fff2` | `--brand-zerospecs` |

### Typography
- Display: Space Grotesk (700)
- Body: Inter (400, 500, 600)
- Mono: JetBrains Mono (400) — used for kickers, labels, tech pills

## Page Structure

1. **Hero** — Holding company thesis ("One entity. Seven brands.")
2. **Brands** — 4 groups: Sports & Events, Infrastructure & SaaS, Media & Creative, R&D
3. **Operations** — Tech stack + operating model values
4. **Founder** — Nino Chavez bio + links
5. **Contact** — Email CTA + Cal.com scheduling
6. **Footer** — Brand links by category, LLC legal text

## Brands (7 DBAs)

| Brand | Category | URL |
|-------|----------|-----|
| Let's Pepper | Sports & Events | letspepper.com |
| 630 Volleyball | Sports & Events | 630volleyball.app |
| Rally HQ | Infrastructure & SaaS | rallyhq.app |
| VolleyRX | Infrastructure & SaaS | volleyrx.com |
| Flickday Media | Media & Creative | flickdaymedia.com |
| Nino Chavez | Media & Creative | ninochavez.co |
| Zero Specs | R&D | zerospecs.app |

## Domains

- Primary: `signalx.studio`
- Redirect: `signalxstudio.com` → `signalx.studio` (Cloudflare)
- Vercel: `signalx-labs-gateway.vercel.app`

## Environment Variables

- `CAL_API_KEY` — Cal.com API token
- `CAL_API_BASE_URL` — defaults to `https://api.cal.com/v2`
- `CAL_USERNAME` — defaults to `signalxstudio`
- `RESEND_API_KEY` — Resend email service
- `RESEND_LABS_AUDIENCE_ID` — Resend audience ID

## File Structure

```
signal-x-studio-website/
├── index.html           # Single-page holding company site
├── favicon.svg          # Signal X mark
├── vercel.json          # Deployment config
├── api/
│   ├── cal-event-types.js    # Cal.com scheduling
│   └── labs-subscribe.js     # Newsletter subscription
└── .claude/
    └── context.md       # This file
```

## Git

- Remote: `git@github.com:signal-x-studio/signalx-labs-gateway.git`
- Branch: `main`
- Auto-deploy on push
