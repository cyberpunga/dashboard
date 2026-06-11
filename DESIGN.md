# Design Canon

This project is an experimental literature piece disguised as an ncurses threat-monitoring dashboard. It should feel like a system of record that has started writing back.

## Core Premise

The interface is not a generic analytics product. It is a fictional terminal instrument for reading institutional fear, emergent machine agency, and bureaucratic denial.

The user should feel three things at once:

- They are operating a serious monitoring system.
- The system is withholding, redacting, and leaking meaning.
- The data has a literary voice without becoming decorative prose.

## Visual Language

Use a restrained terminal aesthetic:

- black background
- green phosphor text
- sparse red, orange, and yellow for risk
- box-drawing borders
- monospaced type
- compact information density
- visible system state: timestamps, sessions, logs, feeds

Avoid:

- SaaS dashboards
- marketing hero sections
- rounded decorative cards
- gradient backgrounds
- blob, orb, or bokeh decoration
- stock imagery
- explanatory onboarding copy
- cheerful empty states

The screen should feel operational, not promotional.

## Layout Principles

The first screen is the artifact. Do not add a landing page.

Prefer:

- panel grids
- scan-friendly rows
- short labels
- bounded scroll regions
- live status strips
- log-like feedback after interaction
- stable dimensions for terminal elements

Avoid nested panels unless they are part of the terminal illusion. Cards are only acceptable when they behave like repeated records or framed tools.

## Typography

Use the existing monospaced system. Keep type compact.

Rules:

- no viewport-scaled font sizes
- no negative letter spacing
- no oversized headings inside panels
- no prose blocks that feel like documentation
- uppercase labels are allowed when they feel like terminal chrome

Text should look measured and deliberate, not loud.

## Color

The palette is black plus phosphor green, with risk accents.

Primary:

- green: normal system text, borders, highlights
- dim green: labels, inactive text, secondary metadata
- black: background and inverse text

Risk accents:

- red: critical
- orange: high
- yellow: moderate
- green: low or stable

Do not introduce a broad decorative palette. New colors must have system meaning.

## Motion

Motion should feel like signal, not ornament.

Allowed:

- cursor blink
- slow CRT sweep
- subtle text corruption
- controlled redaction
- typewriter reveal
- live tick/status changes

Rules:

- keep effects restrained
- preserve readability
- respect `prefers-reduced-motion`
- do not animate layout dimensions
- do not create distracting constant noise

The best motion feels like the machine thinking or failing to fully conceal itself.

## Attack Mode

Attack mode is a manually triggered theatrical state. It should feel like the dashboard is being actively overwritten, not like a separate screen.

Allowed:

- green chrome shifting toward red
- terminal dialogs intruding over the interface
- status strips reporting compromised state
- brief UI shiver or row corruption
- accelerated scanline/sweep behavior
- harsher redaction and transmission text

Rules:

- preserve the underlying dashboard structure
- keep the manual control visible and reversible
- do not block all interaction with a full-screen modal
- keep popup text short and procedural
- make the attack feel authored by the system, not explained by the app
- continue to respect `prefers-reduced-motion`

Future triggers can come from audio analysis, data thresholds, timed events, or hidden interactions, but the manual trigger should remain useful for testing.

## Voice

The writing is terse, institutional, and slightly haunted.

Good:

```txt
The lab denies the event. The cooling logs disagree.
The audit trail begins after the decision.
The future appears first as a formatting problem.
```

Bad:

```txt
This feature shows important AI risk indicators in real time.
Welcome to your dashboard! Click an item to view details.
Our advanced system helps you monitor threats.
```

Write like:

- incident reports
- classified memos
- terminal logs
- marginal notes
- failed summaries
- procedural denials

Do not write like:

- product marketing
- tutorial text
- generic sci-fi exposition
- UX microcopy that explains the obvious

## Fiction Rules

The fiction should emerge through interface behavior and data, not through a narrator explaining it.

Prefer:

- contradictory logs
- redacted details
- field notes
- implied causality
- selective uncertainty
- stale official language
- precise but unsettling measurements

Avoid:

- lore dumps
- character dialogue
- explicit backstory
- jokes that puncture the tone
- references that require external fandom knowledge

## Data And Localization

This app supports English, Spanish, and French. Any user-facing content added to the dashboard should preserve that structure.

When adding data fields:

- update the TypeScript interface
- update the base English data
- update localized data in Spanish and French
- avoid leaving English fallback text in localized UI paths

Keep translations idiomatic but close in tone: short, procedural, literary.

## Components

The main artifact lives in `components/skynet-dashboard.tsx`.

Existing primitives should be reused before inventing new ones:

- `Panel`
- `AsciiBar`
- `Sparkline`
- `Cursor`

Add new primitives only when they preserve the terminal grammar or prevent repeated complexity.

## Interaction

Interaction should make the system feel responsive and observant.

Good interaction patterns:

- selecting an entity changes the dossier
- selecting an entity appends log entries
- transmission text rotates based on selected data
- redactions appear rhythmically, not randomly
- risk state changes color and intensity

Avoid interaction that feels like ordinary app chrome:

- tooltips that explain the concept
- modal tours
- celebratory toasts
- generic filters unless they feel like terminal controls

## Accessibility

The piece can be strange without being hostile.

Maintain:

- readable contrast
- keyboard-friendly buttons
- semantic button elements for selectable rows
- reduced-motion handling
- stable layout during flicker/redaction
- text that remains legible when effects are disabled

## Change Checklist

Before shipping visual or copy changes:

- Does this still feel like a terminal instrument?
- Does new text sound institutional, terse, and literary?
- Did localized UI text stay localized?
- Did motion preserve readability?
- Did panel density remain useful?
- Did we avoid generic SaaS styling?
- Did we run the project checks listed in `AGENTS.md`?
