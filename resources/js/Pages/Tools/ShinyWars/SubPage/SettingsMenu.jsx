import React, { useState, useEffect } from 'react';

export default function SettingsMenu({socket, ...otherProps}) {

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

    return (
        <>
            <div className='flex flex-row gap-4'>
                <PokemonMap mapUrl={MapTeranium} mapName={"Myrtille"} />
            </div>
            <form action="" className='flex flex-col gap-4'>
                <Input label="Nombre de Joueur" type="number" id="player_number" onChange={handleChange} />
                <Input label="Nombre de Pokémon à attraper" type="number" id="pkm_number" onChange={handleChange} />
                <GreenButton type="submit" className="w-fit button_green">Lancer</GreenButton>
            </form>
        </>
    )

}