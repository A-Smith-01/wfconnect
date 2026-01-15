import { useState } from 'react';
import styles from './EndScreen.module.css';
import useNotification from '../hooks/useNotification';
import Notification from './Notification';

export default function EndModal({guesses, lives, setShow}) {
    const { text: notifText, visible: notifVisible, showNotification } = useNotification();
    
    let endMessage = "";
    if(lives == 0){
       endMessage = "NOVICE"
    } else if(lives == 4) {
        endMessage = "GRANDMASTER"
    } else if(lives == 3) {
        endMessage = "SAGE"
    } else if(lives == 2) {
        endMessage = "HUNTER"
    } else {
        endMessage = "ADEPT"
    }

    const handleCopy = async () => {
        const date = new Date().toLocaleDateString('en-GB');
        const text = `WFConnect ${date}\n${guesses.join('\n')}`;
        await navigator.clipboard.writeText(text);
        showNotification("Results copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
        <div className={styles.endModal}>
            <h2><b>{endMessage}</b></h2>
            {lives > 0 && <p>Found with <b>{lives}</b> lives remaining</p>}
            <div className={styles.guesses}>
                {guesses.map((guess,index) => <p key={index}>{guess}</p>)}
            </div>
            <button className={styles.modalButton} onClick={handleCopy}>Share your results</button>
            <button className={styles.modalButton} onClick={() => setShow(false)}>Show Puzzle</button>
        </div>
        <Notification text={notifText} visible={notifVisible} />
        </>
    )
}