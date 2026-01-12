import styles from './selectGrid.module.css';
import Image from 'next/image';

export default function SelectGrid({ items,selectedItems, handleSelectItem }) {
    return (
        <div className={styles.selectGrid}>
            {items.map((item) => (
                <button 
                    key={item.id} 
                    className={`${styles.gridItem} ${selectedItems.includes(item.id) ? styles.selected : ''}`} 
                    onClick={() => handleSelectItem(item.id)}
                >
                    <Image src={item.imageUrl} alt={item.name} width={80} height={80} />
                    {/* <p>{item.name}</p> */}
                </button>
            ))}
        </div>
    )
}