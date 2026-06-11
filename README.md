# Skynet Monitor

An experimental literature piece disguised as an ncurses-style AI threat dashboard.

The app presents fictional AI risk data as a classified terminal instrument: threat boards, dossiers, field notes, transmission fragments, live logs, redactions, CRT effects, and multilingual interface text.

## Design Canon

The look, feel, and writing voice are defined in [DESIGN.md](./DESIGN.md).

Future agents and contributors should also read [AGENTS.md](./AGENTS.md) before changing UI, copy, data, or motion.

## Tech Stack

- Next.js 14
- React 19
- TypeScript
- Tailwind CSS
- pnpm
- lightweight local i18n via `i18n-react`

## Project Structure

```txt
app/
  page.tsx              Locale bootstrapping and top-level render
  globals.css           Tailwind setup plus CRT, redaction, and motion effects
components/
  skynet-dashboard.tsx  Main terminal dashboard experience
data/
  skynet-data.ts        Fictional threat data and localized content
lib/
  i18n.tsx              Locale provider, labels, and translation helpers
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the local development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Run TypeScript checks:

```bash
pnpm exec tsc --noEmit
```

## Development Notes

- Keep the first screen as the artifact. Do not add a marketing landing page.
- Preserve English, Spanish, and French support for user-facing text.
- Keep the dashboard compact, terminal-native, and operational.
- Use motion sparingly: cursor blink, scanline, redaction, typewriter, subtle corruption.
- Treat copy as part of the interface, not explanatory decoration.

## Deployment

The project is deployed from the repository through the existing GitHub/Vercel workflow.

The previous v0 project link is:

```txt
https://v0.app/chat/fHlFe78y9VL
```
