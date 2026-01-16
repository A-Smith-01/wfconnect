import Image from "next/image"
import styles from './groupGrid.module.css';
import colourMap from "../../colourMap";

export default function GroupGrid({foundGroups}) {
    return (
        <div className={styles.groupGrid}>
            {foundGroups.map((group) => (
                <div key={group.id} className={styles.group} style={{backgroundColor: colourMap[group.id].colour}}>
                    <div className={styles.groupImages}>
                        {group.items.map((item) => (
                            <Image key={item.id} src={item.imageUrl} alt={item.name} width="60" height="60"/>
                        ))}
                    </div>
                    <div className={styles.groupInfo}>
                        <h2>{group.name}</h2>
                        <div className={styles.groupItems}>
                            {group.items.reduce((acc, item) => acc + item.name + " ", "").trim()}
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    )
}