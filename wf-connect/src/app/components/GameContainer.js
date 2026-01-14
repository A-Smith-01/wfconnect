'use client';
import { useState } from 'react';
import GameGrid from './GameGrid';
import EndScreen from './EndScreen';
import colourMap from '../colourMap';
import styles from './GameContainer.module.css';
import useNotification from '../hooks/useNotification';

function guessToString(guess, groups){
    return guess.reduce((acc, itemId) => {
        const itemGroup = groups.find(group => group.items.includes(itemId));
        return acc + colourMap[itemGroup.id].emote;
    }, "");
}

export default function GameContainer({gridItems, groups}) {
    const [lives, setLives] = useState(4);
    const [remainingGridItems, setGridItems] = useState(gridItems);
    const [selectedItems, setSelectedItems] = useState([]);
    const [foundGroups, setFoundGroups] = useState([]);
    const [guesses, setGuesses] = useState([]);
    const [freezeInput, setFreezeInput] = useState(false);
    const [shakingItems, setShakingItems] = useState([]);
    const { text: notifText, visible: notifVisible, showNotification } = useNotification();
    const disabled = selectedItems.length !== 4;

    function handleSelectItem(itemId) {
        if (freezeInput) return;
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else if (selectedItems.length < 4) {
            setSelectedItems([...selectedItems, itemId]);
        }
    }

    function handleDeselectAll() {
        setSelectedItems([]);
    }

    function revealGroup(group){
        console.log("Revealing group:", group);
        // Rearrange group items to front of grid
        const groupItems = remainingGridItems.filter(item => group.items.includes(item.id));
        const otherItems = remainingGridItems.filter(item => !group.items.includes(item.id));
        setGridItems([...groupItems, ...otherItems]);
        // Wait for animation then remove group items
        setTimeout(() => {
            setGridItems(remainingGridItems.filter(item => !group.items.includes(item.id)));
            setFoundGroups([...foundGroups, {...group, items: groupItems}]);
        }, 500);

    }

    function handleSubmit() {
        if (selectedItems.length === 4) {
            setFreezeInput(true);
            let highestMatches = 0;
            let correctGroup = null;
            let alreadyGuessed = false;
            // Check if guess was already made
            console.log(selectedItems);
            guesses.forEach(guess => {
                const guessSet = new Set(guess);
                const selectedSet = new Set(selectedItems);
                if (guessSet.size === selectedSet.size && [...guessSet].every(value => selectedSet.has(value))) {
                    alreadyGuessed = true;
                }
            });

            // Check number of selected items in each group
            groups.map(group => {   
                const matches = group.items.filter(item => selectedItems.includes(item)).length;
                
                if (matches > highestMatches) {
                    highestMatches = matches;
                    correctGroup = group;
                }
            });
            if (alreadyGuessed) {
                console.log("Already guessed");
                showNotification("Already guessed!", 1500);
                setFreezeInput(false);
                return;
            }else if (highestMatches === 4) {
                revealGroup(correctGroup);
                setSelectedItems([]);
                setFreezeInput(false);
            } else {
                console.log("Incorrect");
                if (highestMatches === 3) showNotification("Almost there!", 1500);
                setShakingItems(selectedItems);
                setLives(lives - 1);
                setTimeout(() => {
                    setShakingItems([])
                    setSelectedItems([]);
                    setFreezeInput(false);
                }, 500);
            }
            setGuesses([...guesses, selectedItems]);
        }
    }

    return (
    <div className="game-container">
        <h1>WF-Connect</h1>
        <div className={styles.gridContainer}>
        {foundGroups.length === groups.length || lives === 0 ? <EndScreen guesses={guesses.map(guess => guessToString(guess, groups))} lives={lives} /> : null}
        <GameGrid 
            items={remainingGridItems} 
            selectedItems={selectedItems} 
            handleSelectItem={handleSelectItem} 
            foundGroups={foundGroups} 
            notifText={notifText}
            notifVisible={notifVisible}
            shakingItems={shakingItems}
        />
        </div>
        <div className={styles.gridBelow}>
            <div className="flex">
                <button className={`${styles.controlButton}`} onClick={handleSubmit} disabled={disabled}>Submit</button>
                <button className={`${styles.controlButton}`} onClick={handleDeselectAll}>Deselect All</button>
            </div>
            <div className={styles.lives}>{"X ".repeat(lives)}</div>
        </div>
    </div>
    );
}