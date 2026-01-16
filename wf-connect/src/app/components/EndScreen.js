import { useState } from 'react';
import styles from './EndScreen.module.css';
import colourMap from '../colourMap';
import useNotification from '../hooks/useNotification';
import Notification from './Notification';

function guessToString(guess, groups){
    return guess.reduce((acc, itemId) => {
        const itemGroup = groups.find(group => group.items.includes(itemId));
        return acc + colourMap[itemGroup.id].emote;
    }, "");
}

function itemToBox(itemId, groups){
    const itemGroup = groups.find(group => group.items.includes(itemId));
    const colour = colourMap[itemGroup.id].colour;
    return <div key={itemId} className={styles.itemBox} style={{backgroundColor: colour}}></div>;
}

export default function EndModal({groups, guesses, lives, setShow}) {
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
        const guessesString = guesses.map(guess => guessToString(guess, groups))
        const text = `WFConnect ${date}\n${guessesString.join('\n')}`;
        await navigator.clipboard.writeText(text);
        showNotification("Results copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.endModal}>
                <h2><b>{endMessage}</b></h2>
                {lives > 0 && <p>Found with <b>{lives}</b> {lives > 1 ? 'lives' : 'life'} remaining</p>}
                <ul className={styles.guesses}>
                    {guesses.map((guess,index) => <li className={styles.guess} key={index}>{guess.map(itemId => itemToBox(itemId, groups))}</li>)}
                </ul>
                <button className={styles.modalButton} onClick={handleCopy}>Share your results</button>
                <button className={styles.modalButton} onClick={() => setShow(false)}>Show Puzzle</button>
            </div>
            <Notification text={notifText} visible={notifVisible} />
        </div>
    )
}