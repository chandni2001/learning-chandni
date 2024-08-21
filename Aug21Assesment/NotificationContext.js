import React, { createContext, useState } from 'react';


export const Notifications = createContext();

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    return (
        <Notifications.Provider value={notifications}>
            {children}
        </Notifications.Provider>
    );
};

export default Notifications;