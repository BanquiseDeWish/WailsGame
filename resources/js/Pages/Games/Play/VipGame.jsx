import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { socket, DATA, setData } from '../../../socket';
import '../../../../css/vipgames.css';
import Ticket from '@/Components/Games/Ticket';
import axios from 'axios'
import GlobalLayout from '@/Layouts/GlobalLayout';

export default function VipGame() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [values, setValues] = useState({tickets: []});

    useEffect(() => {

        /* POUR LAPI QUI CHECK ET ENREGISTRE LUTILISATEUR SI NON EXISTANT
            axios.post(route('api.user.register'), {userId: user.id, userName: user.name})
                    .then((response) => { {user: User::class - Object} console.log("Réponse de l'api") })
        */

        function flipTicketWithDelay(tickets, amount) {
            setTimeout(() => {
                document.getElementById("ticket_" + tickets[amount]).classList.add('ticket_miss');
                if(amount < tickets.length - 1) {
                    flipTicketWithDelay(tickets, amount + 1);
                }
            }, 1000);
        }

        function playTicket(id) {
            socket.emit('play_ticket', id);
        }

        function receiveInfo(data) {
            switch (data.name) {
                case 'play_ticket':
                    if(data.action == 'miss') {
                        document.getElementById("ticket_" + data.ticket_id).classList.add('ticket_miss');
                    }
                    else if(data.action == 'bonus') {
                        document.getElementById("ticket_" + data.ticket_id).classList.add('ticket_bonus', 'animate__flip');
                    }
                    else if(data.action == 'win') {
                        document.getElementById("ticket_" + data.ticket_id).classList.add('ticket_win', 'animate__flip');
                    }
                    document.getElementById("ticket_" + data.ticket_id).onClick = null;
                    break;

                case 'player_turn':

                    break;

                case 'flip_tickets':
                    flipTicketWithDelay(data.tickets, 0);
                    break;

                case 'shuffle_players':
                    console.log(data.players);
                    let data2 = DATA;
                    data2.players = data.players;
                    setData(data2);
                    console.log(DATA.players)
                    break;
            }

        }

        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function getFirstGameInfo(data) {
            setData(data);
            let tickets = [];
            console.log(DATA);
            for (let i = 0; i < DATA.number_of_tickets; i++) {
                if(DATA.tickets.includes(i)) {
                    tickets.push(<Ticket key={i} id={"ticket_" + i} number={i + 1} onClick={() => playTicket(i)} />);
                }
                else {
                    if(DATA.bonus_tickets.includes(i)) {
                        tickets.push(<Ticket key={i} id={"ticket_" + i} number={i + 1} className="ticket ticket_bonus animate__flip" />);
                    }
                    else if (i == DATA.winning_ticket) {
                        tickets.push(<Ticket key={i} id={"ticket_" + i} number={i + 1} className="ticket ticket_win animate__flip"/>);
                    }
                    else {
                        tickets.push(<Ticket key={i} id={"ticket_" + i} number={i + 1} className="ticket ticket_miss"/>);
                    }
                }
            }
            setValues({tickets: tickets})
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('first_game_info', getFirstGameInfo);
        socket.on('game_info', receiveInfo);

        socket.emit('need_game_info', null);
    }, []);

    return (
        <GlobalLayout>
            <Head title="VIP Game" />

            <div id="game_menu">
                <div id="tickets_pack">
                    {values.tickets}
                </div>
            </div>

        </GlobalLayout>
    );
}
