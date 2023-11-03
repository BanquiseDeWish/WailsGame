import { usePage } from '@inertiajs/react';
import GreenButton from "@/Components/Buttons/GreenButton";
import { useEffect, useState, useRef } from "react";
import SlotJS from '../../../Game/slot';

export default function Slot({ id, type, winner, spin, game, onClick, data, ...otherProps }) {

    const props = usePage().props;
    const [values, setValues] = useState({
        slot: undefined,
    });

    function modifyValue(key, value) {
        setValues(values => ({ ...values, [key]: value }));
    }

    useEffect(() => {
        if(winner != null && winner != undefined) {
            values.slot.spin(winner, values.slot);
        }
    }, [winner, spin]);

    useEffect(() => {
        if(data == null || data == undefined || data.length == 0) return;
        if(values.slot != undefined) {
            values.slot.setData(data);
        }
    }, [data]);

    useEffect(() => {
        if(values.slot == undefined) return;
        values.slot.game = game;
    }, [game]);

    useEffect(() => {
        modifyValue('slot', new SlotJS(id, type, game, props.ziggy.url + '/api/user/{id}/icon'));
    }, []);

    return (
        <div className='flex flex-col items-center gap-[24px]' {...otherProps}>
            <div id={id} className='wheel-slot'>
                
            </div>
            <GreenButton className='button_green w-[200px]' onClick={onClick}>Tourner !</GreenButton>
        </div>
    );

}