"use client"

import { useTheme } from "./ui/theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="toggle theme"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 24,
        marginLeft: 8,
      }}
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
