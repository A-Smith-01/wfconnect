'use client';
import { use, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import GameGrid from './GameGrid';
import EndScreen from './EndScreen';
import colourMap from '../colourMap';
import styles from './GameContainer.module.css';
import useNotification from '../hooks/useNotification';
import sleep from '../helpers/sleep';

function guessToString(guess, groups){
    return guess.reduce((acc, itemId) => {
        const itemGroup = groups.find(group => group.items.includes(itemId));
        return acc + colourMap[itemGroup.id].emote;
    }, "");
}

export default function GameContainer({gridItems, groups, newGameSeed}) {
    const [isHydrated, setIsHydrated] = useState(false);
    const [lives, setLives, clearLives] = useLocalStorage('lives', 4);
    const [remainingGridItems, setGridItems, clearGridItems] = useLocalStorage('remainingGridItems', gridItems);
    const [selectedItems, setSelectedItems] = useState([]);
    const [foundGroups, setFoundGroups, clearFoundGroups] = useLocalStorage('foundGroups', []);
    const [guesses, setGuesses, clearGuesses] = useLocalStorage('guesses', []);
    const [freezeInput, setFreezeInput] = useState(false);
    const [shakingItems, setShakingItems] = useState([]);
    const [showGameOver, setShowGameOver] = useState(false);
    const { text: notifText, visible: notifVisible, showNotification } = useNotification();
    const disabled = selectedItems.length !== 4;

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // Reset game state if new seed
    useEffect(() => {
        if (newGameSeed) {
            clearLives();
            clearGridItems();
            clearFoundGroups();
            clearGuesses();
        }else{
            // Check for game over
            if (lives <= 0 || foundGroups.length === groups.length) {
                setShowGameOver(true);
            }
        }
    }, [isHydrated]);

    if (!isHydrated) {
        return null;
    }

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

    function revealGroup(group, currentGridItems, currentFoundGroups){
        return new Promise((resolve) => {
            console.log("Revealing group:", group);
            const groupItems = currentGridItems.filter(item => group.items.includes(item.id));
            const otherItems = currentGridItems.filter(item => !group.items.includes(item.id));
            // Rearrange group items to front of grid unless it's the last group
            if (currentFoundGroups.length != 3){
                setGridItems([...groupItems, ...otherItems]);
            }
            
            // Wait for animation then remove group items
            setTimeout(() => {
                setGridItems(otherItems);
                setFoundGroups([...currentFoundGroups, {...group, items: groupItems}]);
                resolve();
            }, 500);
        });
    }

    async function handleGameOver(){
        setFreezeInput(true);
        let currentItems = remainingGridItems;
        let currentFoundGroups = foundGroups;
        
        // Reveal all remaining groups
        for (const group of groups) {
            if (!currentFoundGroups.find(g => g.id === group.id)) {
                const groupItems = currentItems.filter(item => group.items.includes(item.id));
                await revealGroup(group, currentItems, currentFoundGroups);
                currentItems = currentItems.filter(item => !group.items.includes(item.id));
                currentFoundGroups = [...currentFoundGroups, {...group, items: groupItems}];
                await sleep(1000);
            }
        }
        setShowGameOver(true);
    }

    function handleSubmit() {
        if (selectedItems.length === 4) {
            setFreezeInput(true);
            let highestMatches = 0;
            let correctGroup = null;
            let alreadyGuessed = false;
            let gameOver = false;
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

            // Handle guess outcome
            if (alreadyGuessed) {
                console.log("Already guessed");
                showNotification("Already guessed!", 1500);
                setFreezeInput(false);
                return;
            }else if (highestMatches === 4) {
                const groupItems = remainingGridItems.filter(item => correctGroup.items.includes(item.id));
                revealGroup(correctGroup, remainingGridItems, foundGroups)
                setSelectedItems([]);
                setFreezeInput(false);
                if (foundGroups.length + 1 === groups.length) {
                    gameOver = true;
                }
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
                if (lives - 1 <= 0) {
                    gameOver = true;
                }
            }
            setGuesses([...guesses, selectedItems]);

            // Check for game over
            if (gameOver) {
                handleGameOver();
            }
        }
    }

    return (
    <div className="game-container">
        <h1 className={styles.title}>WFConnect</h1>
        <div className={styles.gridContainer}>
        {showGameOver ? <EndScreen guesses={guesses.map(guess => guessToString(guess, groups))} lives={lives} setShow={setShowGameOver} /> : null}
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
            {foundGroups.length == 4 ? <button className={`${styles.controlButton} ${styles.showResultsButton}`} onClick={() => setShowGameOver(true)}>Show Results</button> : 
            <>
            <div className="flex">
                <button className={`${styles.controlButton}`} onClick={handleSubmit} disabled={disabled}>Submit</button>
                <button className={`${styles.controlButton}`} onClick={handleDeselectAll} disabled={freezeInput}>Deselect All</button>
            </div>
            <div className={styles.lives}>
                {lives > 0 ? lives : "DEAD"}
                <div className={styles.healthbar} style={{"width":`${100*lives/4}%`}}/>
            </div>
            </>
            }
        </div>
    </div>
    );
}