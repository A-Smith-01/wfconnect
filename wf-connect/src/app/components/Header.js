import styles from "../styles/Header.module.css";
import Dropdown from "./Dropdown";
import Switchbutton from "./Switchbutton";
import { useState, useEffect } from "react";

export default function Header({
    handleThemeSelect, handleUseTextToggle, handleAllowWikiToggle, showText, allowWiki, pageStyles, winHistory}) {
    const [useIcons, setUseIcons] = useState(false);

    // Determine if icons should be used based on window width
    useEffect(() => {
        const checkWidth = () => {
            setUseIcons(window.innerWidth < 430);
        };

        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    return (
        <header className={styles.header}>
            <Dropdown 
            name={useIcons ? "bar_chart" : "STATS"}
            useIcons={useIcons}
            closeOnSelect={false}>
                <div className={styles.option}>
                    <span>Wins: {winHistory.wins}</span>
                </div>
                <div className={styles.option}>
                    <span>Current Streak: {winHistory.streak}</span>
                </div>
                <div className={styles.option}>
                    <span>Highest Streak: {winHistory.highestStreak}</span>
                </div>
            </Dropdown>
            <Dropdown 
            name={useIcons ? "palette" :"CHANGE THEME"}
            useIcons={useIcons}
            closeOnSelect={true}>
                {Object.keys(pageStyles).map(key => (
                    <div 
                    key={pageStyles[key].class} 
                    className={`${styles.option} ${pageStyles[key].class}`} 
                    onClick={() => handleThemeSelect(key)}>
                        {pageStyles[key].label.toUpperCase()}
                    </div>
                ))}
            </Dropdown>
            <Dropdown
            name={useIcons ? "settings" :"OPTIONS"}
            useIcons={useIcons}
            closeOnSelect={false}>
                <div className={`${styles.option} ${styles.grid}`}>
                    <span>Show Names</span>
                    <Switchbutton 
                    isOn={showText} 
                    handleToggle={handleUseTextToggle} />
                </div>
                <div className={`${styles.option} ${styles.grid}`}>
                    <span>Open wiki page on right click</span>
                    <Switchbutton 
                    isOn={allowWiki} 
                    handleToggle={handleAllowWikiToggle} />
                </div>
            </Dropdown>
        </header>
    )
}