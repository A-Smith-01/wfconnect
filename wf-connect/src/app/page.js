"use client";

import { useState } from "react";
import GameLoader from "./components/GameLoader";
import ThemeSwitcher from "./components/ThemeSwitcher";
import styles from "./page.module.css";

export default function Home() {
  const [theme, setTheme] = useState("classic");

  return (
    <div className={`${styles.page} ${theme}`}>
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
      <main className={styles.main}>
        <GameLoader />
      </main>
    </div>
  );
}
