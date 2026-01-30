import Image from "next/image"
import styles from '../../styles/groupGrid.module.css';
import colourMap from "../../data/colourMap";

export default function GroupGrid({foundGroups}) {
    return (
        <>
            {foundGroups.map((group) => (
                <div key={group.id} className={styles.group} style={{backgroundColor: colourMap[group.id].colour}}>
                    <div className={styles.groupImages}>
                        {group.items.map((item) => (
                            <div key={item.id} className={styles.groupImageWrapper}>
                                <Image 
                                    key={item.id} 
                                    src={item.imageUrl} 
                                    alt={item.name} 
                                    fill={true}/>
                            </div>
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
        </>
    )
}