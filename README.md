# Cross-Border E-Commerce AI Tools Hub

A modern, lightweight platform designed for cross-border e-commerce sellers, providing a suite of productivity tools to streamline operations and boost efficiency.

## Overview

This project is a **Next.js 15** application built with **TypeScript** and **Tailwind CSS**, featuring:
- GitHub OAuth authentication with whitelist support
- Server-side n8n webhook integration
- Modular app registry system
- Lightweight, performant architecture with minimal dependencies

**Current Status**: Migrated from Vite + React to Next.js App Router (Node.js 18+)

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | App Router, Server Components, API Routes |
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling |
| **Auth.js 5** | GitHub OAuth Authentication |
| **n8n Integration** | Server-side Webhook Management |
| **Vercel** | Recommended Deployment Platform |

## Features

### 1. GitHub OAuth Authentication
- Secure OAuth 2.0 login via GitHub
- Flexible whitelist system:
  - Option 1: Whitelist specific GitHub usernames
  - Option 2: Whitelist email domains (e.g., company.com)
  - Combine both for maximum flexibility

### 2. App Registry System
- Single source of truth: `src/registry.ts`
- Standardized app structure with `meta.ts` and `App.tsx`
- Support for 10 predefined app categories:
  - Keyword Research
  - PPC Ads
  - Competitor Intel
  - Listing & SEO
  - Data Tools
  - Profit & FBA
  - Supply Chain
  - Compliance
  - Ops Automation
  - Other

### 3. Built-in Applications

#### Keyword Deduplicator
- **Category**: Keyword Research
- **Function**: Deduplicates and sorts multi-line keywords
- **Use Case**: Merge keyword lists, remove duplicates

#### CSV/TSV Converter
- **Category**: Data Tools
- **Function**: Convert between CSV and TSV formats with preview
- **Use Case**: Quick data format conversion and validation

#### Profit Calculator
- **Category**: Profit & FBA
- **Function**: Calculate profit margin and ROI based on pricing inputs
- **Use Case**: Product pricing analysis and profitability assessment

#### ASIN → Keywords (DataForSEO)
- **Category**: Keyword Research
- **Function**: Retrieve ranked keywords for Amazon ASINs via DataForSEO API
- **Use Case**: Keyword research and competitor analysis
- **Integration**: n8n webhook-based backend

## Quick Start

### Prerequisites
- **Node.js 18+** (verified with Node 22)
- **npm** or **yarn** or **pnpm**
- GitHub OAuth app credentials

### 1. Clone & Install

```bash
git clone https://github.com/linmaoyi1985-gif/air-filter.git
cd air-filter

# Install dependencies
npm install
# or: yarn install / pnpm install
```

### 2. Environment Variables

Copy the example file and configure:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Auth Configuration
AUTH_SECRET=<generate-with-openssl-rand-base64-32>
AUTH_GITHUB_ID=<your-github-oauth-client-id>
AUTH_GITHUB_SECRET=<your-github-oauth-client-secret>

# Whitelist Configuration (at least one required)
ALLOWED_GITHUB_LOGINS=username1,username2
# OR
ALLOWED_EMAIL_DOMAINS=company.com,partner.com

# n8n Webhook (optional, for ASIN Keywords app)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
N8N_WEBHOOK_SECRET=your-optional-secret
```

### 3. GitHub OAuth Setup

1. Go to GitHub Settings → Developer Settings → OAuth Apps
2. Click "New OAuth App" with:
   - **Application name**: "Air Filter App Hub" (or your choice)
   - **Homepage URL**: `http://localhost:3000` (dev) or `https://yourdomain.com` (prod)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github` (dev)

3. Copy the **Client ID** and **Client Secret** to `.env.local`

**For Production (Vercel)**:
- Homepage URL: `https://yourdomain.vercel.app`
- Callback URL: `https://yourdomain.vercel.app/api/auth/callback/github`

### 4. Local Development

```bash
# Start development server (default: http://localhost:3000)
npm run dev

# The app will be available at:
# http://localhost:3000
```

### 5. Build for Production

```bash
# Build optimized production bundle
npm run build

# Test production build locally
npm start
```

## Deployment

### Vercel (Recommended)

