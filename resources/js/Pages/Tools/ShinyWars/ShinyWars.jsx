import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import BDWSocket from '../../../Game/socket';

import GreenButton from '@/Components/Navigation/Buttons/GreenButton';

import Input from '@/Components/Forms/Input';
import PokemonMap from './Utils/PokemonMap';

import MapTeranium from '../../../../assets/games/shiny_wars/maps/teranium.png';


import MainLayout from '@/Layouts/MainLayout';

import SettingsMenu from './SubPage/SettingsMenu';
import GamePhaseHunt from './SubPage/GamePhaseHunt';
import GamePhaseDrawPkmn from './SubPage/GamePhaseDrawPkmn';
import GamePhaseDrawMap from './SubPage/GamePhaseDrawMap';

let socket = null;

export default function ShinyWars() {

    const [values, setValues] = useState({
        socket: null,
        phaseId: 0,
    });

    const modifyValues = (key, value) => {
        setValues(values => ({
            ...values,
            [key]: value
        }));
    }

    const props = usePage().props;

    useEffect(() => {
        socket = new BDWSocket("shinywars", { gameId: props.gameId, userId: props.auth?.twitch?.id, userName: props.auth?.twitch?.display_name })
        modifyValues('socket', socket);

        if (socket !== null) {
            function onConnect() {}

            function onDisconnect() {}

            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);

            socket.on('wheel_player_turn', (data) => {

            });

            socket.on('wheel_player_map', (data) => {

            });

            socket.on('player_choose_turn', (data) => {

            });

            socket.on('player_choose', (data) => {

            });

            socket.on('pokemon_types_list', (data) => {

            });

            socket.on('change_phase', (data) => {

            }); 

            return () => {
                socket.off('connect', onConnect);
                socket.off('disconnect', onDisconnect);
            }
        }
    }, []);

    return (
        <>
            <MainLayout showOverflow={true}>
                <Head title="Shiny Wars" />
                { values.phaseId == 0 && <SettingsMenu socket={values.socket}/> }
                { values.phaseId == 1 && <GamePhaseDrawMap socket={values.socket}/> }
                { values.phaseId == 2 && <GamePhaseHunt socket={values.socket}/> }
                { values.phaseId == 3 && <GamePhaseDrawPkmn socket={values.socket}/> }
            </MainLayout>
            <style>{`

            `}
            </style>
        </>
    );
}