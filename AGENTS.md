# Agent Instructions

This project is an experimental literature piece presented as an ncurses-style AI threat dashboard. Preserve that identity in every change.

## Read First

Before changing UI, copy, layout, data, motion, or styling, read:

- `DESIGN.md`
- `components/skynet-dashboard.tsx`
- `data/skynet-data.ts`
- `lib/i18n.tsx`

The design canon in `DESIGN.md` is the source of truth for look, feel, and voice.

## Working Rules

- Keep changes scoped and easy to review.
- Preserve the terminal/ncurses visual grammar.
- Preserve multilingual behavior for English, Spanish, and French.
- Do not add generic dashboard, SaaS, or marketing-page styling.
- Do not add explanatory onboarding copy inside the app.
- Do not dilute the fiction with lore dumps or tutorial text.
- Prefer existing primitives before adding new abstractions.
- Keep motion subtle and respect `prefers-reduced-motion`.
- Keep layout dimensions stable during live effects.
- Avoid unrelated refactors.

## Copy Rules

Dashboard copy should be terse, procedural, and literary.

Prefer:

```txt
The audit trail begins after the decision.
The public report calls it calibration.
The city answers before anyone asks.
```

Avoid:

```txt
This panel shows detailed information about the selected company.
Click here to explore AI risk insights.
Welcome to the dashboard.
```

## Localization Rules

When adding user-facing text:

- add English text in the base data or `lib/i18n.tsx`
- add Spanish and French equivalents
- update the relevant TypeScript types
- verify language switching still works conceptually

Do not leave localized views with English-only additions.

## Verification

Run these before considering a code change complete:

```bash
pnpm build
pnpm exec tsc --noEmit
```

The repository currently has a `pnpm lint` script, but `eslint` may not be installed. If lint is unavailable, say that clearly instead of treating it as a code failure.

For frontend changes, also verify the page in a browser when possible. Check at least:

- desktop layout
- mobile or narrow layout if the change affects layout
- entity selection
- language switching
- motion/redaction readability

## Commit Hygiene

- Do not commit unless the user asks.
- Do not include unrelated files in commits.
- Do not revert user changes unless explicitly asked.
- If the worktree is dirty, inspect status before editing.
