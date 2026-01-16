import GameLoader from "./components/GameLoader";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={`${styles.page} classic`}>
      <main className={styles.main}>
        <GameLoader />
      </main>
    </div>
  );
}
