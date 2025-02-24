import React, { useEffect, useState } from "react";
import "./NotificationToast.css";
const NotificationSound = "/notification-sound.mp3";

interface NotificationToastProps {
  message: string;
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Reproducir un sonido cuando la notificación aparece
    const audio = new Audio(NotificationSound); // Ruta al archivo de sonido
    audio.play().then(() => {
      console.log("Sonido reproducido correctamente");
    }).catch((error) => {
      console.error("Error al reproducir el sonido:", error);
    });

    // Ocultar la notificación después de 5 segundos
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification-toast ${isVisible ? "visible" : "hidden"}`}>
      <span>{message}</span>
    </div>
  );
};

export default NotificationToast;