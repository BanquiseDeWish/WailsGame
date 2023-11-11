import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import VIPGames from '../../../Game/vipgames';
import '../../../../css/vipgames.css';
import GlobalLayout from '@/Layouts/GlobalLayout';
import Ticket from '../../../Components/Games/VIPGames/Ticket';

import GreenButton from '@/Components/Buttons/GreenButton';

import VipGamesLogo from '../../../../assets/games/vip_games_inline.svg';

import UserCard from '@/Components/User/UserCard';
import GameNewsItem from '@/Components/Games/VIPGames/GameNewsItem';
import BlueButton from '@/Components/Buttons/BlueButton';

import Slot from '@/Components/Games/VIPGames/Slot';
import { randomId } from '../../../../js/Game/random';
import { waitUntil } from '../../../../js/Game/utils';

export default function VipGame() {
    const props = usePage().props;
    const [values, setValues] = useState({
        isConnected: false,
        tickets: [],
        waiting_users: [],
        current_player: {id: -1, name: '?????????'},
        playCount: 0,
        avatar: props.ziggy.url + '/api/user/0/icon',
        news_list: [<div className='w-full h-[80px] container le-tchat p-[16px] whitespace-nowrap'>Historique des Bonus</div>],
        roll_players: [],
        roll_playCount: [],
        game_start: false,
        game: null,
        choosen_playCount: undefined,
        choosen_player: undefined,
        spin_1: 0,
        spin_2: 0,
        players: [],
        players_points: [],
        player_point: undefined,
    });

    async function modifyValue(key, value) {
        if(key =='avatar') {
            setValues(values => ({ ...values, [key]: props.ziggy.url + '/api/user/' + value + '/icon' }));
        }
        else if(key == 'waiting_users') {
            setValues(values => ({ ...values, [key]: [...values.waiting_users, value] }));
        }
        else if(key == 'news_list') {
            setValues(values => ({ ...values, [key]: [...values.news_list, value] }));
        }
        else if(key == 'spin_1' || key == 'spin_2') {
            setValues(values => ({ ...values, [key]: values[key] + 1 }));
        }
        else if(key == 'current_player') {
            // wait until the slot is not spinning
            setValues(values => ({ ...values, [key]: value }));
        }
        else if(key == 'playCount') {
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
        if (wheels.classList.contains('my-hidden')) {
            wheels.classList.remove('my-hidden');
            player_points.classList.remove('my-hidden');
            penguin.classList.add('my-hidden');
            tickets.classList.add('my-hidden');
        }
        else {
            wheels.classList.add('my-hidden');
            player_points.classList.add('my-hidden');
            tickets.classList.remove('my-hidden');
            penguin.classList.remove('my-hidden');
        }
    }

    function getTicket(i, className, onClick) {
        return (<Ticket key={i} id={"ticket_" + i} number={i + 1} className={className} onClick={onClick} />);
    }

    function getNewsItem(player, subText) {
        return (<GameNewsItem key={randomId()} userId={player.id} userName={player.name} subText={subText}/>);
    }

    function getUserCard(player) {
        return (<UserCard key={randomId()} userId={player.id} userName={player.name}/>);
    }

    useEffect(() => {
        modifyValue('game', new VIPGames(modifyValue, getTicket, getNewsItem, getUserCard));
    }, []);

    useEffect(() => {
        console.log('Values.players has been updated');
        let points = [];
        values.players.sort((a, b) => (a.points < b.points) ? 1 : -1);
        values.players.forEach(player => {
            points.push(
                <div key={randomId()} className='player_points_item'>
                    <div className='flex justify-center items-center gap-[16px] w-full'>
                        <img className='w-[32px] h-[32px] rounded-full' src={props.ziggy.url + '/api/user/' + player.id + '/icon'} alt="" width={32} />
                        <div className='username_points'>{player.name}</div>
                    </div>
                    <div className='points'>
                        <div className='points_number'>{player.points}</div>
                        <div className='points_txt'>pts</div>
                    </div>
                </div>
            )
        });
        modifyValue('players_points', points);
    }, [values.players])

    useEffect(() => {
        if(values.news_list.length > 8) {
            values.news_list.shift();
        }
    }, [values.news_list]);

    useEffect(() => {
        console.log(values.player_point);
        if(values.player_point == undefined) return;
        let players = values.players;
        let index = players.findIndex(player => player.id == values.player_point.id);
        console.log(index, players);
        if(index != -1) {
            players[index].points = values.player_point.points;
            setValues(values => ({ ...values, ['players']: players }));
            console.log('Yes: ', values.players);
        }
        else {
            setValues(values => ({ ...values, ['players']: [...values.players, values.player_point] }));
            console.log('No: ', values.players);
        }
    }, [values.player_point]);


    return (
        <GlobalLayout>
            <Head title="VIP Game" />

            <div id="game_menu">
                <img src={VipGamesLogo} width={500} alt="Logo VipGames" />

                <div className='flex w-full justify-center items-center h-[620px] gap-[8px]'>
                    {/* Left Menu ( For Weils Cam and Chat) */}
                    <div className='flex flex-col gap-[8px] h-full w-[400px]'>
                        <div className='le-tchat flex-col container h-[220px]'> 
                            <span>LA CAM</span> 
                        </div>
                        <div className='le-tchat container flex-grow items-start p-[16px]'>
                            LE T'CHAT
                        </div>
                    </div>

                    {/* Center Div */}
                    <div className='flex flex-col gap-[8px] h-full w-[980px]'>
                        <div id='game_news' className='h-[80px] w-full flex-shrink-0'>
                            {values.news_list}
                        </div>
                        <div className='flex-1 flex-shrink-0 w-full overflow-hidden'>
                            <div className='container p-[16px] max-h-full h-full overflow-hidden flex-shrink-0 w-full'>
                                <div id='user-list-container' className='w-full overflow-hidden'>
                                    <div id='user-list' className='w-full max-h-full flex flex-row flex-wrap gap-[8px] overflow-auto'>
                                        {values.waiting_users}
                                    </div>
                                </div>
                                
                                <div id='tickets_pack' className='transition-back absolute my-hidden'>
                                    {values.tickets}
                                </div>
                                
                                <div id="wheels" className='transition-back absolute my-hidden'>
                                    <Slot
                                        id={'wheel_slot_1'}
                                        type={'player'}
                                        onClick={() => {values.game.askRandomPlayer()}}
                                        data={values.roll_players}
                                        winner={values.choosen_player}
                                        spin={values.spin_1}
                                        game={values.game}
                                        game_start={values.game_start}
                                        modifyValueParent={modifyValue}
                                    />

                                    <Slot
                                        id={'wheel_slot_2'}
                                        type={'number'}
                                        onClick={() => {values.game.askRandomPlayCount()}}
                                        data={values.roll_playCount}
                                        winner={values.choosen_playCount}
                                        spin={values.spin_2}
                                        game={values.game}
                                        game_start={values.game_start}
                                        modifyValueParent={modifyValue}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Div - Penguin of the user */}
                    <div className='flex flex-col gap-[8px] h-full w-[440px]'>
                        <div className='container h-[80px] justify-between p-[16px]'>
                            <div className='flex justify-center items-center gap-[16px] p-[0px]'>
                                <img src={values.avatar} alt="" className='rounded-full h-[48px]' width={48}/>
                                <div className='flex flex-col gap-[0px]'>
                                    <div className='item_username'>{values.current_player.name}</div>
                                    <div className='item_subtext'>Un Pingouin Content de Jouer</div>
                                </div>
                            </div>
                            <div className='play_count_text'>
                                {values.playCount}
                            </div>
                        </div>
                        <div className='le-tchat container flex-grow relative'>
                            <div id='penguin' className='flex justify-center items-center w-full h-full absolute'>
                                Coming Soon
                            </div>

                            <div id='player_points' className='flex flex-col w-full h-full absolute p-[32px] gap-[16px] overflow-hidden my-hidden'>
                                <div className='title-20 flex justify-center items-center w-full'>
                                    Les Points
                                </div>
                                <div className='flex flex-grow w-full flex-col gap-[8px] overflow-y-scroll pr-2'>
                                    {values.players_points}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='flex flex-row gap-8'>
                    {   
                        values.game_start
                        ? <GreenButton id="switch_button" className="button_green" onClick={() => {
                                switchGame();
                            }}
                            >Switch</GreenButton>
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
            </div>

        </GlobalLayout>
    );
}
