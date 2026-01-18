"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ThemeSwitcher.module.css";

export default function ThemeSwitcher({ themes, onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeSelect = (theme) => {
    onThemeChange(theme);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={`button ${styles.button} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <b>CHANGE THEME</b>
      </button>
      
      {isOpen && (
        <div className={styles.menu}>
          {Object.keys(themes).map((themeKey) => {
            const theme = themes[themeKey];
            return (
              <div
                key={theme.class}
                className={`${styles.option} ${theme.class}`}
                onClick={() => handleThemeSelect(theme.class)}
              >
              <span className={styles.label}>{theme.label.toUpperCase()}</span>
            </div>
          )})}
        </div>
      )}
    </div>
  );
}
