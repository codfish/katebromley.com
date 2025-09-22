# katebromley.com

> Personal author site.

[Website](https://www.katebromley.com)

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Getting Started](#getting-started)
- [Staging Environment](#staging-environment)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Getting Started

**Reference**:
[Environment Variables on Vercel](https://nextjs.org/docs/basic-features/environment-variables#environment-variables-on-vercel)

```sh
# Install dependencies
npm ci

# Pull down environment variables for local development
vercel env pull

# Run the development server
npm run dev
```

## Staging Environment

Contentful environments act like separate databases, which makes it difficult to use staging purely as a draft
area—there’s no simple “promote” workflow.

For local development and preview environments, it’s better to point to the production environment using Contentful’s
Preview API base URL. In this app, that works well because the app is read-only—it never updates content—so we can
safely view unpublished (draft) content from production without risk of changes.

By default, all environments (development, preview, production) point to the production environment. This flag is for
cases where we need to test entirely different content structures before introducing them to production. Setting it will
point the app to the staging environment instead. Override in `.env.local`.

```sh
CONTENTFUL_STAGING_ENABLED=true
```
