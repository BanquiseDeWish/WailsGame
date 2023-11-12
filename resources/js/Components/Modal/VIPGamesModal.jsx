import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react'
import { socket } from '../../Game/socket';

import GreenButton from '@/Components/Buttons/GreenButton';
import BlueButton from '@/Components/Buttons/BlueButton';

import BaseModal from "./BaseModal";

export default function VIPGamesModal({ ...otherProps }) {

    const props = usePage().props;
    const isWeils = props.auth.twitch && props.auth.twitch.id == props.weils_id;
    const [values, setValues] = useState({
        winning_ticket: -1,
        bonus_tickets: [],
        number_of_bonus_tickets: 5,
        number_of_tickets: 100,
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        if(key == 'bonus_tickets') {
            setValues(values => ({ ...values, [key]: value.split(',') }));
            return;
        }
        setValues(values => ({ ...values, [key]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        socket.emit('launch', values);
        router.get('/games/vipgames/play');
    }

    function randomStart() {
        values.winning_ticket = Math.floor(Math.random() * values.number_of_tickets);
        let bonus_tickets = [];
        for (let i = 0; i < values.number_of_bonus_tickets; i++) {
            let ticket = Math.floor(Math.random() * values.number_of_tickets);
            while (bonus_tickets.includes(ticket)) {
                ticket = Math.floor(Math.random() * values.number_of_tickets);
            }
            bonus_tickets.push(ticket);
        }
        values.bonus_tickets = bonus_tickets;
        socket.emit('init_game', values);
        router.get('/games/vipgames/play');
    }


    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
        }

        function onDisconnect() {
          setIsConnected(false);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
      }, []);

    return (
        <BaseModal
            buttonChildren={'Lancer une Game'}
        >
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center justify-center w-[560px]'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="number_of_tickets">Nombre Total de Ticket</label>
                            <input id="number_of_tickets" type='number' value={values.number_of_tickets} onChange={handleChange} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="winning_ticket">Ticket Gagnant</label>
                            <input id="winning_ticket" type='number' value={values.winning_ticket} onChange={handleChange} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="number_of_bonus_tickets">Nombre de Ticket Bonus</label>
                            <input id="number_of_bonus_tickets" type='number' value={values.number_of_bonus_tickets} onChange={handleChange} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="bonus_ticket">Tickets Bonus</label>
                            <input id="bonus_tickets" value={values.bonus_tickets} onChange={handleChange} />
                        </div>
                        <div className='flex flex-row gap-8'>
                            <GreenButton type="submit" className="w-fit button_green">Lancer</GreenButton>
                            <BlueButton onClick={randomStart}>Random</BlueButton>
                        </div>
                    </form>
        </BaseModal>
    )
}