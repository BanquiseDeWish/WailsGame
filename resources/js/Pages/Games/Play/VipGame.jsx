import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { DATA, setupGame, endPhase } from '../../../Game/vipgames';
import { socket } from '../../../Game/socket';
import '../../../../css/vipgames.css';
import GlobalLayout from '@/Layouts/GlobalLayout';
import Ticket from '../../../Components/Games/Ticket';

import VipGamesLogo from '../../../../assets/games/vip_games_inline.png'

export default function VipGame() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [values, setValues] = useState({ tickets: [], current_player: 'Aucun Joueur', playCount: 0 });

    function modifyValue(key, value) {
        setValues(values => ({ ...values, [key]: value }));
        console.log(values);
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
                <img src={VipGamesLogo} width={312} alt="Logo VipGames" />

                <div className='flex flex-grow w-full justify-center items-center'>

                    <div id="tickets_pack" className='transition-back absolute'>
                        <div className='w-full'>
                            <div id='user'>
                                <img id='user_icon' src=''/>
                                <div id='user_name'>{values.current_player}</div>
                            </div>

                        </div>
                        <div className='flex flex-row flex-wrap gap-3 justify-center'>
                            {values.tickets}
                        </div>
                    </div>

                </div>

                <div className='flex flex-row gap-8'>
                    <button onClick={() => fade('tickets_pack')}>FADE</button>
                    <button onClick={() => endPhase('waiting')}>Arrêter d'attendre les joueurs</button>
                    <button onClick={() => endPhase('chance')}>Fin des CHANCES</button>
                </div>
            </div>

        </GlobalLayout>
    );
}
