import { PHgridItems, PHGroups } from '../placeholders/gridData';
import generateGridData from '../helpers/generateGridData';
import GameContainer from './GameContainer';

export default function GameLoader() {
    const { gridItems, groups } = generateGridData();
    console.log(gridItems);
    return <GameContainer gridItems={gridItems} groups={groups} />;
}