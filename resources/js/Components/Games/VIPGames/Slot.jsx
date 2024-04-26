import { usePage } from '@inertiajs/react';
import GreenButton from "@/Components/Navigation/Buttons/GreenButton";
import YellowButton from '@/Components/Navigation/Buttons/YellowButton';
import { useEffect, useState, useRef } from "react";
import SlotJS from '../../../Game/slot';
import { waitUntil } from "../../../Game/utils";

import '@css/components/slot/wheel_slot.css';

export default function Slot({ id, type, winner, spin, onClick, onSpinEnd, link, game_start, data, ...otherProps }) {

    const props = usePage().props;
    const [values, setValues] = useState({
        slot: undefined,
    });

    function modifyValue(key, value) {
        setValues(values => ({ ...values, [key]: value }));
    }

    async function onNewData(data) {
        if(values.slot != undefined) {
            await waitUntil(() => !values.slot.isSpinning);
            values.slot.setData(data);
        }
    }

    async function waitEndSpin() {
        await waitUntil(() => !values.slot.isSpinning);
        if(onSpinEnd != undefined)
            onSpinEnd();
    }

    useEffect(() => {
        if(winner != null && winner != undefined) {
            values.slot.spin(winner, values.slot);
            waitEndSpin();
        }
    }, [winner, spin]);

    useEffect(() => {
        if(data == null || data == undefined || data.length == 0) return;
        onNewData(data);
    }, [data]);

    useEffect(() => {
        if(game_start) {
            let slot = values.slot;
            if(slot == undefined)
                slot = new SlotJS(id, type, link);
            slot.setData(data);
            slot.init();
            modifyValue('slot', slot);
        }
    }, [game_start]);

    return (
        <div className='flex flex-col items-center gap-[24px]' {...otherProps}>
            <div id={id} className='wheel-slot'>
                
            </div>
            {!otherProps?.noButton && <GreenButton className='button_green w-[200px]' onClick={onClick}>Tourner !</GreenButton>}
        </div>
    );

}