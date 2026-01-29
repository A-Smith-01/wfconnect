import styles from "../styles/Header.module.css";
import Dropdown from "./Dropdown";
import Switchbutton from "./Switchbutton";

export default function Header({
    handleThemeSelect, handleUseTextToggle, handleAllowWikiToggle, showText, allowWiki, pageStyles}) {
    return (
        <header className={styles.header}>
            <Dropdown 
            name="CHANGE THEME"
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
            name="OPTIONS"
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