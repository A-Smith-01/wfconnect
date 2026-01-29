import styles from '../styles/Notification.module.css';

export default function Notification({text, visible}) {
    return (
        <div className={`${styles.notification} ${visible ? styles.visible : ''}`}>
            {text}
        </div>
    );
}