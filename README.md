# Roommate Matcher

Roommate Matcher is a web application for managing users and room/flat listings, including authenticated user actions, listing interactions, image uploads, and favorites. The overall system is split into two independently developed repositories - one for the backend and one for the frontend - so each part can be maintained and deployed separately.

This repository (`roommate-matcher-web`) contains the Next.js frontend for Roommate Matcher. It provides the public landing page and all authenticated UI flows for browsing listings, managing favorites, and creating new listings. Client-side data fetching is handled through React Query, and forms are built with React Hook Form + Zod validation.

## TVZ Mc2 Context

This project was created as part of the TVZ MC2 student competition, organized by the Student Council of the Zagreb University of Applied Sciences (TVZ).

More information about the competition is available at: [https://mc2.tvz.hr/](https://mc2.tvz.hr/)

## Team Members

| Name              | Role      |
| ----------------- | --------- |
| Dino Stupar       | Backend   |
| Hrvoje Čučković   | Frontend  |
| Gabrijel Vlašiček | Marketing |

## Repositories

The Roommate Matcher project is split into two separate repositories:

| Repository | Purpose                                                             | Tech |
| ---------- |---------------------------------------------------------------------| ---- |
| [roommate-matcher-api](https://github.com/dinostupar78/roommate-matcher-api) | Backend REST API, authentication, db integration and business logic | Spring Boot |
| [roommate-matcher-web](https://github.com/Hrvoje1307/roommate-matcher-web) | Frontend web application and user interface | Next.js |

## Architecture Overview

Roommate Matcher is split into a frontend client, backend API, and relational database.

```text
roommatematcher-web (Next.js)
	|
	| REST API
	v
roommatematcher-api (Spring Boot)
	|
	v
PostgreSQL / H2
```

The frontend communicates with the backend through HTTP API calls. Authentication is handled using JWT access tokens.

---

# Frontend - roommate-matcher-web

This repository contains the Next.js frontend for Roommate Matcher. It provides the public landing page and all authenticated UI flows for browsing listings, managing favorites, and creating new listings. Client-side data fetching is handled through React Query, and forms are built with React Hook Form + Zod validation.

## Tech Stack

| Category | Technology |
| -------- | ---------- |
| Framework | Next.js 16.2.4 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Panda CSS 1.8 |
| Components | Ark UI 5 |
| Server State | TanStack React Query 5 |
| Forms | React Hook Form 7 + Zod 4 |
| Icons | Lucide React 1.8 |
| Tooling | ESLint 9 |

## Features

- Public landing page with product sections and call-to-action
- Authentication flows (registration + login) with form validation
- Listings browsing with swipe-based interactions
- Favorites management and listing details access
- Create new listing with multipart image uploads
- Profile editing with validation and password update support

## Installation & Running

### Prerequisites

- Node.js with a package manager (pnpm recommended)
- Running backend API (see backend repository)

### Clone the repository

```bash
git clone <frontend-repository-url>
cd roommatematcher-web
```

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create a `.env.local` file in the repository root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

`NEXT_PUBLIC_API_URL` must point to the backend base URL. All requests are sent to `${NEXT_PUBLIC_API_URL}/api/**`.

### Start the development server

```bash
pnpm dev
```

The frontend should be available at:

```text
http://localhost:3000
```

### Production build

```bash
pnpm build
pnpm start
```

## Notes

- The client stores JWT access tokens in `localStorage` and sends them as `Authorization: Bearer <token>` headers.
- Authenticated routes redirect to `/login` when the current user query fails.
- Listing images are displayed using the backend uploads endpoint.
