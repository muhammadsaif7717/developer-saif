'use client'
import React, { createContext, useState } from 'react';

export const ActiveContext = createContext();

const ActiveProvider = ({ children }) => {
    const [active, setActive] = useState('home');
    return (
        <ActiveContext.Provider value={{ active, setActive }}>
            {children}
        </ActiveContext.Provider>
    );
};

export default ActiveProvider;