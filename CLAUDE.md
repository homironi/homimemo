# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Homimemo is a static blog site built with Next.js 15, TypeScript, and Markdown-based content management. The site generates article metadata during build time and uses App Router for static site generation.

## Common Development Commands

### Setup and Development
```bash
npm ci                  # Install dependencies
npm run dev            # Start development server with file watchers
npm run build          # Build for production
npm start              # Start production server
```

### Content Generation
```bash
npm run build:json     # Generate all metadata files
npm run add:article-id # Add missing IDs to articles
```

### Code Quality
```bash
npm run lint-all       # Run all linters (ESLint + Stylelint)
npm run lint-all-fix   # Fix all linter issues
npm run lint           # ESLint only
npm run lint:style     # Stylelint only
```

### Testing and Storybook
```bash
npm run storybook      # Start Storybook dev server
npm run build-storybook # Build Storybook
```

## Code Architecture

### Content Management System
- **Articles**: Markdown files in `_contents/articles/` with YAML frontmatter
- **Metadata Generation**: Build scripts in `scripts/article/` process content and generate JSON metadata files
- **File Watchers**: Development mode includes automatic metadata regeneration when content changes

### Component Structure
All components follow this pattern:
- Directory: `src/components/ComponentName/`
- Files: `ComponentName.tsx`, `ComponentName.module.css`, `ComponentName.stories.tsx`, `index.ts`
- CSS: CSS Modules with TypeScript definitions (`.css.d.ts` files are auto-generated)

### Key Directories
- `src/app/`: Next.js App Router pages and layouts
- `src/components/`: React components with CSS Modules and Storybook
- `src/lib/`: TypeScript utilities (client and server)
- `src/schemas/`: Valibot schemas for runtime validation
- `_contents/`: Content source files (articles, categories, tags)
- `public/generated/meta/`: Auto-generated metadata JSON files
- `scripts/article/`: Build-time content processing scripts

### Article Processing Pipeline
1. **ID Generation**: Ensures all articles have unique IDs
2. **Metadata Extraction**: Processes frontmatter and content
3. **Category/Tag Linking**: Associates articles with categories and tags
4. **JSON Generation**: Creates structured metadata for Next.js consumption

## Code Conventions

### Component Development
- Use CSS Modules for styling
- Include Storybook stories for all components
- Export components from `index.ts` files
- Follow the established naming patterns

### Dynamic Imports
When using Next.js `dynamic`, always use named imports with `then`:
```ts
// ✅ Correct - allows VS Code reference search
const DynamicToc = dynamic(() => import("@/components/TableOfContents").then(mod => mod.default));

// ❌ Incorrect - breaks reference search
const DynamicToc = dynamic(() => import("@/components/TableOfContents"));
```

### Path Aliases
- `@/*` maps to `src/*`
- `@public/*` maps to `public/*`

### Linting Rules
- No console.log statements in production code
- JSDoc required for public functions
- Unix line endings enforced
- Double quotes for strings
- Self-closing JSX components where applicable

## Article Management

### Article Structure
Articles require YAML frontmatter with:
- `title`: Article title
- `draft`: Boolean for publication status
- `publishDate`: ISO date string
- `lastModDate`: ISO date string (optional)
- `tags`: Array of tag names
- `id`: Unique identifier (auto-generated if missing)
- `category`: Category name
- `description`: Article description
- `thumbnail`: Optional image path

### Content Processing
- Uses `next-mdx-remote` for MDX rendering
- Includes syntax highlighting via `rehype-prism-plus`
- Supports GitHub Flavored Markdown
- Auto-generates table of contents
- Adds copy buttons to code blocks

## Development Workflow

1. **Content Changes**: Edit files in `_contents/` and metadata auto-regenerates
2. **Component Development**: Use Storybook for isolated component development
3. **Code Quality**: Run linters before committing
4. **Build Testing**: Use `npm run build` to verify static generation works

## Build Output

The build process creates a static site in `_public/` directory suitable for deployment to static hosting platforms like Vercel or Netlify.

## 応答について

- 日本語で応答してください

## コーディングについて

- TypeScriptではanyを使用しないでください

## 命名について

- `check`という単語は可能な限り避けてください
  - `check`という単語は非常に意味の広い単語のため、「何をcheckするのか」を考慮した命名にしてください
