import GroupGrid from "./grids/GroupGrid";
import SelectGrid from "./grids/SelectGrid";
import Notification from "./Notification";
import styles from './GameGrid.module.css';

export default function GameGrid({ items,selectedItems, handleSelectItem, foundGroups, notifText, notifVisible }) {
    return (
        <div className={styles.gameGrid}>
            <GroupGrid foundGroups={foundGroups} />
            <SelectGrid items={items} selectedItems={selectedItems} handleSelectItem={handleSelectItem} />
            <Notification text={notifText} visible={notifVisible} />
        </div>
    )
}