import { useState } from "react";

export default function useNotification() {
    const [text, setText] = useState("");
    const [visible, setVisible] = useState(false);

    function showNotification(message, duration = 3000) {
        setText(message);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, duration);
    }

    return { text, visible, showNotification };
}