import { createContext, useContext } from 'react';
import { useState, useEffect, useRef } from 'react';
import { debounce } from './Game/utils';
import { randomId } from './Game/random';
import { formatStyle, formatCosmetics } from './CosmeticsUtils';

const DEBOUNCE_DELAY = 200;
const AppContext = createContext(null);

export function AppContextProvider({ children }) {

    const [update, setUpdate] = useState(0);
    const cosmeticsData = useRef({cosmetics: [], users: {}});
    let usersIdsQueue = useRef([]);
    const debouncedGetUserCosmetics = useRef(debounce(() => {
        getUserCosmetics();
    }, DEBOUNCE_DELAY));

    function getUserCosmetics() {
        if(usersIdsQueue.current.length == 0) return;
        let ids = [...usersIdsQueue.current]; // Make a copy of the current queue

        axios.post(route('users.cosmetics.active', {twitch_ids: ids.length != 0 ? ids : [0]})).then((res) => {
            if(!res.data || res.data.error) return;
            res.data.cosmetics.forEach((cosmetic) => {
                if(!cosmeticsData.current.cosmetics.includes(cosmetic)) {
                    formatStyle(cosmetic);
                    cosmeticsData.current.cosmetics.push(cosmetic);
                }
            });
            Object.entries(res.data.users).forEach((entry) => {
                cosmeticsData.current.users[entry[0]] = entry[1];
            });
            usersIdsQueue.current = [];
            setUpdate(randomId());
        }).catch((err) => {
            //toast.error('Une erreur est survenue lors de la récupération des cosmétiques.');
            console.log(err);
        });
    }

    function getCosmetics(twitch_id) {
        if(!twitch_id || cosmeticsData.current == undefined) return null;
        else if(cosmeticsData.current.users[twitch_id] == undefined) {
            if(!usersIdsQueue.current.includes(twitch_id)) {
                usersIdsQueue.current.push(twitch_id);
                debouncedGetUserCosmetics.current();
            }
            return formatCosmetics([]);
        }
        
        return formatCosmetics(cosmeticsData.current.cosmetics?.filter((cosmetic) => cosmeticsData.current.users[twitch_id].includes(cosmetic.id.toString())));
    }

    useEffect(() => {
        if(usersIdsQueue.current.length > 0) {
            debouncedGetUserCosmetics.current(usersIdsQueue.current);
            usersIdsQueue.current = [];
        }
    }, []);

    return (
        <AppContext.Provider value={{
            update: update,
            cosmeticsData: cosmeticsData,
            getCosmetics: getCosmetics
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useValues() {
    return useContext(AppContext);
}