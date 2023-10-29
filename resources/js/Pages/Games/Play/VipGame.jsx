import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { setupGame, endPhase, askRandomPlayCount, askRandomPlayer } from '../../../Game/vipgames';
import { socket } from '../../../Game/socket';
import '../../../../css/vipgames.css';
import GlobalLayout from '@/Layouts/GlobalLayout';
import Ticket from '../../../Components/Games/VIPGames/Ticket';

import GreenButton from '@/Components/Buttons/GreenButton';

import VipGamesLogo from '../../../../assets/games/vip_games_inline.svg'

import GameNewsItem from '@/Components/Games/VIPGames/GameNewsItem';
import BlueButton from '@/Components/Buttons/BlueButton';

export default function VipGame() {
    const props = usePage().props;
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [values, setValues] = useState({
        tickets: [],
        current_player: {id: -1, name: 'Aucun Joueur'},
        playCount: 0,
        avatar: props.ziggy.url + '/api/user/0/icon',
        news_list: [<div className='w-full h-[80px] container le-tchat p-[16px] whitespace-nowrap'>Historique des Bonus</div>]
    });

    function modifyValue(key, value) {
        if(key =='avatar') {
            setValues(values => ({ ...values, [key]: props.ziggy.url + '/api/user/' + value + '/icon' }));
        }
        else if(key == 'news_list') {
            if(values.news_list.length > 8) {
                values.news_list.shift();
            }
            setValues(values => ({ ...values, [key]: [...values.news_list, value] }));
        }
        else {
            setValues(values => ({ ...values, [key]: value }));
        }
    }

    function fade(id) {
        let e = document.getElementById(id);
        if (e.classList.contains('my-hidden')) {
            e.classList.remove('my-hidden');
        }
        else {
            e.classList.add('my-hidden');
        }
    }

    function getTicket(i, className, onClick) {
        return (<Ticket key={i} id={"ticket_" + i} number={i + 1} className={className} onClick={onClick} />);
    }

    function getNewsItem(player, subText) {
        return (<GameNewsItem key={player.id} userId={player.id} userName={player.name} subText={subText}/>);
    }

    useEffect(() => {
        setupGame(modifyValue, setIsConnected, getTicket, getNewsItem);
    }, []);

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
                        <div id='game_news' className='h-[80px] w-full'>
                            {values.news_list}
                        </div>
                        <div className='container p-[32px] w-full flex-1'>
                            <div id='tickets_pack' className='transition-back absolute'>
                                {values.tickets}
                            </div>
                            <div id="wheels" className='transition-back absolute my-hidden'>
                                <GreenButton onClick={() => {askRandomPlayer()}}>Tourner !</GreenButton>
                                <GreenButton onClick={() => {askRandomPlayCount()}}>Tourner !</GreenButton>
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
                        <div className='le-tchat container flex-grow'>
                            Coming Soon
                        </div>
                    </div>

                </div>

                <div className='flex flex-row gap-8'>
                    <GreenButton className="button_green" onClick={() => fade('tickets_pack')}>Afficher les Roues</GreenButton>
                    <GreenButton className="button_green" onClick={() => fade('wheels')}>Afficher les Tickets</GreenButton>
                    <BlueButton className="button_blue w-[280px]" onClick={() => endPhase('waiting')}>Jouer</BlueButton>
                </div>
            </div>

        </GlobalLayout>
    );
}
