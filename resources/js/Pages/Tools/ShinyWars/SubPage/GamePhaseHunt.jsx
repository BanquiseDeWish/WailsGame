import React, { useState, useEffect } from 'react';

import GreenButton from "@/Components/Navigation/Buttons/GreenButton"

export default function GamePhaseHunt({socket, globalValues, ...otherProps}) {

    const [huntValues, setHuntValues] = useState({
        players: []
    });

    const modifyValues = (key, value) => {
        setHuntValues(huntValues => ({
            ...huntValues,
            [key]: value
        }));
    }

    let players = globalValues?.players_list.map((player, index) => {
        console.log(player);

        let pkms = [];
        player.catchPokemons.forEach((pkm, index) => {
            pkms.push(
                <div id={player.id + "_" + index} key={index} className='rounded-lg container_background p-4'>
                    { pkm ? 
                        (<span>Shiny Capturé</span>) :
                        (<span>Toujours en shasse...</span>)
                    }
                </div>
            )
        });

        return (
            <div className='flex flex-col gap-6'>
                <div className='rounded-lg container_background p-4 text-xl'>
                    {player.name}
                </div>
                <div className='flex flex-col gap-2'>
                    {pkms}
                </div>
            </div>
        )
    });



    return (
        <>
            <div className="flex gap-12">
                {players}
            </div>
            { globalValues?.isLeader && <GreenButton className="button_green w-fit">Tirage au Sorts</GreenButton>}
        </>
    )

}