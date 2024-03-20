import { Head, usePage, router } from '@inertiajs/react';
import React, { useState, useEffect, useRef, useReducer } from 'react';
import BDWSocket from '../../../Game/socket';

import MainLayout from '@/Layouts/MainLayout';

import SettingsMenu from './SubPage/SettingsMenu';
import GamePhaseHunt from './SubPage/GamePhaseHunt';
import GamePhaseDrawPkmn from './SubPage/GamePhaseDrawPkmn';
import GamePhaseDrawMap from './SubPage/GamePhaseDrawMap';
import IndexMenu from './SubPage/IndexMenu';

import SavannahIcon from '@assets/icons/shinywars/savannah-svgrepo-com.svg';
import PolarIcon from '@assets/icons/shinywars/iceberg-svgrepo-com.svg';
import CanyonIcon from '@assets/icons/shinywars/desert-svgrepo-com.svg';
import CoastalIcon from '@assets/icons/shinywars/beach-svgrepo-com.svg';

import { toast } from 'sonner'

import { ShinyWarsProvider } from './ShinyWarsContext';

let socket = null;
const DEV = false;

export default function ShinyWars() {

    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    const globalValues = useRef({
        socket: null,
        phaseId: -1,
        isLeader: DEV ? true : false,
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
        pokemons: [undefined, undefined, undefined, undefined, undefined, undefined],
        pokemon_types: DEV ? [
            { name: "Dragon", image: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/dragon.png", available: true},
            { name: "Dragon", image: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/dragon.png", available: true},
            { name: "Dragon", image: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/dragon.png", available: true},
            { name: "Dragon", image: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/dragon.png", available: false},
            { name: "Dragon", image: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/dragon.png", available: false},
            { name: "Dragon", image: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/dragon.png", available: true},
            { name: "Feu", image: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/feu.png", available: true},
            { name: "Feu", image: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/feu.png", available: true},
            { name: "Feu", image: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/feu.png", available: false},
            { name: "Feu", image: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/feu.png", available: true},
            { name: "Feu", image: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/feu.png", available: true},
            { name: "Feu", image: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/feu.png", available: false},
        ]: [],
        drawpkm_player_turn: DEV ? {
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
        } : null,
        drawpkm_player_choose: null,
        players_map: {},
    });

    const getPlayer = (id) => {
        return globalValues.current.players_list.find(p => p.id == id);
    }

    const modifyValues = (key, value) => {
        if (key === 'spin_nb_1' || key === 'spin_nb_2') {
            globalValues.current[key] = globalValues.current[key] + 1;
        } else {
            globalValues.current[key] = value;
        }
        forceUpdate();
    }

    const props = usePage().props;

    useEffect(() => {
        console.log('phaseId', globalValues.current.phaseId);
    }, [globalValues.current.phaseId]);

    useEffect(() => {

        socket = new BDWSocket("shinywars", {}, { userName: props.auth?.twitch?.display_name }, { gameId: props.gameId, userId: props.auth?.twitch?.id })
        modifyValues('socket', socket);

        if (socket !== null) {
            function onConnect() {
                socket.emit('need_game_data');
            }

            function onDisconnect() { }

            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);

            socket.on('update_game_data', (data) => {
                if(data.maps) {
                    let maps = [];
                    data.maps.forEach((map) => {
                        map.subMaps.forEach((subMap) => {
                            switch (subMap.id) {
                                case 'polar_zone':
                                    subMap.icon = PolarIcon;
                                    break;
                                case 'savanna_zone':
                                    subMap.icon = SavannahIcon;
                                    break;
                                case 'canyon_zone':
                                    subMap.icon = CanyonIcon;
                                    break;
                                case 'coastal_zone':
                                    subMap.icon = CoastalIcon;
                                    break;
                            }
                            maps.push(subMap);
                        });
                    });
                    modifyValues('map_list', maps);
                }
                if(data.gameId) {
                    if(globalValues.current.gameId != data.gameId) {
                        router.replace(`/tools/shinywars/${data.gameId}`);
                        modifyValues('gameId', data.gameId);
                    }
                }
                if(data.players)
                    modifyValues('players_list', data.players);
                if(data.phaseId)
                    modifyValues('phaseId', data.phaseId);
                if(data.end_map_choice)
                    modifyValues('areMapsChosen', true);
                if(data.pokemons)
                    modifyValues('pokemons', data.pokemons);
                if(data.isLeader)
                    modifyValues('isLeader', data.isLeader);
                if(data.drawPkmPhase) {
                    if(data.drawPkmPhase.pokemon_types)
                        modifyValues('pokemon_types', data.drawPkmPhase.pokemon_types);
                    if(data.drawPkmPhase.current_player)
                        modifyValues('drawpkm_player_turn', globalValues.current.players_list.find(p => p.id == data.drawPkmPhase.current_player));
                }
                    
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
                let players_map = { ...globalValues.current.players_map };
                switch (data.map.id) {
                    case 'polar_zone':
                        data.map.icon = PolarIcon;
                        break;
                    case 'savanna_zone':
                        data.map.icon = SavannahIcon;
                        break;
                    case 'canyon_zone':
                        data.map.icon = CanyonIcon;
                        break;
                    case 'coastal_zone':
                        data.map.icon = CoastalIcon;
                        break;
                }
                players_map[data.playerId] = data.map;
                modifyValues('players_map', players_map);
            });

            socket.on('player_update_pokemon', (data) => {
                if (globalValues.current.phaseId != 2) return;
            
                let players = [...globalValues.current.players_list];
                let player = players.find(p => p.id == data.playerId);
                if (player === undefined) return;
                player.catchPokemons[data.pokemonIndex] = data.hasCatch;
                modifyValues('players_list', players);
            });

            socket.on('drawpkm_player_turn', (data) => {
                if (globalValues.current.phaseId != 3) return;
                modifyValues('drawpkm_player_turn', globalValues.current.players_list.find(p => p.id == data.playerId));
            });

            socket.on('drawpkm_player_choose', (data) => {
                if (globalValues.current.phaseId != 3) return;
                modifyValues('drawpkm_player_choose', data);
                let types = [...globalValues.current.pokemon_types];
                types[data.index].available = false;
                modifyValues('pokemon_types', types);
                let players = [...globalValues.current.players_list];
                let p = players.find(p => p.id == data.playerId);
                if(p.pokemons === undefined) p.pokemons = [];
                players.find(p => p.id == data.playerId)?.pokemons.push(data.pokemon);
                modifyValues('players_list', players);
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
            <ShinyWarsProvider value={{
                globalValues: globalValues.current,
                modifyValues: modifyValues,
                getPlayer: getPlayer,
            }}>
                <MainLayout showOverflow={true} className={"flex flex-col justify-center items-center gap-16"}>

                    <Head title="Shiny Wars" />
                    {globalValues.current.phaseId == -1 && <IndexMenu globalValues={globalValues} socket={globalValues.current.socket} />}
                    {globalValues.current.phaseId == 0 && <SettingsMenu globalValues={globalValues} socket={globalValues.current.socket} />}
                    {globalValues.current.phaseId == 1 && <GamePhaseDrawMap globalValues={globalValues} socket={globalValues.current.socket} />}
                    {globalValues.current.phaseId == 2 && <GamePhaseHunt globalValues={globalValues} socket={globalValues.current.socket} />}
                    {globalValues.current.phaseId == 3 && <GamePhaseDrawPkmn globalValues={globalValues} socket={globalValues.current.socket} />}

                    <img className='z-0 absolute scale-x-[-1] left-[-80px] bottom-[-50px] rotate-[10deg]' width={256} src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${361}/${'shiny'}.png`} alt="" />
                    <img className='z-0 absolute scale-x-[-1] left-[120px] bottom-[-60px]' width={256} src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${184}/${'shiny'}.png`} alt="" />
                    <img className='z-0 absolute right-[180px] bottom-[-40px]' width={256} src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${570}/${'shiny'}.png`} alt="" />
                    <img className='z-0 absolute right-[-90px] bottom-[-60px] rotate-[-10deg]' width={360} src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${376}/${'shiny'}.png`} alt="" />
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