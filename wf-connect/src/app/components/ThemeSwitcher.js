"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ThemeSwitcher.module.css";

const THEMES = [
  { value: "classic", label: "Classic" },
  { value: "vitruvian", label: "Vitruvian" },
];

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
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
        CHANGE THEME
      </button>
      
      {isOpen && (
        <div className={styles.menu}>
          {THEMES.map((theme) => (
            <div
              key={theme.value}
              className={`${styles.option} ${theme.value}`}
              onClick={() => handleThemeSelect(theme.value)}
            >
              <span className={styles.label}>{theme.label.toUpperCase()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
