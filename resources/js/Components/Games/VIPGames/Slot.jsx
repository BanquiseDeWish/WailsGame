import GreenButton from "@/Components/Buttons/GreenButton";
import { useEffect, useState, useRef } from "react";
import { randomId } from '../../../Game/random';
import SlotJS from '../../../Game/slot';

export default function Slot({ id, type, winner, spin, onClick, data, ...otherProps }) {

    const [slot, setSlot] = useState(new SlotJS(id, type));

    useEffect(() => {
        if(winner != null && winner != undefined) {
            slot.spin(winner, slot);
        }
    }, [winner, spin]);

    useEffect(() => {
        if(data == null || data == undefined || data.length == 0) return;
        if(slot != undefined) {
            slot.setData(data);
        }
    }, [data]);

    return (
        <div className='flex flex-col items-center gap-[24px]' {...otherProps}>
            <div id={id} className='wheel-slot'>
                
            </div>
            <GreenButton className='button_green w-[200px]' onClick={onClick}>Tourner !</GreenButton>
        </div>
    );

}