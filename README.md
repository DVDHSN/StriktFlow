<div align="center">
  <img alt="StriktFlow Screenshot" src="<img width="1775" height="957" alt="image" src="https://github.com/user-attachments/assets/0a3b43e6-851a-4432-81ca-cbd0a8d55e31">
" />
  <h1>StriktFlow Pomodoro</h1>
  <p>An Apple-inspired minimal Pomodoro timer with a premium dark mode interface, fluid animations, and powerful productivity tools to help you maintain focus.</p>
  <p>
    <img alt="Vite" src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white"/>
    <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  </p>
</div>

## Description

StriktFlow is a sophisticated Pomodoro timer designed for individuals who appreciate minimalist aesthetics and powerful functionality. Inspired by Apple's design language, it features a clean, dark-mode-first interface with smooth, physics-based animations powered by Framer Motion.

The core of the application is a highly customizable Pomodoro timer that helps you cycle through focused work sessions and breaks. Beyond the timer, StriktFlow integrates essential productivity tools, including a task manager to define your focus for each session and a deadline tracker to keep your long-term goals in sight. All your settings, tasks, and deadlines are saved locally in your browser for a persistent experience.

## ✨ Key Features

-   **Elegant Pomodoro Timer**: A beautifully animated timer with a circular progress indicator and a unique scrolling digit effect.
-   **Multiple Timer Modes**: Switch seamlessly between Focus, Short Break, and Long Break modes.
-   **Extensive Customization**:
    -   **20+ Themes**: A wide variety of curated light and dark themes to match your mood and setup.
    -   **Custom Intervals**: Adjust the duration for focus, short, and long breaks.
    -   **Session Configuration**: Set the number of focus sessions before a long break.
    -   **Behavior Toggles**: Enable/disable features like "Strict Mode" (disables controls during focus), auto-starting timers, and audio feedback.
-   **Productivity Tools**:
    -   **Focus Goals (Tasks)**: A slide-in panel to manage your to-do list. Add, complete, and delete tasks. Set a specific task as the primary focus for your current session.
    -   **Deadline Tracker**: Keep track of important upcoming dates and see a countdown of days remaining.
-   **Session Progress Tracker**: Visually track your completed sessions in the current cycle.
-   **Fluid Animations**: Smooth, interruptible animations throughout the UI, powered by Framer Motion, provide a premium user experience.
-   **Audio Feedback**: Subtle, programmatically generated sounds for starting a timer and completing a session using the Web Audio API.
-   **Local Persistence**: All your settings, tasks, and deadlines are automatically saved to your browser's local storage.

## 🛠️ Tech Stack

-   **Frontend**: [React](https://react.dev/) (v19) & [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN)
-   **Animation**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **AI Services**: [Google Gemini](https://ai.google.dev/) (via `@google/genai`)

## 🚀 Installation & Setup

Follow these steps to get the project running on your local machine.

**Prerequisites:**
-   [Node.js](https://nodejs.org/) (v18 or later)
-   [npm](https://www.npmjs.com/) (or yarn/pnpm)
-   A [Google Gemini API Key](https://ai.google.dev/tutorials/get_started_web)

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/striktflow-pomodoro.git
cd striktflow-pomodoro
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set up environment variables:**
Create a file named `.env` in the root of the project and add your Google Gemini API key. The application build process requires this key, even if the AI features are not fully implemented in the UI.

```env
# .env
GEMINI_API_KEY="YOUR_API_KEY_HERE"
```

**4. Run the development server:**
```bash
npm run dev
```

The application should now be running at `http://localhost:3000`.

## 🖥️ Usage

-   **Start/Pause Timer**: Click the large timer display to start or pause the current session.
-   **Switch Modes**: Use the `Focus` / `Break` / `Rest` buttons at the top to switch between Pomodoro modes. This is disabled if "Strict Mode" is active during a focus session.
-   **Reset Timer**: Click the circular arrow icon in the footer to reset the timer for the current mode.
-   **Manage Tasks**: Click the **Tasks** button in the top-left header to open the task drawer. Here you can add, complete, delete, and set a task as your current focus.
-   **Track Deadlines**: Click the **Deadlines** button in the header to manage your long-term goals.
-   **Configure Settings**: Click the **Settings** cog icon in the top-right header to open the settings panel, where you can customize themes, durations, and behavior.

## 📂 File Structure

Here's an overview of the key files and directories in the project:

```
striktflow-pomodoro/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable React components (Timer, SettingsDrawer, etc.)
│   ├── services/          # Services for external APIs (e.g., geminiService.ts)
│   ├── utils/             # Utility functions (e.g., audio.ts)
│   ├── App.tsx            # Main application component and state management
│   ├── constants.ts       # Project-wide constants (themes, default settings)
│   ├── index.tsx          # Entry point for the React application
│   └── types.ts           # TypeScript type definitions
├── .env                   # Environment variables (you need to create this)
├── index.html             # Main HTML file
├── package.json           # Project dependencies and scripts
└── vite.config.ts         # Vite configuration file
```

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, feel free to open an issue or submit a pull request.

1.  **Fork** the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** to the branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details. (Note: A `LICENSE` file was not provided, but MIT is a common default for such projects).
