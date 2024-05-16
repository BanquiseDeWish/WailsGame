import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppContextProvider({ children }) {

    const [cosmeticsData, setCosmeticsData] = useState({cosmetics: [], users: {}});
    const [usersIds, setUsersIds] = useState([]);

    function getUserCosmetics() {
        let ids = [];
        usersIds.forEach((id) => {
            if(cosmeticsData == undefined || cosmeticsData.users[id] == undefined) {
                ids.push(id);
            }
        });
        axios.get(route('users.cosmetics.active', {twitch_ids: ids.length != 0 ? ids : [0]})).then((res) => {
            if(res.data == null || res.data == undefined) return;
            if(res.data.error) return;
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
        if(cosmeticsData == undefined || cosmeticsData.users[twitch_id] == undefined) {
            return null;
        }
        let cosmetics = cosmeticsData.cosmetics?.filter((cosmetic) => {
            return cosmeticsData.users[twitch_id]?.includes(cosmetic.id.toString())
        });
        return cosmetics;
    }

    useEffect(() => {
        getUserCosmetics();
    }, [usersIds]);

    return (
        <AppContext.Provider value={{
            cosmeticsData: cosmeticsData,
            setUsersIds: setUsersIds,
            getCosmetics: getCosmetics
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useValues() {
    return useContext(AppContext);
}