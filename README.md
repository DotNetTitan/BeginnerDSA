# DSA University

A self-contained C# DSA learning web app with interactive visualizations, practice problems, and progress tracking.

## What's inside

- **11 modules** — Big O through Greedy & Intervals, ordered by prerequisites
- **Theory pages** — Markdown-rendered content with C# code examples and complexity tables
- **Interactive SVG visualizations** — Arrays, stacks, linked lists, trees, graphs, sorting, DP tables
- **52 practice problems** — Easy/Medium/Hard with C# solutions and test cases
- **Progress tracking** — LocalStorage-based, with per-topic and per-problem status
- **Dependency-aware learning path** — Topics unlock as prerequisites are completed

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (base-ui)
- Shiki (code highlighting)
- react-markdown
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Routes

| Route | Description |
|---|---|
| `/` | Home — roadmap with continue-learning card |
| `/learn/[topicId]` | Theory content for each topic |
| `/visualize/[topicId]` | Interactive step-through visualizations |
| `/practice/[topicId]` | Problem list for the topic |
| `/practice/[topicId]/[problemId]` | Problem detail with solution |
| `/progress` | Stats, per-topic breakdown, activity log |
