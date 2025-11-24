"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // prevent hydration mismatch

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-4 py-2 border rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
