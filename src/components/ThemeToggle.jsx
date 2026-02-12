"use client"

import { useTheme } from "./ui/theme-provider";
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      )}

    </Button>
    /*
      aria-label="toggle theme"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 24,
        marginLeft: 8,
      }}
      */
  );
}
