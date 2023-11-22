import { usePage } from '@inertiajs/react';
import GreenButton from "@/Components/Navigation/Buttons/GreenButton";
import { useEffect, useState, useRef } from "react";
import SlotJS from '../../../Game/slot';
import { waitUntil } from "../../../Game/utils";

export default function Slot({ id, type, winner, spin, game, onClick, game_start, data, modifyValueParent, ...otherProps }) {

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
        if(type == 'player') {
            modifyValueParent('current_player', game.getPlayer(winner));
            modifyValueParent('avatar', winner);
        }
        else
            modifyValueParent('playCount', winner);
    }

    useEffect(() => {
        if(game_start) {
            values.slot.init();
        }
    }, [game_start]);

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