import styles from '../styles/Switchbutton.module.css';

function grillLines() {
    return (
        <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="0" x2="5" y2="10" style={{stroke: "currentColor", strokeWidth: 1}} />
            <line x1="10" y1="0" x2="10" y2="10" style={{stroke: "currentColor", strokeWidth: 1}} />
            <line x1="0" y1="0" x2="0" y2="10" style={{stroke: "currentColor", strokeWidth: 1}} />
        </svg>
    );
}

function check(){
    return (
        <svg height="18" width="22" xmlns="http://www.w3.org/2000/svg">
            <line x1="9" y1="15" x2="2" y2="8" style={{stroke: "currentColor", strokeWidth: 4}} />
            <line x1="7" y1="14" x2="19" y2="2" style={{stroke: "currentColor", strokeWidth: 4}} />
        </svg> 
    )
}

function cross(){
    return (
        <svg height="26" width="26" xmlns="http://www.w3.org/2000/svg">
            <line x1="5" y1="5" x2="20" y2="20" style={{stroke: "currentColor", strokeWidth: 4}} />
            <line x1="5" y1="20" x2="20" y2="5" style={{stroke: "currentColor", strokeWidth: 4}} />
        </svg> 
    )
}

export default function Switchbutton({ isOn, handleToggle }) {
    return (
        <div className={styles.switchbutton} onClick={() => handleToggle(!isOn)}>
            {isOn ? <>
                    <div className={styles.grilllines}>{grillLines()}</div>
                    <div className={styles.switchicon}>{check()}</div> 
                </> :<>
                    <div className={styles.switchicon}>{cross()}</div>
                    <div className={styles.grilllines}>{grillLines()}</div>
                </>
            }
        </div>
    );
}