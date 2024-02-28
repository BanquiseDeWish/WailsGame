import { createContext, useContext } from 'react';

const VIPGamesContext = createContext(null);

export function VIPGamesProvider({ children, value }) {
    return (
        <VIPGamesContext.Provider value={value}>
            {children}
        </VIPGamesContext.Provider>
    );
}

export function useValues() {
    return useContext(VIPGamesContext);
}