**One-Click Deploy**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flinmaoyi1985-gif%2Fair-filter&project-name=air-filter&repository-name=air-filter&env=AUTH_SECRET,AUTH_GITHUB_ID,AUTH_GITHUB_SECRET,ALLOWED_GITHUB_LOGINS,N8N_WEBHOOK_URL&envDescription=Required%20environment%20variables%20for%20Air%20Filter&envLink=https%3A%2F%2Fgithub.com%2Flinmaoyi1985-gif%2Fair-filter%2Fblob%2Fmain%2F.env.example)

**Manual Steps**:

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "Add New..." → "Project"
4. Select the `air-filter` repository
5. Configure environment variables (see Environment Variables section)
6. Click "Deploy"

**Post-Deployment**:
- Update GitHub OAuth app callback URLs to point to your Vercel domain
- Test authentication flow in production

### Other Platforms (Docker, Self-hosted)

```bash
# Build Docker image
docker build -t air-filter .

# Run container
docker run -p 3000:3000 \
  -e AUTH_SECRET="..." \
  -e AUTH_GITHUB_ID="..." \
  -e AUTH_GITHUB_SECRET="..." \
  air-filter
```

## Project Structure

```
air-filter/
├── app/                          # Next.js App Router
│   ├── api/auth/[auth].ts       # Auth.js API route
│   ├── page.tsx                 # Home page
│   ├── app/[slug]/page.tsx      # App detail page
│   └── layout.tsx               # Root layout
├── src/
│   ├── apps/                    # All applications
│   │   ├── keyword-dedup/       # Keyword deduplicator
│   │   │   ├── App.tsx          # React component
│   │   │   └── meta.ts          # Metadata
│   │   ├── csv-converter/       # CSV/TSV converter
│   │   ├── profit-calculator/   # Profit calculator
│   │   └── asin-keywords/       # ASIN → Keywords
│   ├── components/              # Shared components
│   ├── lib/                     # Utility functions
│   ├── types.ts                 # TypeScript types
│   └── registry.ts              # App registry (single source of truth)
├── docs/
│   └── n8n-setup.md            # n8n integration guide
├── auth.config.ts              # Auth.js configuration
├── middleware.ts               # Next.js middleware
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── CLAUDE.md                    # App addition rules (MUST READ)
└── README.md                    # This file
```

## How to Add New Apps

### Step 1: Create App Directory

```bash
mkdir -p src/apps/my-awesome-app
```

**Rules**:
- Use kebab-case for directory names (e.g., `my-awesome-app`)
- Must be unique across the project

### Step 2: Create `meta.ts`

```typescript
// src/apps/my-awesome-app/meta.ts
import type { AppMeta } from '../../types';

export const meta: AppMeta = {
  slug: 'my-awesome-app',              // Must match directory name
  name: 'My Awesome App',               // Display name
  description: 'Brief description...',  // 1-2 sentences
  category: 'Data Tools',              // Must be from predefined list
  tags: ['tag1', 'tag2'],              // Optional, for search
  order: 1,                            // Optional, sort within category
};
```

### Step 3: Create `App.tsx`

```typescript
// src/apps/my-awesome-app/App.tsx
export default function MyAwesomeApp() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>My Awesome App</h2>
      <p>App content here...</p>
    </div>
  );
}
```

**Rules**:
- Must use `export default` to export React component
- Use inline CSS or Tailwind classes (no external UI frameworks)
- Keep styling lightweight

### Step 4: Register in `registry.ts`

```typescript
// src/registry.ts
import { meta as myAwesomeAppMeta } from './apps/my-awesome-app/meta';

export const allApps: AppMeta[] = [
  // ... existing apps
  myAwesomeAppMeta,
];
```

### Step 5: Test Locally

```bash
# Dev server
npm run dev

# Production build (must pass)
npm run build
```

### Step 6: Submit PR

- Title: `feat: add My Awesome App`
- Description: App function, category, test steps
- Ensure build passes

## Development Rules

### Must Follow
✅ App directory: `src/apps/<slug>/`
✅ `slug` must match directory name
✅ `category` from predefined list (see `src/types.ts`)
✅ Default export in `App.tsx`
✅ Register in `src/registry.ts`
✅ Pass `npm run build`
✅ Submit via PR (no direct main push)

### Forbidden
❌ Create custom categories (modify `src/types.ts` first)
❌ Modify other apps without clear reason
❌ Add npm dependencies without approval
❌ Use external UI frameworks (Material-UI, Ant Design, etc.)
❌ Push directly to main branch

**Detailed rules**: See [CLAUDE.md](./CLAUDE.md)

## n8n Integration Guide

For apps requiring external API integration (like ASIN Keywords), use n8n webhooks.

