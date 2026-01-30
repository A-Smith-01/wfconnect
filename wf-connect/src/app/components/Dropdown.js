"use client";

import { useState, useRef, useEffect, Children } from "react";
import Image from "next/image";
import styles from "../styles/Dropdownselector.module.css";

export default function Dropdownselector({ children, name, useIcons, closeOnSelect = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Stick menu to the right side of the screen if it would overflow
  useEffect(() => {
    const checkMenuAlignment = () => {
      if (isOpen && menuRef.current && containerRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        
        const wouldOverflowRight = containerRect.left + menuRect.width > window.innerWidth;
        const offset = window.innerWidth - (containerRect.left + menuRect.width + 5);
        menuRef.current.style.left = wouldOverflowRight ? `${offset}px` : '0px';
      }
    };
    window.addEventListener("resize", checkMenuAlignment);
    checkMenuAlignment();
    
    return () => window.removeEventListener("resize", checkMenuAlignment);
  }, [isOpen]);

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
        { useIcons ? 
        <span className="material-symbols-rounded" style={{ fontSize: '24px' }}>{name}</span>:
        <b>{name}</b>}
      </button>
      
      {isOpen && (
        <div className={`${styles.menu}`} ref={menuRef}>
          {Children.map(children,child => (
              <div onClick={() => handleClick()}>
              {child}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
