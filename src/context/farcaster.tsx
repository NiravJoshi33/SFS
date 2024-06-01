'use client';
import React, { createContext, useState, useEffect, ReactNode, FC } from "react";

// Define the type for the context value
interface FarcasterContextValue {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  toggleModal: () => void;
}

// Define the type for the provider props
interface FarcasterContextProviderProps {
  children: ReactNode;
}

// Create the context with an initial value of undefined
export const FarcasterContext = createContext<FarcasterContextValue | undefined>(undefined);

export const FarcasterContextProvider: FC<FarcasterContextProviderProps> = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <FarcasterContext.Provider
      value={{
        isModalOpen,
        setModalOpen,
        toggleModal
      }}
    >
      {children}
    </FarcasterContext.Provider>
  );
};
