# DSA University

<div align="center">

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2016-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](LICENSE)

**A structured, interactive platform for mastering Data Structures & Algorithms — from Big O to Dynamic Programming.**

[Getting Started](#getting-started) •
[Features](#features) •
[Topics](#topics) •
[Project Structure](#project-structure) •
[Contributing](#contributing) •
[License](#license)

</div>

DSA University is a self-contained web application that guides learners through 11 fundamental DSA topics with:

- **Theory-first approach** — Each topic begins with clear, example-driven markdown content explaining the core concepts and patterns.
- **Multi-language code examples** — Solutions in C#, Python, Java, JavaScript, and C++ for every topic, so you can learn in the language you're most comfortable with.
- **Interactive visualizations** — Step-through SVG animations for arrays, stacks, linked lists, trees, graphs, sorting algorithms, and DP tables.
- **Practice problems** — 52 curated problems (Easy/Medium/Hard) with coded solutions and test cases to build muscle memory.
- **Progress tracking** — Per-topic and per-problem status persisted in LocalStorage, with a dependency-aware learning path that unlocks topics as you complete prerequisites.
- **Exam mode** — Topic-specific multiple-choice exams to validate your understanding before moving on.

## Features

| Capability | Description |
|---|---|
| **Theory modules** | 11 topics with markdown-rendered content, complexity tables, and code tabs |
| **Visualizations** | Interactive SVG-based step-through for arrays, sorting, trees, graphs, and more |
| **Practice problems** | 52 problems across all topics, each with a solution panel and runnable test cases |
| **Topic exams** | MCQ exams per topic — pass to mark the module complete |
| **Progress dashboard** | `/progress` route with per-topic breakdown, stats, and activity log |
| **Dependency graph** | Topics unlock automatically when all prerequisites are completed |
| **Multi-language** | Code examples in C#, Python, Java, JavaScript, and C++ with a persistent language selector |
| **Responsive design** | Full mobile support via Tailwind CSS and shadcn/ui components |

## Topics

| # | Topic | Prerequisites |
|---|---|---|
| 1 | Big O & Complexity | — |
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

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/dsa-university.git
cd dsa-university

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── learn/[topicId]/    # Theory content pages
│   ├── practice/           # Problem listings and detail
│   ├── exam/[topicId]/     # Topic exams
│   ├── visualize/[topicId]/# Interactive visualizations
│   ├── progress/           # Progress dashboard
│   └── page.tsx            # Home / roadmap
├── components/
│   ├── home/               # Roadmap and continue-learning tile
│   ├── learn/              # Theory section renderer
│   ├── visualization/      # SVG visualization components
│   ├── editor/             # Code renderer (Shiki)
│   └── ui/                 # Shared UI primitives
├── lib/
│   ├── topics/             # Topic definitions (content, code, tables)
│   ├── problems/           # Problem definitions and test cases
│   ├── exams/              # Exam question definitions
│   └── types.ts            # Shared TypeScript types
└── public/                 # Static assets
```

## Contributing

Contributions are welcome! Whether it's fixing a bug, improving documentation, adding a new problem, or refining an existing visualization — feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`.
3. Commit your changes: `git commit -m "feat: add my feature"`.
4. Push to the branch: `git push origin feat/my-feature`.
5. Open a pull request.

Please follow the existing code style and conventions. If you're adding a new topic or problem, ensure it includes content, code examples in all supported languages, and test cases.

## License

All rights reserved. No license file is present — the code is not currently open source.
