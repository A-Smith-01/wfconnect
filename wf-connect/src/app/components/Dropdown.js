"use client";

import { useState, useRef, useEffect, Children } from "react";
import styles from "./Dropdownselector.module.css";

export default function Dropdownselector({ children, name, closeOnSelect = true }) {
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

  const handleClick = () => {
    if (closeOnSelect){
        setIsOpen(false);
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={`button ${styles.button} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <b>{name}</b>
      </button>
      
      {isOpen && (
        <div className={styles.menu}>
          {Children.map(children,child => (
              <div
                onClick={() => handleClick()}
              >
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
