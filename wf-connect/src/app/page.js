"use client";

import { useLocalStorage } from "react-use";
import GameLoader from "./components/GameLoader";
import Header from "./components/Header";
import Smoke from "./components/smoke";
import pageStyles from "./data/styles.js";
import styles from "./page.module.css";

export default function Home() {
  const [theme, setTheme] = useLocalStorage("theme", null);
  const [showText, setShowText] = useLocalStorage("useText", false);
  const [allowWiki, setAllowWiki] = useLocalStorage("allowWiki", false);
  const [winHistory, setWinHistory] = useLocalStorage("winHistory", {wins:  0, streak: 0, highestStreak: 0});

  if(!theme) {
    setTheme(pageStyles.classic);
  }

  function handleThemeSelect(themeClass) {
    const selectedTheme = pageStyles[themeClass];
    if (selectedTheme) {
      setTheme(selectedTheme);
    }
  }

  function handleUseTextToggle(value) {
    setShowText(value);
  }

  function handleAllowWikiToggle(value) {
    setAllowWiki(value);
  }

  if (!theme) {
    return null; // or a loading indicator
  }

  return (
    <div className={`${styles.page} ${theme.class}`}>
      <Smoke backgroundColour={theme.background} foregroundColour={theme.foreground}/>
      <Header 
        handleThemeSelect={handleThemeSelect} 
        handleUseTextToggle={handleUseTextToggle} 
        handleAllowWikiToggle={handleAllowWikiToggle}
        pageStyles={pageStyles} 
        showText={showText}
        allowWiki={allowWiki}/>
      <main className={styles.main}>
        <GameLoader 
          showText={showText} 
          allowWiki={allowWiki}
           winHistory={winHistory} 
           setWinHistory={setWinHistory}/>
      </main>
    </div>
  );
}