**Setup Steps**:
1. Create n8n workflow
2. Enable Webhook Trigger
3. Copy webhook URL to `.env.local`
4. Call from app component using `fetch()` or axios

**Complete Guide**: See [docs/n8n-setup.md](./docs/n8n-setup.md)

### Example: Calling n8n from App

```typescript
const response = await fetch(process.env.N8N_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ asin: 'B08N5WRWNW' }),
});

const data = await response.json();
```

## Environment Variables Reference

| Variable | Required | Purpose | Example |
|---|---|---|---|
| `AUTH_SECRET` | Yes | Session encryption key | `openssl rand -base64 32` |
| `AUTH_GITHUB_ID` | Yes | GitHub OAuth app ID | `Iv1.1234abcd...` |
| `AUTH_GITHUB_SECRET` | Yes | GitHub OAuth app secret | `9876xyz...` |
| `ALLOWED_GITHUB_LOGINS` | Yes* | Whitelist usernames | `user1,user2,user3` |
| `ALLOWED_EMAIL_DOMAINS` | Yes* | Whitelist email domains | `company.com,partner.com` |
| `N8N_WEBHOOK_URL` | No | n8n webhook endpoint | `https://n8n.example.com/webhook/...` |
| `N8N_WEBHOOK_SECRET` | No | n8n webhook secret | `secret123` |

*At least one of `ALLOWED_GITHUB_LOGINS` or `ALLOWED_EMAIL_DOMAINS` is required.

## Troubleshooting

### Build Fails
- Verify `category` in `meta.ts` is from the predefined list
- Confirm `slug` matches directory name exactly
- Check app is registered in `src/registry.ts`

### App Not Displaying
- Clear browser cache
- Verify imports in `registry.ts` are correct
- Confirm app is added to `allApps` array

### 404 Errors
- URL format: `/app/<slug>`
- Double-check slug spelling and case

### Authentication Issues
- Generate new `AUTH_SECRET`: `openssl rand -base64 32`
- Verify GitHub OAuth credentials
- Check whitelist configuration
- Confirm callback URL matches GitHub app settings

### n8n Integration Not Working
- Verify webhook URL is accessible
- Check request/response format matches n8n workflow
- Review n8n execution history for errors
- See [docs/n8n-setup.md](./docs/n8n-setup.md) for detailed steps

## Performance & Optimization

- **Next.js 15 Features**: App Router, Server Components, Streaming
- **Bundle Size**: Minimal dependencies for fast loading
- **Caching**: Static generation where possible, ISR for dynamic content
- **Images**: Optimized with next/image
- **CSS**: Tailwind CSS for efficient styling

## Security

- OAuth 2.0 authentication via Auth.js
- Server-side credential management
- Whitelist-based access control
- CSRF protection built-in
- No sensitive data exposed to client

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feat/my-app`
3. Follow [CLAUDE.md](./CLAUDE.md) rules
4. Test locally: `npm run build`
5. Commit: `git commit -m 'feat: add my app'`
6. Push: `git push origin feat/my-app`
7. Open Pull Request

## API Routes

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/auth/*` | POST/GET | OAuth authentication (Auth.js) |
| `/api/webhooks/n8n` | POST | n8n webhook receiver |

## Monitoring & Debugging

```bash
# View build output
npm run build

# Check TypeScript errors
npx tsc --noEmit

# Lint code
npm run lint

# Production preview
npm run build && npm start
```

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Auth.js Docs**: https://authjs.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **n8n Docs**: https://docs.n8n.io/
- **GitHub OAuth**: https://docs.github.com/en/developers/apps/building-oauth-apps

## FAQ

**Q: Do I need to modify `CLAUDE.md`?**
A: Only if you're adding new app categories. For new apps, follow existing rules.

**Q: Can I use npm packages?**
A: Only with clear justification. The project prioritizes minimal dependencies.

**Q: How do I test authentication locally?**
A: Create a GitHub OAuth app with `http://localhost:3000/api/auth/callback/github` as callback URL.

**Q: Can I use styling frameworks?**
A: Use Tailwind CSS classes or inline styles. External frameworks are discouraged.

**Q: How do I report bugs?**
A: Create an issue on GitHub with clear reproduction steps.

## License

MIT License - See LICENSE file for details.

## Support & Contact

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: maintainers@example.com

---

**Last Updated**: December 2025
**Current Version**: 2.0 (Next.js Migration)
**Status**: Production Ready
