import React, { useEffect, useState } from "react";
import "./NotificationToast.css";

interface NotificationToastProps {
  message: string;
  onClose: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
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