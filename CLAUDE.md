# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.2.4 real estate landing page for Wemark Dubai, built with TypeScript, Tailwind CSS, and Radix UI components. The application serves as a lead generation platform for Dubai property investments, featuring forms, contact management, and email integration.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (includes TypeScript validation and ESLint checks)
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Build without linting (for debugging)
npx next build --no-lint
```

## Architecture & Key Patterns

### Application Structure
- **Next.js App Router**: Uses the modern `app/` directory structure with file-based routing
- **Server-Side Rendering**: Pages are statically generated where possible, with API routes for server functionality
- **Component Architecture**: Reusable UI components using shadcn/ui + Radix UI primitives

### Styling System
- **CSS Custom Properties**: All colors defined as CSS variables in `app/globals.css` for consistent theming
- **Tailwind Configuration**: Extended with custom colors, fonts, and animations in `tailwind.config.ts`
- **Design Tokens**: Navy/accent color scheme with glassmorphism effects and premium button styles

### Form Handling Pattern
The application uses a consistent pattern across all forms:
1. **Client-side validation** with regex patterns and custom error states
2. **Server-side validation** in API routes with the same validation logic
3. **Loading states** with disabled form controls during submission
4. **Success/error feedback** through UI state changes (not alerts)

### Email Integration
- **Resend API**: Server-side email sending via `/api/send-email` route
- **Environment Variables**: `RESEND_API_KEY` required for email functionality
- **Form Types**: Multiple form types tracked for analytics ("Modal Lead Form", "Contact Form", etc.)

### SEO & Analytics Architecture
- **Comprehensive SEO**: Structured data (JSON-LD), OpenGraph, Twitter cards in root layout
- **Conditional Analytics**: Google Analytics only loads if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- **Performance Optimization**: Image optimization configured for WebP/AVIF with responsive sizes

## Component Patterns

### Font Loading
Uses Next.js font optimization with consistent pattern:
```typescript
const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700'],
  style: ['normal', 'italic'],
});
```

### Modal Management
LeadModal component demonstrates the modal pattern:
- Controlled by parent state (isOpen/onClose)
- Form reset on close with setTimeout to avoid visual glitches
- Backdrop blur and animation classes
- Focus management and accessibility

### API Route Pattern
Server-side validation follows this structure:
1. Extract and validate required fields
2. Apply regex validation for email/phone
3. Process business logic (email sending)
4. Return consistent JSON responses with proper HTTP status codes

## Build Configuration

### Next.js Config
- **Image Optimization**: Configured for WebP/AVIF with responsive device sizes
- **Webpack Memory Optimization**: Enabled for Vercel deployment
- **ESLint Integration**: Strict validation enabled (no build bypasses)

### ESLint Configuration
- **Custom Rules**: `react/no-unescaped-entities` disabled for deployment compatibility
- **Image Warnings**: `@next/next/no-img-element` set to warn (not error)

### Vercel Deployment
- **API Function Configuration**: 30-second timeout for email API
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Framework Detection**: Automatic Next.js optimization

## Environment Variables

Required for full functionality:
- `RESEND_API_KEY`: Email service authentication
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: (Optional) Google Analytics tracking

## Development Notes

### Production Code Standards
- No console.log statements in production builds
- No alert() calls - use UI feedback instead
- All forms must have loading states and proper error handling
- Images should use Next.js Image component when possible (currently using regular img tags for external URLs)

### Known Technical Debt
- Some unescaped entities in JSX (resolved via ESLint config)
- External images not using Next.js Image optimization
- Could benefit from form validation library integration (currently custom validation)

### Testing Strategy
- **Build Validation**: `npm run build` serves as primary quality gate
- **Type Safety**: Strict TypeScript configuration with no build error bypasses
- **Linting**: ESLint configured to catch common React/Next.js issues