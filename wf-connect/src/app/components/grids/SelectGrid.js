import styles from './selectGrid.module.css';
import Image from 'next/image';
import FlipMove from 'react-flip-move';

export default function SelectGrid({ items,selectedItems, handleSelectItem, glowingItems, shakingItems }) {
    if(items.length === 0){
        return null;
    }
    return (
            <FlipMove 
                leaveAnimation="none" 
                className={styles.selectGrid} 
                style={{'grid-column':`1 / span 4`,
                        'grid-row':`${5 - items.length / 4} / span ${items.length / 4}`}}>
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
                    <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill={true} 
                        style={{"padding":"5px"}}/>
                    {/* <p>{item.name}</p> */}
                </button>
            ))}
            </FlipMove>
    )
}