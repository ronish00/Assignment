import { createContext, useContext, useEffect, useState } from "react";
import { projects } from "../constants";


const NotificationContext = createContext([]);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (!saved) {
      const original = projects.flatMap((item) => item.notifications);
      setNotifications(original);
      localStorage.setItem("notifications", JSON.stringify(original));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  return (
    <NotificationContext.Provider value={[notifications, setNotifications]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

