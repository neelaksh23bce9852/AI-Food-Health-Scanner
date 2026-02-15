import React, { createContext, useContext, useState, ReactNode } from 'react';

// Shared state for the app
interface FoodContextType {
    lastScannedFood: string | null;
    setLastScannedFood: (foodName: string) => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

// Hook to use the shared state
export const useFoodContext = () => {
    const context = useContext(FoodContext);
    if (!context) {
        throw new Error('useFoodContext must be used within a FoodProvider');
    }
    return context;
};

// Provider component
export const FoodProvider = ({ children }: { children: ReactNode }) => {
    const [lastScannedFood, setLastScannedFood] = useState<string | null>(null);

    return (
        <FoodContext.Provider value={{ lastScannedFood, setLastScannedFood }}>
            {children}
        </FoodContext.Provider>
    );
};
