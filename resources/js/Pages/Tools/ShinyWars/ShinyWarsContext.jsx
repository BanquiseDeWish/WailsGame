import { createContext, useContext } from 'react';

const ShinyWarsContext = createContext(null);

export function ShinyWarsProvider({ children, value }) {
    
    return (
        <ShinyWarsContext.Provider value={value}>
            {children}
        </ShinyWarsContext.Provider>
    );
}

export function useValues() {
    return useContext(ShinyWarsContext);
}