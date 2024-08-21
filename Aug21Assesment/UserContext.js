// import { createContext } from "react";
// const initialValue={name:"default name", city: "default city"};
// const UserContext=createContext(initialValue);
// export default UserContext;

import React, { createContext, useState } from 'react';

export const CurrentUser = createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: 'John Doe' });
    return (
        <CurrentUser.Provider value={user}>
            {children}
        </CurrentUser.Provider>
    );
};

export default CurrentUser;