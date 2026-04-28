# Cimer — Design System Prompt

Use this prompt when asking Claude to design new pages or components for this project.
Copy everything below the line and paste it into your design request.

---

## PROMPT START

You are designing for **Cimer** — a Croatian roommate-finding web platform. It is built with Next.js 16 + Panda CSS. All styles use the `css` prop or `styled.*` elements. Do NOT use Tailwind. Do NOT use inline style except for dynamic values like `backgroundImage`.

---

### Brand & Tone

- Product name: **Cimer** (Croatian slang for roommate)
- Audience: Croatian young adults, students, young professionals looking for rooms or roommates
- Tone: Warm, modern, friendly — not corporate. Think Airbnb meets Tinder.
- Language: **All UI text must be in Croatian**

---

### Color Tokens

Use ONLY these token names in the `css` prop. Never use raw hex.

```
navy.500  = #1A1F3C   ← primary text, headings, nav
navy.400  = #142044   ← slightly lighter navy
navy.600  = #0F1222   ← darkest navy

coral.500 = #FF6B4A   ← primary accent, CTA buttons, active states
coral.600 = #E54B28   ← coral hover
coral.400 = #FF8D74   ← coral light
coral.100 = #FFF0ED   ← coral tint (focus rings, backgrounds)

cream.500 = #F8F7F4   ← page background (use this everywhere)
cream.600 = #EAE8E3   ← slightly darker cream

sand.500  = #D4D1CA   ← subtle borders, dividers
sand.400  = #E8E6E1   ← card borders

gray.600  = #525252   ← body text, form labels
gray.500  = #c5c1ba   ← placeholders, icons, muted text
gray.400  = #e0deda   ← input borders, nav border
gray.300  = #D4D4D4   ← lightest borders

white               ← card backgrounds, input backgrounds
red.400 / red.500   ← validation errors only
```

---

### Typography

No font imports needed — uses system font stack.

```
Page headings (h1):       fontSize 32px, fontWeight 700, color navy.500
Section headings (h2):    fontSize 22–28px, fontWeight 700, color navy.500
Card titles (h3):         fontSize 18–20px, fontWeight 700, color navy.500
Body text:                fontSize 14px, fontWeight 400, color gray.600
Small/caption:            fontSize 12–13px, color gray.500
Form field labels:        fontSize 11px, fontWeight 600, textTransform uppercase, letterSpacing 0.08em, color gray.600
Price display:            fontSize 13–15px, fontWeight 700, color navy.500
Badges/tags:              fontSize 12px, borderRadius 999px
```

---

### Spacing Scale

Use raw pixel values — no spacing scale tokens.

```
Micro:   4px, 6px, 8px
Small:   12px, 14px, 16px
Medium:  20px, 24px, 28px, 32px
Large:   40px, 48px, 60px, 72px, 80px, 90px
```

---

### Border Radius

```
999px  — pills, badges, tags, circular buttons
24px   — large swipe cards, main feature cards
20px   — logo icon box
18px   — standard cards (room listings, feature cards)
12px   — form inputs, small cards, error boxes, price badges
8px    — small elements, overlay labels
```

---

### Shadows

```
Primary card:       0 12px 40px rgba(0,0,0,0.14)
Standard card:      0 4px 16px rgba(0,0,0,0.08)
Subtle:             0 2px 8px rgba(0,0,0,0.08)
Price badge:        0 2px 8px rgba(0,0,0,0.15)
Coral button glow:  0 4px 20px rgba(255,107,74,0.45)
Focus ring:         0 0 0 3px token(colors.coral.100)
```

---

### Component Patterns

#### Page wrapper
```tsx
<Box css={{ backgroundColor: "cream.500", minHeight: "100dvh" }}>
```

#### Fixed navigation bar
```tsx
<Box css={{
  position: "fixed", top: "0", left: "0", right: "0", zIndex: "50",
  backgroundColor: "cream.500",
  borderBottom: "1px solid", borderColor: "gray.400"
}}>
```

#### Container (max-width 1300px, centered)
```tsx
import { Container } from "@/shared/components/ui/container";
<Container css={{ paddingY: "60px" }}>
```

#### Form input
```tsx
<styled.input css={{
  width: "100%", backgroundColor: "white",
  border: "1px solid", borderColor: "gray.400",
  borderRadius: "12px", padding: "12px 16px",
  fontSize: "14px", color: "navy.500", outline: "none",
  _placeholder: { color: "gray.500" },
  _focus: { borderColor: "coral.400", boxShadow: "0 0 0 3px token(colors.coral.100)" }
}} />
```

