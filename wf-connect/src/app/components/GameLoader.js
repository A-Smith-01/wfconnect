import { PHgridItems, PHGroups } from '../placeholders/gridData';
import generateGridData from '../helpers/generateGridData';
import GameContainer from './GameContainer';

export default function GameLoader() {
    const USE_RANDDOM_DATA = false;
    let gridItems, groups;
    if ( USE_RANDDOM_DATA){
        const gridData = generateGridData();
        gridItems = gridData.gridItems;
        groups = gridData.groups;
    }else {
        // Use date-based seed to get consistent daily puzzle
        const today = new Date();
        const dateSeed = today.getFullYear().toString() + (today.getMonth()+1).toString().padStart(2,'0') + today.getDate().toString().padStart(2,'0');
        const gridData = generateGridData(dateSeed);
        gridItems = gridData.gridItems;
        groups = gridData.groups;
    }
    
    console.log(gridItems);
    return <GameContainer gridItems={gridItems} groups={groups} />;
}