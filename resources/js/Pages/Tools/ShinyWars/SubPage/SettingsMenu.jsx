import React, { useState, useEffect } from 'react';
import PokemonMap from '../Utils/PokemonMap';

import GreenButton from '@/Components/Navigation/Buttons/GreenButton';

import Input from '@/Components/Forms/Input';
import CrossIcon from '@/Components/Icons/CrossIcon';

import MapTeranium from '../../../../../assets/games/shiny_wars/maps/teranium.png';

export default function SettingsMenu({socket, globalValues, ...otherProps}) {

    const [values, setValues] = useState({
        player_name: '',
    });

    const handleChange = (event) => {
        const allowed_names = [
            'player_name'
        ];
        if (allowed_names.includes(event.target.id)) {
            setValues(values => ({
                ...values,
                [event.target.id]: event.target.value
            }));
        }
    }

    const addPlayer = () => {
        socket.emit('update_players', {
            type:'add',
            userName: values.player_name
        });
    }

    useEffect(() => {

    }, [globalValues.players_list]);

    return (
        <>
            <div className='flex flex-col gap-4 w-[600px]'>
                <div className='flex flex-row g-4 items-end'>
                    <Input label="Joueur" type="text" id="player_name" placeholder={"Pseudo Twitch"} onChange={handleChange}
                        value={values.player_name}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addPlayer();
                                setValues(values => ({
                                    ...values,
                                    player_name: ''
                                }));
                            }
                        }}
                    />
                    <GreenButton className="w-fit button_green outline-none" onClick={addPlayer}>Ajouter</GreenButton>
                </div>
                <div id='players' className='flex flex-col gap-2 w-full'>
                    {
                        globalValues.players_list.map((player, index) => {
                            return (
                                <div key={index} className='w-full container p-2 flex justify-between'>
                                    <div className='flex justify-center items-center gap-2'>
                                        <img width={48} height={48} style={{ borderRadius: 50 }} src={player.profile_image_url} alt="avatar_twitch" />
                                        <span className='text-base font-semibold'>{player.name}</span>
                                    </div>
                                    <CrossIcon width={32} height={32} className={"icon"} onClick={() => {
                                        socket.emit('update_players', {type: 'remove', player_id: player.id});
                                    }}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <GreenButton type="submit" className="w-fit button_green outline-none" onClick={() => {
                socket.emit('start_game', {});
                console.log('Start_Game')
            }}>Lancer la Game</GreenButton>


            <style>
            {`
                .icon {
                    filter: invert(100%)
                }
                .icon:hover {
                    filter: invert(39%) sepia(55%) saturate(2297%) hue-rotate(336deg) brightness(81%) contrast(91%);
                }
            `}
            </style>
            {/*
            <div className='flex flex-row gap-4'>
                <PokemonMap mapUrl={MapTeranium} mapName={"Myrtille"} />
            </div>
            <form action="" className='flex flex-col gap-4'>
                <Input label="Nombre de Joueur" type="number" id="player_number" onChange={handleChange} />
                <Input label="Nombre de Pokémon à attraper" type="number" id="pkm_number" onChange={handleChange} />
                <GreenButton type="submit" className="w-fit button_green">Lancer</GreenButton>
            </form>
            */}
        </>
    )

}