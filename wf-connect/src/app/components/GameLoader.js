'use client';

import { useState, useEffect } from 'react';
import generateGridData from '../helpers/generateGridData';
import GameContainer from './GameContainer';
import { useLocalStorage } from 'react-use';

export default function GameLoader({showText, allowWiki, winHistory, setWinHistory}) {
    const [seed, setSeed, clearSeed] = useLocalStorage('gameSeed', null);
    const [isNewDay, setIsNewDay] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const USE_RANDOM_DATA = true;

    function generateDateSeed(){
        const today = new Date();
        return today.getFullYear().toString() + (today.getMonth()+1).toString().padStart(2,'0') + today.getDate().toString().padStart(2,'0');
    }

    // Initialize seed on mount
    useEffect(() => {
        setIsHydrated(true);
        const randomSeed = Math.random()*10e6|0;
        const dateSeed = generateDateSeed();
        if (seed !== dateSeed || USE_RANDOM_DATA) {
            console.log('New day detected, generating new seed:', dateSeed);
            setSeed(USE_RANDOM_DATA ? randomSeed : dateSeed);
            setIsNewDay(true);
        }
    }, []);

    if (!isHydrated) {
        return null;
    }

    const { gridItems, groups } = generateGridData(seed);
    // console.log('Using seed:', seed);
    // console.log('Generated items:',gridItems);
    // console.log(isNewDay)
    return <GameContainer 
                gridItems={gridItems} 
                groups={groups} 
                newGameSeed={isNewDay}
                showText={showText}
                allowWiki={allowWiki}
                winHistory={winHistory}
                setWinHistory={setWinHistory} />;
}