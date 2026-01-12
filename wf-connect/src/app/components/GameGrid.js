import GroupGrid from "./grids/GroupGrid";
import SelectGrid from "./grids/SelectGrid";
import styles from './GameGrid.module.css';

export default function GameGrid({ items,selectedItems, handleSelectItem, foundGroups }) {
    return (
        <div className={styles.gameGrid}>
            <GroupGrid foundGroups={foundGroups} />
            <SelectGrid items={items} selectedItems={selectedItems} handleSelectItem={handleSelectItem} />
        </div>
    )
}