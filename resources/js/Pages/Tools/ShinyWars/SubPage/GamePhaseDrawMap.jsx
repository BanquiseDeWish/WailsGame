import React, { useState, useEffect } from 'react';

import GreenButton from "@/Components/Navigation/Buttons/GreenButton"

import Slot from '@/Components/Games/VIPGames/Slot';

export default function GamePhaseDrawMap({socket, globalValues, ...otherProps}) {

    const [mapReceived, setMapReceived] = useState(false);

    useEffect(() => {
        if (globalValues.current.map_list.length > 0) {
            setMapReceived(true);
        }
    }, [globalValues.current.map_list]);

    return (
        <>
        <div className="flex flex-col gap-16 justify-center items-center">
            <div className="flex flex-row gap-8">
                <Slot
                    id={"player_wheel"}
                    type={"with_icon"}
                    winner={globalValues.current.playerWheelWinner}
                    onSpinEnd={() => {
                        console.log('spin player end');
                    }}
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
                        console.log('spin map end');
                    }}
                    data={globalValues.current.map_list}
                    game_start={mapReceived}
                    spin={globalValues.current.spin_nb_2}
                    noButton
                />    
            </div>
            
            <div>

            </div>
            { globalValues.current?.isLeader && !globalValues.current?.areMapsChosen && <GreenButton className="w-fit button_green outline-none" onClick={() => {
                globalValues.current?.socket?.emit('update_game_status', {type: 'map'});
            }}>Lancer le Tirage</GreenButton>}
            
            { globalValues.current?.isLeader && globalValues.current?.areMapsChosen && 
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
                --slot-item-background: var(--container_background);
            }

            .wheel-slot .slot_item.number {
                font-size: 24px;
            }
        `}</style>
        </>
    )

}