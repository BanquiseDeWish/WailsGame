import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

import GreenButton from "@/Components/Navigation/Buttons/GreenButton"

import AddPokemonModal from '../Modal/AddPokemonModal';

export default function GamePhaseHunt({ socket, globalValues, ...otherProps }) {

    const [huntValues, setHuntValues] = useState({
        players: [],
    });
    const props = usePage().props;

    const modifyValues = (key, value) => {
        setHuntValues(huntValues => ({
            ...huntValues,
            [key]: value
        }));
    }

    useEffect(() => {
        let players = globalValues.current?.players_list.map((player, index) => {

            let pkms = [];
            player.catchPokemons.forEach((pkm, index) => {
                if (player.id == props.auth?.twitch?.id) {
                    pkms.push(
                        <>
                            <AddPokemonModal index={index} socket={socket} isCatch={pkm} pkm={globalValues.current?.pokemons[index]} />
                        </>
                    )
                }
                else {
                    pkms.push(
                        <div id={player.id + "_" + index} key={index} className='rounded-lg container_background p-4 h-[56px]'>
                            {pkm ?
                                (<span className='font-semibold'>✨ Shiny Capturé</span>) :
                                (<span className='text-[#57779D] font-semibold'>Toujours en shasse...</span>)
                            }
                        </div>
                    );
                }
            });

            return (
                <div className={`flex flex-col gap-6 w-[300px] ${player.id != props.auth?.twitch?.id && 'z-0'}`}>
                    <div className='rounded-lg container_background p-2 text-xl w-full flex items-center gap-4 font-semibold'>
                        <img width={56} height={56} style={{ borderRadius: 50 }} src={player.icon} alt="avatar_twitch" />
                        {player.name}
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        {pkms}
                    </div>
                </div>
            )
        });

        modifyValues('players', players);

    }, [globalValues.current.players_list]);

    return (
        <>
            <div className="flex gap-12">
                {huntValues.players}
            </div>
            {globalValues.current?.isLeader &&
                <GreenButton
                    className="w-fit button_green outline-none z-0"
                    onClick={() => {
                        globalValues.current?.socket?.emit('next_phase', {});
                    }}
                >
                    Il est temps, de choisir !
                </GreenButton>
            }
        </>
    )

}