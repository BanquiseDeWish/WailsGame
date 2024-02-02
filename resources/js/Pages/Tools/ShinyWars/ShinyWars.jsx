import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import BDWSocket from '../../../Game/socket';

import MainLayout from '@/Layouts/MainLayout';

import SettingsMenu from './SubPage/SettingsMenu';
import GamePhaseHunt from './SubPage/GamePhaseHunt';
import GamePhaseDrawPkmn from './SubPage/GamePhaseDrawPkmn';
import GamePhaseDrawMap from './SubPage/GamePhaseDrawMap';

import GreenButton from '@/Components/Navigation/Buttons/GreenButton';

import { toast } from 'sonner'

let socket = null;

export default function ShinyWars() {

    const [globalValues, setGlobalValues] = useState({
        socket: null,
        phaseId: -1,
        isLeader: true,
        players_list: [
            /*{
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
            }*/
        ],
        map_list: [
            /*{
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
            }*/
        ],
        areMapsChosen: false,
        playerWheelWinner: null,
        mapWheelWinner: null,
        spin_nb_1: 0,
        spin_nb_2: 0,
    });

    const getPlayer = (id) => {
        return globalValues.players_list.find(p => p.id == id);
    }

    const modifyValues = (key, value) => {
        setGlobalValues(prevGlobalValues => {
            if (key === 'spin_nb_1' || key === 'spin_nb_2') {
                return { ...prevGlobalValues, [key]: prevGlobalValues[key] + 1 };
            } else {
                return { ...prevGlobalValues, [key]: value };
            }
        });
    }

    const createGame = () => {
        socket.emit('create_party');
    }

    const props = usePage().props;

    useEffect(() => {
        console.log('phaseId', globalValues.phaseId);
        console.log('globalValues', globalValues);
    }, [globalValues.phaseId]);

    useEffect(() => {
        console.log("ZEBI");

        socket = new BDWSocket("shinywars", { gameId: props.gameId, userId: props.auth?.twitch?.id, userName: props.auth?.twitch?.display_name })
        modifyValues('socket', socket);

        if (socket !== null) {
            function onConnect() {}

            function onDisconnect() {}

            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);

            socket.on('update_game_data', (data) => {
                switch(data.type) {
                    case 'players':
                        modifyValues('players_list', data.players);
                        break;
                    case 'maps':
                        let maps = [];
                        data.maps.forEach((map) => {
                            map.subMaps.forEach((subMap) => {
                                maps.push(subMap);
                            });
                        });
                        modifyValues('map_list', maps);
                        break;
                }
            });

            socket.on('wheel_player_turn', (data) => {
                console.log("globalValues:", globalValues);
                if(globalValues.phaseId != 1) return;
                modifyValues('playerWheelWinner', data.playerId);
                modifyValues('spin_nb_1', 0);
                console.log('wheel_player_turn', data);
            });

            socket.on('wheel_player_map', (data) => {
                console.log("globalValues:", globalValues);
                if(globalValues.phaseId != 1) return;
                modifyValues('mapWheelWinner', data.map);
                modifyValues('spin_nb_2', 0);
                console.log('wheel_player_map', data);
            });

            socket.on('player_update_pokemon', (data) => {
                if(globalValues.phaseId != 2) return;
                let player = getPlayer(data.playerId);
                if(player === undefined) return;
                player.catchPokemons[data.pokemonIndex] = data.hasCatch;
                modifyValues('players_list', globalValues.players_list);
            });

            socket.on('player_choose_turn', (data) => {
                if(globalValues.phaseId != 3) return;
            });

            socket.on('player_choose', (data) => {
                if(globalValues.phaseId != 3) return;
            });

            socket.on('pokemon_types_list', (data) => {
                if(globalValues.phaseId != 3) return;
            });

            socket.on('change_phase', (data) => {
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
            <MainLayout showOverflow={true} className={"flex flex-col justify-center items-center gap-6"}>
                <Head title="Shiny Wars"/>
                { globalValues.phaseId == -1 && (
                    <>
                        <GreenButton className={"button button_green outline-none"} onClick={() => {createGame()}}>
                            Créer une Game
                        </GreenButton>
                    </>
                )}
                { globalValues.phaseId == 0 && <SettingsMenu globalValues={globalValues} socket={globalValues.socket}/> }
                { globalValues.phaseId == 1 && <GamePhaseDrawMap globalValues={globalValues} socket={globalValues.socket}/> }
                { globalValues.phaseId == 2 && <GamePhaseHunt globalValues={globalValues} socket={globalValues.socket}/> }
                { globalValues.phaseId == 3 && <GamePhaseDrawPkmn globalValues={globalValues} socket={globalValues.socket}/> }
            </MainLayout>
            <style>{`

            `}
            </style>
        </>
    );
}