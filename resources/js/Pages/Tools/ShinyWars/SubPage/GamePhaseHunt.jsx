import React, { useState } from 'react';

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

    let players = globalValues.current?.players_list.map((player, index) => {

        let pkms = [];
        player.catchPokemons.forEach((pkm, index) => {
            pkms.push(
                <div id={player.id + "_" + index} key={index} className='rounded-lg container_background p-4'>
                    { pkm ? 
                        (<span className='font-semibold'>✨ Shiny Capturé</span>) :
                        (<span className='text-[#62697D] font-semibold'>Toujours en shasse...</span>)
                    }
                </div>
            )
        });

        return (
            <div className='flex flex-col gap-6 w-[300px]'>
                <div className='rounded-lg container_background p-2 text-xl w-full flex items-center gap-4 font-semibold'>
                    <img width={56} height={56} style={{ borderRadius: 50 }} src={player.profile_image_url} alt="avatar_twitch" />
                    {player.name}
                </div>
                <div className='flex flex-col gap-2 w-full'>
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
            { globalValues.current?.isLeader && <GreenButton className="w-fit button_green outline-none" >Il est temps, de choisir !</GreenButton>}
        </>
    )

}