import GreenButton from "@/Components/Buttons/GreenButton";
import { useEffect, useState, useRef } from "react";
import { randomId } from '../../../Game/random';
import SlotJS from '../../../Game/slot';

export default function Slot({ id, winner, onClick, data, ...otherProps }) {

    const [slot, setSlot] = useState(new SlotJS(id));

    useEffect(() => {
        if(winner != null && winner != undefined) {
            console.log(slot.data);
            slot.spin(winner, slot);
        }
    }, [winner]);

    useEffect(() => {
        if(data == null || data == undefined || data.length == 0) return;
        if(slot != undefined) {
            console.log('Av', slot.data);
            slot.setData(data);
            console.log('Ap', slot.data);
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