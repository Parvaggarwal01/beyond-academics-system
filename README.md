# 🏆 LPU Co-Curricular Transcript System

A comprehensive web application designed to be a hub for student achievers to discover perks, opportunities, and track their academic and extracurricular accomplishments.

## ✨ Features

- **Dashboard**: Personalized dashboard for tracking achievements and progress
- **Beyond Academics**: Platform for non-academic achievements and leaderboards
- **Courses**: Course management and tracking system
- **EduRev Integration**: Educational content and achievement tracking
- **Student Referral System**: Connect and refer other students
- **Achievement Management**: Add, track, and showcase various accomplishments
- **Responsive Design**: Mobile-first approach with modern UI/UX

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: shadcn/ui for consistent, accessible components
- **Backend**: Supabase for database and authentication
- **Routing**: React Router DOM for client-side routing
- **State Management**: React Hooks and Context API

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/itsmeabirmohanta/achiever-perks-hub.git
   cd achiever-perks-hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials in `.env.local`

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run supabase:start` - Start local Supabase instance
- `npm run supabase:stop` - Stop local Supabase instance
- `npm run supabase:reset` - Reset Supabase database
- `npm run supabase:gen-types` - Generate TypeScript types from Supabase

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   └── Header.tsx      # Navigation header
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Courses.tsx     # Course management
│   ├── BeyondAcademics.tsx  # Non-academic achievements
│   └── ...
├── hooks/              # Custom React hooks
├── integrations/       # External integrations
│   └── supabase/       # Supabase client and types
└── lib/                # Utility functions
```

## 🔧 Configuration

### Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Copy your project URL and anon key
3. Update the environment variables
4. Run database migrations if needed

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- Custom color palette
- Extended spacing and typography
- Dark mode support
- shadcn/ui integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abir Mahanta** - [GitHub](https://github.com/itsmeabirmohanta)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Vite](https://vitejs.dev/) for the blazing fast build tool
