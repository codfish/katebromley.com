## Semantic HTML and Accessibility

### CRITICAL: Navigation vs Actions
- NEVER use JavaScript click handlers to simulate link navigation
- ALWAYS use proper semantic HTML elements for their intended purpose
- Use ternary operators to render the appropriate element type:
  - Links (`<a>` or `<Link>`): For navigation between pages/sections
  - Buttons (`<button>`): For actions, form submissions, UI interactions

```jsx
// ✅ CORRECT: Semantic ternary pattern
return href ? (
  <Link href={href} className={className} {...props}>
    {children}
  </Link>
) : (
  <button type="button" className={className} onClick={handleAction} {...props}>
    {children}
  </button>
);

// ❌ WRONG: JS click handlers for navigation
return (
  <button onClick={() => router.push(href)} className={className}>
    {children}
  </button>
);
```

### Why This Matters
- **Accessibility**: Screen readers announce links and buttons differently
- **Keyboard Navigation**: Links respond to Enter, buttons to Space
- **Browser Features**: Right-click context menus, "Open in new tab", etc.
- **SEO**: Search engines can crawl `<a>` tags but not JS navigation
- **Performance**: Links work without JavaScript
- **User Expectations**: Users expect different behaviors from links vs buttons

## Next.js Guidelines

### Link Component Migration (v15+)
- Remove `legacyBehavior` prop from Next.js Link components
- Remove nested `<a>` elements inside Link components
- Move className and other props directly to the Link component
- Maintain ternary pattern for Button components that can be links

```jsx
// ✅ CORRECT: Next.js v15+ Link
<NextLink href={href} className={className} {...other}>
  {children}
</NextLink>

// ❌ WRONG: Legacy behavior
<NextLink href={href} legacyBehavior>
  <a className={className} {...other}>
    {children}
  </a>
</NextLink>
```

## Component Patterns

### Button Component
- Must render actual `<button>` element when no href provided
- Must render `<Link>` element when href is provided
- Never mix the two or use JS navigation for links

### Link Component
- Should be a thin wrapper around Next.js Link
- Should pass through all props to NextLink
- Should maintain active state detection if needed

## TypeScript Standards

### Component Development
- **ALWAYS** use TypeScript for all React components (.tsx) and utility functions (.ts)
- **NEVER** use PropTypes - this project has migrated to TypeScript for type safety
- Define component props above the component and export them as interfaces
- Name prop interfaces using the pattern: `<ComponentName>Props`

```tsx
// ✅ CORRECT: TypeScript component pattern
import React, { PropsWithChildren } from 'react';

export interface ButtonProps {
  href?: string | object | null;
  primary?: boolean;
  className?: string;
  [key: string]: any;
}

const Button = ({ href = null, primary = false, children, className = '', ...other }: PropsWithChildren<ButtonProps>) => {
  // Component implementation
};

export default Button;
```

### Type Organization
- **CRITICAL**: Keep types close to their implementations
- Define types directly in the file where they're used (e.g., Contentful types in `lib/contentful.ts`)
- Only create separate type files for truly shared types across multiple unrelated modules
- Export types from implementation files to allow reuse when needed

### File Naming & Extensions
- React components: `.tsx` extension
- Utility functions, hooks, libs: `.ts` extension
- Always use `git mv` when converting existing JS files to preserve git history

### Type Safety Best Practices
- Use strict TypeScript configuration with `"strict": true`
- Prefer explicit types over `any` (use `any` only for complex external APIs like Contentful)
- Use proper Next.js types: `GetStaticProps`, `GetStaticPaths`, `AppProps`
- For HTML attributes, use TypeScript's built-in DOM types (e.g., `tabIndex={-1}` not `tabIndex="-1"`)
- **For components with children**: Use `PropsWithChildren<YourProps>` instead of adding `children: React.ReactNode` to your interface

### Development Scripts
- Use `npm run typecheck` for type checking without building
- All builds include TypeScript compilation and type checking
- Add `*.tsbuildinfo` to `.gitignore` (TypeScript build cache)

## Code Quality
- Prefer editing existing files over creating new ones
- Use semantic, accessible HTML elements
- Follow React prop spreading patterns consistently
- **NEVER** use PropTypes - use TypeScript interfaces instead

## CSS Formatting Standards
- **CRITICAL**: Every CSS definition/block must be preceded by an empty line
- This includes: @utility definitions, @layer blocks, @font-face declarations, CSS rules, and comment blocks
- Ensures clean separation and readability of CSS code
- Exception: The very first definition in a file or immediately after an opening brace
