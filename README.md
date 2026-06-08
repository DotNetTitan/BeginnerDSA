# Zero To DSA

<div align="center">

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2016-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](https://github.com/DotNetTitan/BeginnerDSA)

**A structured, interactive platform for mastering Data Structures & Algorithms - from Big O to Dynamic Programming.**

[Getting Started](#getting-started) •
[Features](#features) •
[Topics](#topics) •
[Project Structure](#project-structure) •
[License](#license)

</div>

Zero To DSA guides learners through 11 fundamental DSA topics with:

- **Theory-first approach** - Each topic begins with clear, example-driven content explaining the core concepts and patterns.
- **Multi-language code examples** - Solutions in C#, Python, Java, TypeScript, and C++ so you can learn in the language you're most comfortable with.
- **Interactive visualizations** - Step-through animations for arrays, sorting, trees, graphs, recursion, and DP tables.
- **Practice problems** - 52 curated problems with coded solutions in all supported languages.
- **Progress tracking** - Per-topic and per-problem status persisted in LocalStorage, with a dependency-aware learning path that unlocks topics as you complete prerequisites.
- **Exam mode** - Topic-specific multiple-choice exams to validate your understanding.

## Features

| Capability | Description |
|---|---|
| **Theory modules** | 11 topics with content, complexity tables, and multi-language code tabs |
| **Visualizations** | Step-through animations for sorting, trees, graphs, DP, recursion |
| **Practice problems** | 52 problems across all topics with solution panels and built-in code editor |
| **Topic exams** | MCQ exams per topic - pass to mark the module complete |
| **Progress dashboard** | `/progress` route with per-topic breakdown, stats, and activity log |
| **Dependency graph** | Topics unlock automatically when prerequisites are completed |
| **Multi-language** | Code in C#, Python, Java, TypeScript, and C++ with persistent language selector |
| **Bug reporting** | Integrated form with Turnstile spam protection, creates GitHub issues server-side |
| **Responsive design** | Full mobile support via Tailwind CSS and shadcn/ui components |
| **Dark mode** | Theme toggle with system preference detection |

## Topics

| # | Topic | Prerequisites |
|---|---|---|
| 1 | Big O & Complexity | - |
| 2 | Arrays & Strings | Big O |
| 3 | HashMaps & Sets | Big O |
| 4 | Linked Lists | Big O |
| 5 | Stacks & Queues | Big O |
| 6 | Recursion & Backtracking | Stacks & Queues |
| 7 | Sorting & Searching | Recursion |
| 8 | Trees & Tries | Recursion, Sorting |
| 9 | Graphs | Trees |
| 10 | Dynamic Programming | Recursion, Trees |
| 11 | Greedy & Intervals | Sorting |

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui (base-ui) |
| **Code highlighting** | Shiki |
| **Markdown** | react-markdown + remark-gfm |
| **Icons** | Lucide |
| **Font** | Geist (via next/font) |
| **Spam protection** | Cloudflare Turnstile |
| **Analytics** | Vercel Analytics |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/DotNetTitan/BeginnerDSA.git
cd BeginnerDSA

# Install dependencies
npm install

# Copy environment variables and fill in your keys
cp .env.example .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Required environment variables

| Variable | Description |
|---|---|
| `GITHUB_TOKEN` | GitHub classic token with `public_repo` scope (for bug report issues) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key |

### Build for production

```bash
npm run build
npm start
```

### Run tests

```bash
npm test        # 103 unit tests
npm run lint    # ESLint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── learn/[topicId]/    # Theory content
│   ├── practice/           # Problem listings and detail
│   ├── exam/[topicId]/     # Topic exams
│   ├── progress/           # Progress dashboard
│   ├── faq/                # FAQ page
│   ├── privacy/            # Privacy policy
│   └── report-bug/         # Bug report form
├── components/
│   ├── bug-report/         # Bug report form with Turnstile
│   ├── editor/             # Code editor with live execution
│   ├── exam/               # Exam question components
│   ├── home/               # Home page topic grid
│   ├── layout/             # Navbar, mobile nav, language selector
│   ├── learn/              # Theory section renderer
│   ├── practice/           # Practice problem components
│   └── ui/                 # Shared UI primitives (shadcn/ui)
├── lib/
│   ├── topics/             # Topic definitions (content, code, tables)
│   ├── problems/           # Problem definitions, solutions, test cases
│   ├── exams/              # Exam question definitions
│   ├── progress-store.ts   # LocalStorage progress persistence
│   └── types.ts            # Shared TypeScript types
└── public/                 # Static assets
```

## License

All rights reserved.
