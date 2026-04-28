@AGENTS.md
@STYLING.md

# Project: Cimer (room-matcher-web)

Croatian roommate-finding platform. Next.js 16.2.4 + React 19, App Router, TypeScript strict.

## Stack

- **Styling:** Panda CSS 1.8 — use `css` prop / `styled` / `Box`. Color tokens: `navy`, `coral`, `cream`, `sand`, `gray` (100–600). Config: `panda.config.ts`. Generated output: `styled-system/` (never edit).
- **Forms:** React Hook Form 7 + Zod 4 + `@hookform/resolvers`. Schemas in `src/shared/shemas/form-validation.ts` (typo in folder name is intentional — don't rename).
- **Data fetching:** TanStack React Query 5. Fetch utility: `src/shared/hooks/fetchData.ts` (uses `NEXT_PUBLIC_API_URL`, includes credentials).
- **Icons:** Lucide React 1.8 — no Facebook/Instagram/Twitter icons in this version.
- **UI:** Ark UI 5 (headless), Button recipe with `variant`: primary|secondary|outline|ghost|white and `size`: sm|md|lg.

## Routes

| Route | File |
|-------|------|
| `/` | `src/app/page.tsx` → renders `src/pages/landing-page/landing-page.tsx` |
| `/login` | `src/app/login/page.tsx` |
| `/registration` | `src/app/registration/page.tsx` |
| `/listings` | `src/app/listings/page.tsx` (stub) |

## Component map

```
src/shared/components/
  ui/
    button.tsx          Panda recipe button
    container.tsx       Max-width wrapper (1300px)
    logo.tsx            Logo
  svg/
    house.tsx           Animated room SVG illustration
  sections/
    navigations/main-navigation.tsx     Fixed header, hamburger menu, anchor links
    hero/hero.tsx + hero-main.tsx + banner.tsx
    process/process.tsx + process-heading.tsx + steps.tsx
    why-choose-us/ (3 files)
    featured-rooms/ (3 files)
    cta-section/cta-container.tsx       Animated floating circles
    footer.tsx

src/entities/
  listings/queries.tsx    getAllListings, getListingById, addListing, removeListing
  user/queries.tsx        getUserById, getCurrentUser (/users/me)

src/shared/
  config/colors.ts        Color token definitions
  consts/consts.ts        Query key constants
  hooks/fetchData.ts      Fetch utility
  providers/query-provider.tsx
  shemas/form-validation.ts   loginSchema, registrationSchema
```

## Anchor scroll targets

`#kako-funkcionira`, `#o-nama`, `#oglasi` — all have `scroll-margin-top: 80px` in `globals.css` for the fixed header.

## Key rules & gotchas

1. **Dynamic `backgroundImage`** → must use `style` prop, NOT Panda `css` prop (Panda can't evaluate dynamic values at build time).
2. **Multiple `animation` on same element** → combine into one comma-separated `animation` declaration or the second overrides the first.
3. **`position: sticky` in flex container** → requires `alignSelf: flex-start` on the sticky element.
4. **Zod v4 enum** → use `as const` on the array and `message:` not `errorMap:`.
5. **All UI text is Croatian** — keep validation messages and labels in Croatian.
6. **Button `style` prop** for one-off overrides (e.g. `borderRadius`, `width: 100%`) — don't add new recipe variants for single-use styles.
