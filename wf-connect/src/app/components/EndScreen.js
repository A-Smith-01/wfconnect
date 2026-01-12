import styles from './EndScreen.module.css';

export default function EndModal({guesses, lives}) {
    let endMessage = "";
    if(lives == 0){
       endMessage = "Novice"
    } else if(lives == 4) {
        endMessage = "Grandmaster"
    } else if(lives == 3) {
        endMessage = "Sage"
    } else if(lives == 2) {
        endMessage = "Hunter"
    } else {
        endMessage = "Adept"
    }
    return (
        <div className={styles.endModal}>
            <h2>{endMessage}</h2>
            <div className={styles.guesses}>
                {guesses.map((guess,index) => <p key={index}>{guess}</p>)}
            </div>
        </div>
    )
}