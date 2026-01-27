"use client";

import { useLocalStorage } from "react-use";
import GameLoader from "./components/GameLoader";
import Header from "./components/Header";
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
      <Header handleThemeSelect={handleThemeSelect} pageStyles={pageStyles} />
      <main className={styles.main}>
        <GameLoader />
      </main>
    </div>
  );
}
