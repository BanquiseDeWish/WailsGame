import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import VIPGames from '../../../Game/vipgames';
import '@css/vipgames.css';
import GlobalLayout from '@/Layouts/GlobalLayout';
import Ticket from '../../../Components/Games/VIPGames/Ticket';

import GreenButton from '@/Components/Navigation/Buttons/GreenButton';

import VipGamesLogo from '../../../../assets/img/vipgames/vip_games_inline.svg';

import UserCard from '@/Components/User/UserCard';
import GameNewsItem from '@/Components/Games/VIPGames/GameNewsItem';
import BlueButton from '@/Components/Navigation/Buttons/BlueButton';

import { randomId } from '../../../Game/random';
import { waitUntil } from '../../../Game/utils';

import BinIcon from '@/Components/Icons/BinIcon';

import Confetti from 'react-confetti'
import RedButton from '@/Components/Navigation/Buttons/RedButton';

import { VIPGamesProvider } from './VIPGamesContext';
import LeftContent from './VIP_LeftContent';
import MiddleContent from './VIP_MiddleContent';
import RightContent from './VIP_RightContent';
import PopupContent from './VIP_PopupContent';

export default function VipGame() {
    const props = usePage().props;
    const [values, setValues] = useState({
        isConnected: false,
        tickets: [],
        waiting_users: [],
        current_player: { id: -1, name: '?????????' },
        playCount: 0,
        avatar: props.ziggy.url + '/api/user/0/icon',
        news_list: [<div className='w-full h-[80px] container le-tchat p-[16px] whitespace-nowrap'>Historique des Bonus</div>],
        roll_players: [],
        roll_playCount: [],
        game_start: false,
        game_end: false,
        game: null,
        choosen_playCount: undefined,
        choosen_player: undefined,
        spin_1: 0,
        spin_2: 0,
        players: [],
        players_points: [],
        player_point: undefined,
        remove_player: undefined,

        round: 0,
        available_tickets: 100,

        skull_update: 0,
    });

    async function modifyValue(key, value) {
        if (key == 'avatar') {
            setValues(values => ({ ...values, [key]: props.ziggy.url + '/api/user/' + value + '/icon' }));
        }
        else if (key == 'waiting_users') {
            setValues(values => ({ ...values, [key]: [...values.waiting_users, value] }));
        }
        else if (key == 'news_list') {
            setValues(values => ({ ...values, [key]: [...values.news_list, value] }));
        }
        else if (key == 'spin_1' || key == 'spin_2' || key == 'skull_update') {
            setValues(values => ({ ...values, [key]: values[key] + 1 }));
        }
        else if (key == 'current_player') {
            // wait until the slot is not spinning
            setValues(values => ({ ...values, [key]: value }));
        }
        else if (key == 'playCount') {
            // wait until the slot is not spinning
            setValues(values => ({ ...values, [key]: value }));
        }
        else {
            setValues(values => ({ ...values, [key]: value }));
        }
    }

    function switchGame() {
        let wheels = document.getElementById('wheels');
        let tickets = document.getElementById('tickets_pack');
        let penguin = document.getElementById('penguin');
        let player_points = document.getElementById('player_points');
        //temporary
        player_points.classList.remove('my-hidden');
        penguin.classList.add('my-hidden');

        if (wheels.classList.contains('my-hidden')) {
            wheels.classList.remove('my-hidden');
            //player_points.classList.remove('my-hidden');
            //penguin.classList.add('my-hidden');
            tickets.classList.add('my-hidden');
        }
        else {
            wheels.classList.add('my-hidden');
            //player_points.classList.add('my-hidden');
            tickets.classList.remove('my-hidden');
            //penguin.classList.remove('my-hidden');
        }
    }

    function getTicket(i, className, onClick) {
        return (<Ticket key={i} id={"ticket_" + i} number={i + 1} className={className} onClick={onClick} />);
    }

    function getNewsItem(player, subText) {
        return (<GameNewsItem key={randomId()} userId={player.id} userName={player.name} subText={subText} />);
    }

    function getUserCard(player) {
        return (<UserCard  key={randomId()} userId={player.id} userName={player.name} />);
    }

    useEffect(() => {
        modifyValue('game', new VIPGames(modifyValue, getTicket, getNewsItem, getUserCard));
    }, []);

    useEffect(() => {
        let points = [];
        values.players.sort((a, b) => (a.points <= b.points) ? 1 : -1);
        values.players.forEach(player => {
            points.push(
                <div key={randomId()} className='player_points_item relative'>
                    <div className='flex justify-center items-center gap-[16px] w-full'>
                        <img className='w-[32px] h-[32px] rounded-full' src={props.ziggy.url + '/api/user/' + player.id + '/icon'} alt="" width={32} />
                        <div className='username_points'>{player.name}</div>
                    </div>
                    <div className='points'>
                        <div className='points_number'>{player.points}</div>
                        <div className='points_txt'>pts</div>
                    </div>
                    <div className='points_bin' onClick={() => { values.game.removePlayer(player.id) }}>
                        <BinIcon width={32} height={32} />
                    </div>
                </div>
            )
        });
        modifyValue('players_points', points);
    }, [values.players])

    useEffect(() => {
        if (values.news_list.length > 8) {
            values.news_list.shift();
        }
    }, [values.news_list]);

    useEffect(() => {
        if (values.player_point == undefined) return;
        let players = [...values.players];
        let index = players.findIndex(player => player.id == values.player_point.id);
        if (index != -1) {
            players[index].points = values.player_point.points;
            modifyValue('players', players);
        }
        else {
            modifyValue('players', [...values.players, values.player_point]);
        }
    }, [values.player_point]);

    useEffect(() => {
        if (values.remove_player == undefined) return;
        if (values.remove_player == values.current_player.id) {
            modifyValue('current_player', { id: -1, name: '?????????' });
        }
    }, [values.remove_player]);

    return (
        <VIPGamesProvider value={{
            values: values,
            modifyValue: modifyValue,
        }}>
        <GlobalLayout disableEvent={true}>
            <Head title="VIP Game" />

            {
                values.game_end ? (
                    <>
                        <Confetti
                            className='confetti_index'
                            width={window.innerWidth}
                            height={window.innerHeight}
                        />
                    </>
                )
                    : (<></>)
            }

            <div id="game_menu">
                <img src={VipGamesLogo} width={540} alt="Logo VipGames" style={{filter: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.99))'}}/>

                <div className='flex flex-col gap-[8px]'>
                    <div className='flex w-full justify-center items-center h-[680px] gap-[24px] flex-shrink-0'>

                        {/* Left Menu ( For Weils Cam and Chat) */}
                        <LeftContent />

                        {/* Middle Div */}
                        <MiddleContent />

                        {/* Right Div - Penguin of the user */}
                        <RightContent />

                        <PopupContent
                            resetAn={values.skull_update}
                        />

                    </div>

                    <div className='relative flex justify-center items-center'>
                        <div className='flex flex-row gap-8 pt-[16px]'>
                            {
                                values.game_start
                                    ? (
                                        values.game_end ?
                                        (
                                            <RedButton id="quit_button" className="button_red" onClick={() => { window.location.href = route('vipgames.index') }}>
                                                Quitter
                                            </RedButton>
                                        ) :
                                        (
                                            <GreenButton id="switch_button" className="button_green" onClick={() => { switchGame(); }}>
                                                Switch
                                            </GreenButton>
                                        )
                                    )
                                    :
                                    <BlueButton id="play_button" className="button_blue w-[280px]" onClick={
                                        () => {
                                            values.game.endPhase('waiting');
                                            switchGame();
                                        }
                                    }>
                                        Jouer
                                    </BlueButton>
                            }
                        </div>
                        <div className='absolute top-0 right-0 flex flex-row gap-[8px] justify-end'>
                            <div className='container w-[200px] flex-col p-[16px]'>
                                <span>Numéros Restant</span>
                                <span>{values.available_tickets ? values.available_tickets : '-'}</span>
                            </div>
                            <div className='container w-[200px] flex-col p-[16px]'>
                                <span>Tour N°</span>
                                <span>{values.round ? values.round : '-'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlobalLayout>
        </VIPGamesProvider>
    );
}
