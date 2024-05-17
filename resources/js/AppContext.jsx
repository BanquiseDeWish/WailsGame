import { createContext, useContext } from 'react';
import { useState, useEffect, useRef } from 'react';
import { debounce } from './Game/utils';

const DEBOUNCE_DELAY = 200;
const AppContext = createContext(null);

export function AppContextProvider({ children }) {

    const [cosmeticsData, setCosmeticsData] = useState({cosmetics: [], users: {}});
    let usersIdsQueue = useRef([]);
    const debouncedGetUserCosmetics = useRef(debounce((ids) => {
        getUserCosmetics(ids);
        usersIdsQueue.current = [];
    }, DEBOUNCE_DELAY));

    function getUserCosmetics(ids) {
        if(ids.length == 0) return;
        axios.post(route('users.cosmetics.active', {twitch_ids: ids.length != 0 ? ids : [0]})).then((res) => {
            if(res.data == null || res.data == undefined || res.data.error) return;

            let newCosmeticsData = {
                cosmetics: [...cosmeticsData.cosmetics],
                users: { ...cosmeticsData.users }
            };
            res.data.cosmetics.forEach((cosmetic) => {
                if(!newCosmeticsData.cosmetics.includes(cosmetic)) {
                    newCosmeticsData.cosmetics.push(cosmetic);
                }
            });
            Object.entries(res.data.users).forEach((entry) => {
                newCosmeticsData.users[entry[0]] = entry[1];
            });
            setCosmeticsData(newCosmeticsData);
        }).catch((err) => {
            //toast.error('Une erreur est survenue lors de la récupération des cosmétiques.');
            console.log(err);
        });
    }

    function getCosmetics(twitch_id) {
        if(!twitch_id || cosmeticsData == undefined) return null;
        else if(cosmeticsData.users[twitch_id] == undefined) {
            if(!usersIdsQueue.current.includes(twitch_id)) {
                usersIdsQueue.current = [...usersIdsQueue.current, twitch_id];
                debouncedGetUserCosmetics.current(usersIdsQueue.current);
            }
            return null;
        }
        let cosmetics = cosmeticsData.cosmetics?.filter((cosmetic) => {
            return cosmeticsData.users[twitch_id]?.includes(cosmetic.id.toString())
        });
        return cosmetics;
    }

    useEffect(() => {
        if(usersIdsQueue.current.length > 0) {
            debouncedGetUserCosmetics.current(usersIdsQueue.current);
            usersIdsQueue.current = [];
        }
    }, []);

    return (
        <AppContext.Provider value={{
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