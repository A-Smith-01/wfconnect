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
    const { text: notifText, visible: notifVisible, showNotification } = useNotification();

    function handleSelectItem(itemId) {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else if (selectedItems.length < 4) {
            setSelectedItems([...selectedItems, itemId]);
        }
    }

    function handleDeselectAll() {
        setSelectedItems([]);
    }

    function handleSubmit() {
        if (selectedItems.length === 4) {
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
                return;
            }else if (highestMatches === 4) {
                const items = correctGroup.items.map(id => remainingGridItems.find(item => item.id === id));
                const group = {
                    id: correctGroup.id,
                    name: correctGroup.name,
                    items: items
                }

                // Remove found group from grid
                setGridItems(remainingGridItems.filter(item => !correctGroup.items.includes(item.id)));
                setFoundGroups([...foundGroups, group]);

            } else if (highestMatches == 3) {
                console.log("Almost there");
                showNotification("Almost there!", 1500);
                setLives(lives - 1);
            } else {
                console.log("Incorrect");
                showNotification("Incorrect");
                setLives(lives - 1);
            }
            setGuesses([...guesses, selectedItems]);
            setSelectedItems([]);
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
        />
        </div>
        <button className="submit" onClick={handleSubmit}>Submit</button>
        <button className="reset" onClick={handleDeselectAll}>Deselect All</button>
        <div className="lives">{"X ".repeat(lives)}</div>
    </div>
    );
}