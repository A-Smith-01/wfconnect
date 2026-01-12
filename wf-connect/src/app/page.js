import GameContainer from "./components/GameContainer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GameContainer />
      </main>
    </div>
  );
}
