# LPU Co-Curricular Transcript System - Copilot Instructions

This document provides guidance for AI coding agents to effectively contribute to the LPU Co-Curricular Transcript System project.

## Project Overview

This is a web application built with React, Vite, TypeScript, and Tailwind CSS. It's designed to be a hub for student achievers to find perks and opportunities. The UI is built using `shadcn-ui` components.

## Architecture

- **Framework**: React with Vite for the build tooling.
- **Language**: TypeScript.
- **Styling**: Tailwind CSS for utility-first styling, with global styles in `src/App.css` and `src/index.css`.
- **UI Components**: Reusable UI components are from `shadcn-ui` and located in `src/components/ui`. Custom components are in `src/components`.
- **Backend**: Supabase is used for the backend. The client is configured in `src/integrations/supabase/client.ts`.
- **Routing**: The application uses `react-router-dom` for routing. Page components are located in `src/pages`. The main routes are defined in `src/App.tsx`.
- **Hooks**: Custom hooks are placed in `src/hooks`.

## Agent Workflow and Collaboration

- **Understand First**: Thoroughly understand user prompts. If a request is unclear, ask clarifying questions before writing any code.
- **Frontend First**: Always implement the frontend/UI changes first. After completing the frontend work, ask for user confirmation and feedback before proceeding to backend, database, or other logic.
- **Adhere to Design**: Strictly follow the existing UI/UX design, color palette, theme, and overall design of the project. Do not introduce new design styles unless specifically instructed.
- **Update Plan**: After each task is completed, update the `PLAN.md` file to reflect the progress.
- **Code Quality**: Review all generated code for errors, typos, and correctness before finalizing the changes.

## Developer Workflow

### Running the Project

To run the project locally, use the following command:

```bash
npm run dev
```

This will start the Vite development server.

### Building the Project

To create a production build, run:

```bash
npm run build
```

### Linting

The project uses ESLint for code quality. To run the linter, use:

```bash
npm run lint
```

## Key Files and Directories

- `src/App.tsx`: The main application component where routing is defined.
- `src/pages/`: Contains the top-level page components.
- `src/components/`: Contains reusable React components.
- `src/components/ui/`: Contains the `shadcn-ui` components.
- `src/integrations/supabase/client.ts`: The Supabase client configuration.
- `tailwind.config.ts`: The Tailwind CSS configuration file.
- `vite.config.ts`: The Vite configuration file.

## Conventions

- Use functional components with hooks.
- Follow the existing coding style and conventions.
- For UI, prefer using components from `src/components/ui` whenever possible.
- All Supabase interactions should go through the client defined in `src/integrations/supabase/client.ts`.
