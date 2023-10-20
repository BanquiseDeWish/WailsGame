import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react'
import { socket, DATA, setData } from '../../socket';

import GlobalLayout from '@/Layouts/GlobalLayout';

export default function VipGamesIndex() {

    const props = usePage().props;
    const isWeils = props.auth.twitch && props.auth.twitch.id == props.weils_id;
    const [values, setValues] = useState({
        winning_ticket: -1,
        bonus_tickets: [],
        number_of_bonus_tickets: 2,
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
        setData(values);
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
        setData(values);
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
        <GlobalLayout>
            <Head title="VIP Games" />

            {isWeils ? (
                <>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <span className='flex flex-col gap-1'>
                            <label htmlFor="number_of_tickets">Nombre Total de Ticket</label>
                            <input id="number_of_tickets" type='number' value={values.number_of_tickets} onChange={handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <label htmlFor="winning_ticket">Ticket Gagnant</label>
                            <input id="winning_ticket" type='number' value={values.winning_ticket} onChange={handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <label htmlFor="number_of_bonus_tickets">Nombre de Ticket Bonus</label>
                            <input id="number_of_bonus_tickets" type='number' value={values.number_of_bonus_tickets} onChange={handleChange} />
                        </span>
                        <span className='flex flex-col gap-1'>
                            <label htmlFor="bonus_ticket">Tickets Bonus</label>
                            <input id="bonus_tickets" value={values.bonus_tickets} onChange={handleChange} />
                        </span>
                        <button type="submit">Submit</button>
                    </form>
                    <button onClick={randomStart}>Random</button>
                </>
            ) : (
                <></>
            )}


        </GlobalLayout>
    );
}
