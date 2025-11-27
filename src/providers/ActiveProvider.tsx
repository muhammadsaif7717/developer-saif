'use client';
import { createContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface ActiveContextType {
  active: string;
  setActive: (value: string) => void;
}

// Create context with proper typing and default values
export const ActiveContext = createContext<ActiveContextType>({
  active: 'home',
  setActive: () => {},
});

// Define props type for the provider
interface ActiveProviderProps {
  children: ReactNode;
}

const ActiveProvider = ({ children }: ActiveProviderProps) => {
  const [active, setActive] = useState<string>('home');

  return (
    <ActiveContext.Provider value={{ active, setActive }}>
      {children}
    </ActiveContext.Provider>
  );
};

export default ActiveProvider;
