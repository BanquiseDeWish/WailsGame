import GreenButton from '@/Components/Navigation/Buttons/GreenButton';
import { useState } from 'react';

import { InputRange } from '@/Components/Forms/InputRange';

export default function IndexMenu({ socket, globalValues, ...otherProps }) {

    const [values, setValues] = useState({
        player_amount: 2
    });

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;

        setValues((prevState) => ({ ...prevState, [key]: value }));
    }

    const createGame = () => {
        socket?.emit('create_party', values);
    }

    return (
        <>
            <div className='flex flex-col gap-4 container_background p-8 rounded-lg items-center justify-center w-[560px]'>
                <InputRange
                    label="Nombre de Joueur"
                    value={values.player_amount}
                    onChange={handleChange}
                    min={2}
                    max={4}
                    id="player_amount"
                />
                <GreenButton onClick={createGame} className={"button button_green outline-none"}>
                    Créer une Game
                </GreenButton>
            </div>
        </>
    )
}