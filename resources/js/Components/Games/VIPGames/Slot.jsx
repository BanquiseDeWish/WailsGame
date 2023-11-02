import GreenButton from "@/Components/Buttons/GreenButton";
import { useEffect, useState, useRef } from "react";
import { randomId } from '../../../../js/Game/random';

export default function Slot({ id, winner, onClick, data = [], ...otherProps }) {

    const values = useRef({
        current_index: 0,
        rolls: [],
    });

    function modifyValue(key, value) {
        if(key == 'rolls') {
            values.current.rolls = value;
        }
        else if(key == 'current_index') {
            values.current.current_index = value;
        }
    }

    function findValueIndexFromCurrentIndex(value) {
        let index = 0;
        let i = values.current.current_index;
        let found = false;
        while(!found) {
            if(data[i] == value) {
                found = true;
            }
            else {
                i = (i + 1)%values.current.rolls.length;
                index++;
            }
        }
        return index;
    }

    function removeFirstSlotItem() {
        let a = [...values.current.rolls];
        a.shift();
        modifyValue('rolls', a);
    }

    function addSlotItem() {
        let a = [...values.current.rolls];
        a.push(getNextSlotItem());
        modifyValue('rolls', a);
    }

    function getNextSlotItem() {
        let i = (values.current.current_index + 1)%data.length;
        modifyValue('current_index', i);
        return (<div key={randomId()} className='slot_item number'>{data[i]}</div>);
    }

    function test() {
        let i = 0;
        
        function runInterval(delay = 5) {
            return setInterval(() => {
                console.log(i++);
                if (i === 100) {
                    clearInterval(interval);
                    interval = runInterval(10);
                }
                if (i === 150) {
                    clearInterval(interval);
                    interval = runInterval(30);
                }
                if(i === 180) {
                    clearInterval(interval);
                    interval = runInterval(100);
                }
                if(i === 192) {
                    clearInterval(interval);
                    interval = runInterval(300);
                }
                if(i === 197) {
                    clearInterval(interval);
                    interval = runInterval(500);
                }
                if (i === 200) {
                    clearInterval(interval);
                }
            }, delay);
        }
        
        let interval = runInterval();
    }

    function spin(index) {
        // Index is the index of the winner in the array 'data'
        // The winner slot item need to be at index 6 (the middle of the wheel) of the array 'rolls'
        // The slots need to spin around all the array 'rolls' 5 times before reach the winner slot item
        // The 'rolls' array need to be 11 items long (5 items before the winner slot item, the winner slot item, 5 items after the winner slot item)
        // remove the first item of the array 'rolls' and add a new item at the end of the array 'rolls' until the winner slot item is at index 6
        // use removeFirstSlotItem() and addSlotItem() functions

        let spinsNeeded = 5;

        let total = spinsNeeded * data.length;
        let spins = 0;

        let interval = setInterval(() => {
            if(spins == total) {
                clearInterval(interval);
            }
            else {
                removeFirstSlotItem();
                addSlotItem();
                spins++;
            }

        }, 100);
    }

    useEffect(() => {
        if(winner > 0 && winner != null && winner != undefined) {
            let index = findValueIndexFromCurrentIndex(winner);
            spin(index);
        }
    }, [winner]);

    useEffect(() => {
        if(data == null || data == undefined || data.length == 0) return;
        let a = [getNextSlotItem()];
        for(let i = 0; i < 11; i++) {
            a.push(getNextSlotItem());
        }
        modifyValue('rolls', a);
    }, [data]);

    return (
        <div className='flex flex-col items-center gap-[24px]' {...otherProps}>
            <div id={id} className='wheel-slot'>
                {values.current.rolls}
            </div>
            <GreenButton className='button_green w-[200px]' onClick={onClick}>Tourner !</GreenButton>
            <button onClick={() => {test()}}>LANCER BOB</button>
        </div>
    );

}