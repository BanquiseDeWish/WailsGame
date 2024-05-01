import React, { useState, useEffect } from 'react';

import GreenButton from "@/Components/Navigation/Buttons/GreenButton"

import SavannahIcon from '@assets/icons/shinywars/savannah-svgrepo-com.svg';
import PolarIcon from '@assets/icons/shinywars/iceberg-svgrepo-com.svg';
import CanyonIcon from '@assets/icons/shinywars/desert-svgrepo-com.svg';
import CoastalIcon from '@assets/icons/shinywars/beach-svgrepo-com.svg';
import Slot from '@/Components/Games/VIPGames/Slot';

import { useValues } from '../ShinyWarsContext';

export default function GamePhaseDrawMap({ socket, globalValues, ...otherProps }) {

    const modifyValues = useValues().modifyValues;

    const [mapReceived, setMapReceived] = useState(false);

    useEffect(() => {
        if (globalValues.current.map_list.length > 0) {
            setMapReceived(true);
        }
    }, [globalValues.current.map_list]);

    return (
        <>
            <div className='flex flex-col gap-16 justify-center items-center'>
                <div className='flex flex-row gap-4'>
                    <div className='flex flex-col gap-4 w-80'>
                        {globalValues.current?.players_list?.map((player, index) => {
                            return (
                                <div key={index+player.name} className='flex flex-row'>
                                    <div className="flex flex-row gap-4 justify-start items-center p-4 rounded container_background w-full">
                                        <img width={56} src={player?.icon} alt="" className="rounded-full" />
                                        <div className='flex flex-col justify-between h-full'>
                                            <span className='text-lg font-medium'>{player?.name}</span>
                                            {globalValues.current.players_map[player.id] ? (
                                                <div className='flex flex-row gap-2'>
                                                    <img width={16} src={globalValues.current.players_map[player.id]?.icon} alt="" />
                                                    <span>{globalValues.current.players_map[player.id]?.name}</span>
                                                </div>
                                            ) : (
                                                <span className='italic'>En attente...</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-row gap-8 container_background p-4 rounded">
                        <Slot
                            id={"player_wheel"}
                            type={"with_icon"}
                            winner={globalValues.current.playerWheelWinner}
                            onSpinEnd={() => {}}
                            data={globalValues.current.players_list}
                            game_start={true}
                            spin={globalValues.current.spin_nb_1}
                            noButton
                        />
                        <Slot
                            id={"map_wheel"}
                            type={"with_icon"}
                            winner={globalValues.current.mapWheelWinner?.id}
                            onSpinEnd={() => {
                                let p_maps = { ...globalValues.current.players_map };
                                let map = globalValues.current?.map_list.find(m => m.id == globalValues.current?.mapWheelWinner?.id);
                                switch (map.id) {
                                    case 'polar_zone':
                                        map.icon = PolarIcon;
                                        break;
                                    case 'savanna_zone':
                                        map.icon = SavannahIcon;
                                        break;
                                    case 'canyon_zone':
                                        map.icon = CanyonIcon;
                                        break;
                                    case 'coastal_zone':
                                        map.icon = CoastalIcon;
                                        break;
                                }
                                p_maps[globalValues.current?.playerWheelWinner] = map;
                                modifyValues('players_map', p_maps);
                            }}
                            data={globalValues.current.map_list}
                            game_start={mapReceived}
                            spin={globalValues.current.spin_nb_2}
                            noButton
                        />
                    </div>
                </div>
                {globalValues.current?.isLeader && !globalValues.current?.areMapsChosen && <GreenButton className="w-fit button_green outline-none" onClick={() => {
                    globalValues.current?.socket?.emit('update_game_status', { type: 'map' });
                }}>Lancer le Tirage</GreenButton>}

                {globalValues.current?.isLeader && globalValues.current?.areMapsChosen &&
                    <GreenButton className="w-fit button_green outline-none"
                        onClick={() => {
                            globalValues.current?.socket?.emit('next_phase', {});
                        }
                        }
                    >
                        Allons Shasser !
                    </GreenButton>
                }
            </div>
            <style>{`
            :root {
                --slot-item-background: #21385D;
            }

            .wheel-slot .slot_item.number {
                font-size: 24px;
            }
        `}</style>
        </>
    )

}