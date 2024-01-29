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
        phaseId: 1,
        isLeader: true,
        players_list: [
            {
                "id": "532538904",
                "name": "NiixooZ",
                "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/91a264eb-cfd3-47cb-9f11-b04471943a9d-profile_image-300x300.png",
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
                "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/7610c39060476845-profile_image-300x300.png",
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
                "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/2656629d-c882-4f2c-9088-35ead338176b-profile_image-300x300.png",
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
                "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/553f2f68-c103-4cbf-bcfc-1120b18b2e6e-profile_image-300x300.png",
                "catchPokemons": [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                ]
            }
        ],
        areMapsChosen: false,
    });

    const getPlayer = (id) => {
        return globalValues.players_list.find(p => p.id == id);
    }

    const modifyValues = (key, value) => {
        setGlobalValues(globalValues => ({
            ...globalValues,
            [key]: value
        }));
    }

    const createGame = () => {
        socket.emit('create_party');
    }

    const props = usePage().props;

    useEffect(() => {
        console.log('phaseId', globalValues.phaseId);
    }, [globalValues.phaseId]);

    useEffect(() => {
        socket = new BDWSocket("shinywars", { gameId: props.gameId, userId: props.auth?.twitch?.id, userName: props.auth?.twitch?.display_name })
        modifyValues('socket', socket);

        if (socket !== null) {
            function onConnect() {}

            function onDisconnect() {}

            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);

            socket.on('update_players', (data) => {
                console.log('update_players', data);
                modifyValues('players_list', data.players);
            });

            socket.on('wheel_player_turn', (data) => {
                if(globalValues.phaseId != 1) return;
            });

            socket.on('wheel_player_map', (data) => {
                if(globalValues.phaseId != 1) return;
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