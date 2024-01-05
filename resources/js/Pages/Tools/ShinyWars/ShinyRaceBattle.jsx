import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

import GreenButton from '@/Components/Navigation/Buttons/GreenButton';

import Input from '@/Components/Forms/Input';
import PokemonMap from './PokemonMap';

import MapTeranium from '../../../../assets/games/shiny_wars/maps/teranium.png';


import MainLayout from '@/Layouts/MainLayout';

export default function ShinyWars() {

    const props = usePage().props;

    const [values, setValues] = useState({
        player_number: 0
    });

    const handleChange = (event) => {
        const allowed_names = [
            'player_number'
        ];
        if (allowed_names.includes(event.target.id)) {
            setValues(values => ({
                ...values,
                [event.target.id]: event.target.value
            }));
        }
    }

    useEffect(() => {
        socket = new BDWSocket("shinywars", { isWeils: isWeils !== null ? isWeils : false})

        if (socket !== null) {
            function onConnect() {}

            function onDisconnect() {}

            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);

            return () => {
                socket.off('connect', onConnect);
                socket.off('disconnect', onDisconnect);
            }
        }
    }, []);

    return (
        <>
            <MainLayout showOverflow={true}>
                <Head title="Shiny Race Battle" />
                <div className='flex flex-row gap-4'>
                    <PokemonMap mapUrl={MapTeranium} mapName={"Myrtille"} />
                </div>
                <form action="" className='flex flex-col gap-4'>
                    <Input label="Nombre de Joueur" type="number" id="player_number" onChange={handleChange} />
                    <Input label="Nombre de Pokémon à attraper" type="number" id="pkm_number" onChange={handleChange} />
                    <GreenButton type="submit" className="w-fit button_green">Lancer</GreenButton>
                </form>
            </MainLayout>
            <style>{`

            `}
            </style>
        </>
    );
}