#### Form label
```tsx
<styled.label css={{
  display: "block", fontSize: "11px", fontWeight: "600",
  letterSpacing: "0.08em", textTransform: "uppercase",
  color: "gray.600", marginBottom: "8px"
}} />
```

#### Button variants
```tsx
import { Button } from "@/shared/components/ui/button";
<Button variant="primary" size="md">    // coral bg, white text, pill shape
<Button variant="secondary" size="md">  // navy bg, white text
<Button variant="outline" size="sm">    // transparent, gray border
<Button variant="ghost" size="sm">      // transparent, navy text
<Button variant="white" size="md">      // white bg, navy text (on dark backgrounds)
// One-off overrides use style prop:
<Button style={{ width: "100%", borderRadius: "12px" }}>
```

#### Card
```tsx
<Box css={{
  backgroundColor: "white", borderRadius: "18px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  overflow: "hidden"
}}>
```

#### Tag/pill badge
```tsx
<Box css={{
  border: "1px solid", borderColor: "gray.300",
  borderRadius: "999px", paddingX: "12px", paddingY: "4px",
  fontSize: "12px", color: "gray.600"
}}>
```

#### Error message
```tsx
<styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>
```

#### Error alert box
```tsx
<Box css={{
  backgroundColor: "coral.100", border: "1px solid", borderColor: "coral.300",
  borderRadius: "12px", padding: "12px 16px"
}}>
```

---

### Existing Pages & Components

#### Landing page (`/`)
- Fixed nav: logo left, nav links center, login/register buttons right (hamburger on mobile)
- Hero: large heading, subtext, two CTA buttons side by side, animated room SVG illustration
- Process section: "Tri koraka" with 3 step cards (numbered circles, icon, title, description)
- Why Choose Us: sticky heading left column + 2×2 feature card grid right
- Featured Rooms: 3-column card grid with room images (backgroundImage via `style` prop), price, address, tags
- CTA section: coral-ish background card with animated floating circles in corners, two buttons
- Footer: multi-column links

#### Auth pages (`/login`, `/registration`)
- cream.500 background, logo-only nav bar with bottom border
- Centered form container max-width 400–440px
- "Prijavi se" / "Otvori račun" heading + subtitle with coral link
- Login: korisničko ime + lozinka fields, eye toggle on password, "Zaboravili ste lozinku?" link
- Registration: ime i prezime, korisničko ime, email, lozinka + ponovite lozinku (eye toggle), grad + telefon (50/50 row), što tražiš select, submit button, terms text

#### Listings page (`/listings`)
- App navigation: logo left, Favoriti (heart + coral badge) + username + logout right
- Tinder-style swipe deck: centered tall card (calc(100dvh - 260px)), next card peeking behind at 95% scale
- Card: image area (58% height) with photo progress bars at top, price badge bottom-left, gradient overlay; body area with title, location (pin icon), description, tags
- Photo navigation: tap left half of image = previous photo, tap right half = next photo
- Swipe left = skip (PRESKOČI overlay fades in), swipe right = favorite (FAVORIT overlay)
- Action buttons: X (white, gray border circle) and Heart (coral circle) below card

---

### Key Rules

1. **All text in Croatian**
2. `backgroundImage` with dynamic URLs → use `style` prop, never `css` prop
3. Multiple animations on one element → combine into one comma-separated `animation` declaration
4. `position: sticky` in flex → add `alignSelf: flex-start`
5. Icons from `lucide-react` — available: Heart, X, MapPin, LogOut, Eye, EyeOff, Menu, House, ArrowRight, Check, Star, etc. No Facebook/Instagram/Twitter
6. Forms use `react-hook-form` + `zod` validation, mode: "onChange"
7. Responsive values: `{ base: "...", md: "...", lg: "..." }`

---

### Pages / Features Still to Design

- **`/favorites`** — list of saved listings (cards with image, title, price, location, remove button)
- **`/profile`** — user profile page (avatar, name, bio, edit form)
- **`/listings/[id]`** — full listing detail page (gallery, full description, contact CTA)
- **Add listing flow** — multi-step form for landlords to post a room
- **Empty states** — no favorites yet, no listings found, loading skeletons
- **Toast / notification** — success/error feedback after actions
- **Mobile bottom navigation** — for authenticated app pages on mobile

---

### Design Principles

- **Warm, not sterile** — use cream backgrounds, rounded corners, soft shadows
- **Coral is precious** — use coral.500 only for primary CTAs, active states, key highlights. Never overuse.
- **Navy anchors everything** — headings, primary text, logo always navy
- **White cards on cream** — cards are white on cream.500 background, creating subtle depth
- **Generous spacing** — breathing room matters. Minimum 20px padding inside cards.
- **Mobile-first** — design for 375px first, then scale up

## PROMPT END
