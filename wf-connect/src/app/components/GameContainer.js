'use client';
import { useState } from 'react';
import GameGrid from './GameGrid';
import EndScreen from './EndScreen';
import colourMap from '../colourMap';
import styles from './GameContainer.module.css';

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
        // Placeholder logic for submission
        if (selectedItems.length === 4) {
            let correctGroup = null;
            groups.map(group => {   
                if (group.items.every(item => selectedItems.includes(item))) {
                    correctGroup = group;
                }
            });

            if (correctGroup) {
                const items = correctGroup.items.map(id => remainingGridItems.find(item => item.id === id));
                const group = {
                    id: correctGroup.id,
                    name: correctGroup.name,
                    items: items
                }

                // Remove found group from grid
                setGridItems(remainingGridItems.filter(item => !correctGroup.items.includes(item.id)));
                setFoundGroups([...foundGroups, group]);

            } else {
                alert('Incorrect selection. You lost a life.');
                setLives(lives - 1);
            }
            setGuesses([...guesses, guessToString(selectedItems, groups)]);
            setSelectedItems([]);
        }
    }

    return (
    <div className="game-container">
        <h1>WF-Connect</h1>
        <div className={styles.gridContainer}>
        {foundGroups.length === groups.length || lives === 0 ? <EndScreen guesses={guesses} lives={lives} /> : null}
        <GameGrid 
            items={remainingGridItems} 
            selectedItems={selectedItems} 
            handleSelectItem={handleSelectItem} 
            foundGroups={foundGroups} 
        />
        </div>
        <button className="submit" onClick={handleSubmit}>Submit</button>
        <button className="reset" onClick={handleDeselectAll}>Deselect All</button>
        <div className="lives">{"X ".repeat(lives)}</div>
    </div>
    );
}