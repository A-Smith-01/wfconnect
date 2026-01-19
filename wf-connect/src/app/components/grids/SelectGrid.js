import styles from './selectGrid.module.css';
import Image from 'next/image';
import FlipMove from 'react-flip-move';

export default function SelectGrid({ items,selectedItems, handleSelectItem, glowingItems, shakingItems }) {
    return (
        <div className={styles.selectGrid}>
            <FlipMove leaveAnimation="none">
            {items.map((item) => (
                <button 
                    key={item.id} 
                    className={
                        `${styles.gridItem} 
                        ${selectedItems.includes(item.id) ? styles.selected : ''} 
                        ${glowingItems.includes(item.id) ? styles.glowAnimation : ''} 
                        ${shakingItems.includes(item.id) ? styles.shakeAnimation : ''}`} 
                    onClick={() => handleSelectItem(item.id)}
                >
                    <Image src={item.imageUrl} alt={item.name} width={80} height={80} />
                    {/* <p>{item.name}</p> */}
                </button>
            ))}
            </FlipMove>
        </div>
    )
}