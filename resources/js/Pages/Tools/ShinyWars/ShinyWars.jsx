import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect, useRef, useReducer } from 'react';
import BDWSocket from '../../../Game/socket';

import MainLayout from '@/Layouts/MainLayout';

import SettingsMenu from './SubPage/SettingsMenu';
import GamePhaseHunt from './SubPage/GamePhaseHunt';
import GamePhaseDrawPkmn from './SubPage/GamePhaseDrawPkmn';
import GamePhaseDrawMap from './SubPage/GamePhaseDrawMap';

import GreenButton from '@/Components/Navigation/Buttons/GreenButton';

import { toast } from 'sonner'

import { ShinyWarsProvider } from './ShinyWarsContext';

let socket = null;
const DEV = false;

export default function ShinyWars() {

    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    const globalValues = useRef({
        socket: null,
        phaseId: -1,
        isLeader: true,
        areMapsChosen: false,
        playerWheelWinner: null,
        mapWheelWinner: null,
        spin_nb_1: 0,
        spin_nb_2: 0,
        players_list: DEV ? [
            {
                "id": "121111915",
                "name": "hJune",
                "icon": "https://static-cdn.jtvnw.net/jtv_user_pictures/7610c39060476845-profile_image-300x300.png",
                "catchPokemons": [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                ]
            },
            {
                "id": "532538904",
                "name": "NiixooZ",
                "icon": "https://static-cdn.jtvnw.net/jtv_user_pictures/91a264eb-cfd3-47cb-9f11-b04471943a9d-profile_image-300x300.png",
                "catchPokemons": [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                ]
            },
            {
                "id": "432857248",
                "name": "Krolay",
                "icon": "https://static-cdn.jtvnw.net/jtv_user_pictures/2656629d-c882-4f2c-9088-35ead338176b-profile_image-300x300.png",
                "catchPokemons": [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                ]
            },
            {
                "id": "79824508",
                "name": "WeilsTTV",
                "icon": "https://static-cdn.jtvnw.net/jtv_user_pictures/553f2f68-c103-4cbf-bcfc-1120b18b2e6e-profile_image-300x300.png",
                "catchPokemons": [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                ]
            },
        ] : [],
        map_list: DEV ? [
            {
                "id": "polar_zone",
                "name": "Zone Polaire",
            },
            {
                "id": "savana_zone",
                "name": "Zone Savane",
            },
            {
                "id": "canyon_zone",
                "name": "Zone Canyon",
            },
            {
                "id": "coastal_zone",
                "name": "Zone Côtière",
            }
        ] : [],
    });

    const getPlayer = (id) => {
        return globalValues.current.players_list.find(p => p.id == id);
    }

    const modifyValues = (key, value) => {
        if (key === 'player_list') {
            console.log('player_list', value);
        }
        if (key === 'spin_nb_1' || key === 'spin_nb_2') {
            globalValues.current[key] = globalValues.current[key] + 1;
        } else {
            globalValues.current[key] = value;
        }
        forceUpdate();
    }

    const createGame = () => {
        socket.emit('create_party');
    }

    const props = usePage().props;

    useEffect(() => {
        console.log('phaseId', globalValues.current.phaseId);
    }, [globalValues.current.phaseId]);

    useEffect(() => {
        socket = new BDWSocket("shinywars", {}, {userName: props.auth?.twitch?.display_name}, { gameId: props.gameId, userId: props.auth?.twitch?.id })
        modifyValues('socket', socket);

        if (socket !== null) {
            function onConnect() { }

            function onDisconnect() { }

            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);

            socket.on('update_game_data', (data) => {
                if(data.maps) {
                    let maps = [];
                        data.maps.forEach((map) => {
                            map.subMaps.forEach((subMap) => {
                                maps.push(subMap);
                            });
                        });
                    modifyValues('map_list', maps);
                }
                if(data.players)
                    modifyValues('players_list', data.players);
                if(data.phaseId)
                    modifyValues('phaseId', data.phaseId);
                if(data.end_map_choice)
                    modifyValues('areMapsChosen', true);
            });

            socket.on('wheel_player_turn', (data) => {
                if (globalValues.current.phaseId != 1) return;
                modifyValues('playerWheelWinner', data.playerId);
                modifyValues('spin_nb_1', 0);
            });

            socket.on('wheel_player_map', (data) => {
                if (globalValues.current.phaseId != 1) return;
                modifyValues('mapWheelWinner', data.map);
                modifyValues('spin_nb_2', 0);
            });

            socket.on('player_update_pokemon', (data) => {
                if (globalValues.current.phaseId != 2) return;
            
                let players = [...globalValues.current.players_list];
                let player = players.find(p => p.id == data.playerId);
                if (player === undefined) return;
                player.catchPokemons[data.pokemonIndex] = data.hasCatch;
                modifyValues('players_list', players);
            });

            socket.on('player_choose_turn', (data) => {
                if (globalValues.current.phaseId != 3) return;
            });

            socket.on('player_choose', (data) => {
                if (globalValues.current.phaseId != 3) return;
            });

            socket.on('pokemon_types_list', (data) => {
                if (globalValues.current.phaseId != 3) return;
            });

            socket.on('change_phase', (data) => {
                console.log('change_phase', data);
                modifyValues('phaseId', data.phaseId);
            });

            socket.on('error', (data) => {
                toast.error(data.message);
            });

            return () => {
                socket.off('connect', onConnect);
                socket.off('disconnect', onDisconnect);
            }
        }
    }, []);

    return (
        <>
            <ShinyWarsProvider value={{
                globalValues: globalValues.current,
                modifyValues: modifyValues,
                getPlayer: getPlayer,
            }}>
                <MainLayout showOverflow={true} className={"flex flex-col justify-center items-center gap-6"}>

                    <Head title="Shiny Wars" />
                    {globalValues.current.phaseId == -1 && (
                        <>
                            <GreenButton className={"button button_green outline-none"} onClick={() => { createGame() }}>
                                Créer une Game
                            </GreenButton>
                        </>
                    )}
                    {globalValues.current.phaseId == 0 && <SettingsMenu globalValues={globalValues} socket={globalValues.current.socket} />}
                    {globalValues.current.phaseId == 1 && <GamePhaseDrawMap globalValues={globalValues} socket={globalValues.current.socket} />}
                    {globalValues.current.phaseId == 2 && <GamePhaseHunt globalValues={globalValues} socket={globalValues.current.socket} />}
                    {globalValues.current.phaseId == 3 && <GamePhaseDrawPkmn globalValues={globalValues} socket={globalValues.current.socket} />}

                    <img className='z-0 absolute scale-x-[-1] left-[-80px] bottom-[-40px] rotate-[10deg]' width={300} src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${361}/${'shiny'}.png`} alt="" />
                    <img className='z-0 absolute scale-x-[-1] left-[160px] bottom-[-70px]' width={300} src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${184}/${'shiny'}.png`} alt="" />
                    <img className='z-0 absolute right-[220px] bottom-[-40px]' width={300} src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${570}/${'shiny'}.png`} alt="" />
                    <img className='z-0 absolute right-[-120px] bottom-[-80px] rotate-[-10deg]' width={480} src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${376}/${'shiny'}.png`} alt="" />
                </MainLayout>
                <style>{`
                :root {
                    --container_background: rgba(61.34, 105.63, 173.19, 0.20);
                    --content_background: #121A25;
                    --light_background: #2C3344;
                    --web_background: linear-gradient(254deg, #18273D 0%, #070A1E 100%);
                    --modal_background: linear-gradient(254deg, #1F304A 0%, #0D1B30 100%);
                    --input_placeholder_color: #57779D;
                }
            `}
                </style>
            </ShinyWarsProvider>
        </>
    );
}