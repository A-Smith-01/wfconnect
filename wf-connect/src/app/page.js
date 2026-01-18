"use client";

import { useState } from "react";
import { useLocalStorage } from "react-use";
import GameLoader from "./components/GameLoader";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Smoke from "./components/smoke";
import pageStyles from "./data/styles.js";
import styles from "./page.module.css";

export default function Home() {
  const [theme, setTheme] = useLocalStorage("theme", null);

  if(!theme) {
    setTheme(pageStyles.classic);
  }

  function handleThemeSelect(themeClass) {
    const selectedTheme = pageStyles[themeClass];
    if (selectedTheme) {
      setTheme(selectedTheme);
    }
  }

  if (!theme) {
    return null; // or a loading indicator
  }

  return (
    <div className={`${styles.page} ${theme.class}`}>
      <Smoke backgroundColour={theme.background} foregroundColour={theme.foreground}/>
      <ThemeSwitcher themes={pageStyles} onThemeChange={handleThemeSelect} />
      <main className={styles.main}>
        <GameLoader />
      </main>
    </div>
  );
}
