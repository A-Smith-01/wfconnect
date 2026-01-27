import styles from "./Header.module.css";
import Dropdown from "./Dropdown";


export default function Header({handleThemeSelect, pageStyles}) {
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
        </header>
    )
}