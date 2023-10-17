import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react'

import GlobalLayout from '@/Layouts/GlobalLayout';

export default function VipGamesIndex() {

    const props = usePage().props;
    const isWeils = props.auth.twitch.id == props.weils_id;
    const [values, setValues] = useState({
        winning_ticket: -1,
        bonus_tickets: [],
        number_of_bonus_tickets: 2,
        number_of_tickets: 100,
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({ ...values, [key]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.get('/games/vipgames/play', values);
    }

    function randomStart() {

    }

    return (
        <GlobalLayout>
            <Head title="VIP Games" />

            {isWeils ? (
                <>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <span className='flex flex-col gap-1'>
                            <label htmlFor="number_of_tickets">Nombre Total de Ticket</label>
                            <input id="number_of_tickets" type='number' value={values.bonus_tickets} onChange={handleChange} />
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
                            <input id="bonus_ticket" value={values.bonus_tickets} onChange={handleChange} />
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
