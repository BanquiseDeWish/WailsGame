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
        avatar: props.ziggy.url + '/api/user/0/icon'
    });

    function modifyValue(key, value) {
        if(key =='avatar') {
            setValues(values => ({ ...values, [key]: props.ziggy.url + '/api/user/' + value + '/icon' }));
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

    useEffect(() => {
        setupGame(modifyValue, setIsConnected, getTicket);
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
                    <div className='flex flex-col gap-[8px] h-full'>
                        <div id='game_news'>
                            <GameNewsItem userId={0} userName={'Nico'} subText={'PRIO'}/>
                        </div>
                        <div className='container p-[32px] w-[980px] h-full'>
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
