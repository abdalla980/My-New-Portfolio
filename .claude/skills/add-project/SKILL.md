---
name: add-project
description: Add a new project entry to the portfolio data file
user-invocable: true
argument-hint: [project-title]
---

# Add Project

Add a new project to `src/data/projects.ts`.

## Steps

1. Open `src/data/projects.ts`
2. Add a new entry to the `projects` array following the `Project` interface
3. Ask the user for: title, description, tags, liveUrl, githubUrl, featured status

## Project Interface

```typescript
export interface Project {
  slug: string;           // kebab-case, unique (e.g., "my-project")
  title: string;          // Display title
  description: string;    // 1-2 sentences
  longDescription?: string;
  thumbnail: string;      // Path in /public (e.g., "/images/project.jpg")
  tags: string[];         // Tech stack tags
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;      // true = shows on homepage
  date: string;           // "YYYY-MM" format for sorting
}
```

## Rules
- Slug must be unique and kebab-case
- Date format is "YYYY-MM"
- Featured projects appear on the homepage (max 3-4 recommended)
- Thumbnail path should point to `/public/images/`
- Sort: projects are sorted by date descending on the projects page
