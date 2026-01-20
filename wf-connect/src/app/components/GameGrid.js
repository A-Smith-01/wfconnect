import GroupGrid from "./grids/GroupGrid";
import SelectGrid from "./grids/SelectGrid";
import Notification from "./Notification";
import styles from './GameGrid.module.css';

export default function GameGrid({ 
    items,selectedItems, 
    handleSelectItem, 
    foundGroups, 
    notifText, 
    notifVisible,
    glowingItems, 
    shakingItems }) {
    return (
        <div className={styles.gameGrid}>
            <GroupGrid foundGroups={foundGroups} />
            <SelectGrid 
                items={items} 
                selectedItems={selectedItems} 
                handleSelectItem={handleSelectItem}
                glowingItems={glowingItems}
                shakingItems={shakingItems} />
            <Notification text={notifText} visible={notifVisible} />
        </div>
    )
}