import { usePage } from '@inertiajs/react';
import GreenButton from "@/Components/Navigation/Buttons/GreenButton";
import React, { useEffect, useState, useRef } from "react";
import GameSound from '@/Game/audio';
import { waitUntil } from "../../../Game/utils";
import UserCard from "@/Components/User/UserCard";

import '@css/components/slot/wheel_slot.css';

class Slot {
    constructor(id, type, link) {
        this.id = id;
        this.current_index = 0;
        this.data = [];
        this.slot = undefined;
        this.type = type;
        this.isSpinning = false;
        this.pinSound = new GameSound('pin');
        this.endSlotSound = new GameSound('slot_end');
        if (this.type === 'with_icon') {
            this.playerAvatarLink = link;
            this.imageCache = new Map();
            this.preloadImages();
        }
        this.items = [];
    }

    getSlotItem(i) {
        switch (this.type) {
            case 'text':
                return this.getNumberSlotItem(i);
            case 'with_icon':
                return this.getIconSlotItem(i);
            case 'card':
                return this.getUserSlotItem(i);
        }
        return false;
    }

    getNumberSlotItem(i) {
        return (
            <div className='slot_item number' data-id={this.data[i].id}>
                <div className='item_content'>
                    {this.data[i].name}
                </div>
            </div>
        );
    }

    preloadImages() {
        for (let i = 0; i < this.data.length; i++) {
            if (this.imageCache.has(this.data[i].id)) continue;
            const image = new Image();
            if (this.data[i].icon != null && this.data[i].icon != undefined)
                image.src = this.data[i].icon;
            else
                image.src = this.playerAvatarLink.replace('{id}', this.data[i].id);
            this.imageCache.set(this.data[i].id, image);
        }
    }

    getIconSlotItem(i) {
        return (
            <div className='slot_item player bg-container border-container border-[1px] rounded-[8px] flex items-center' data-id={this.data[i].id}>
                {this.data[i].name}
            </div>
        );
    }

    getUserSlotItem(i) {
        return (
            <div className='slot_item player' data-id={this.data[i].id}>
                <div className='h-[64px] bg-[var(--slot-item-background)] border-container border-[1px] rounded-[8px] flex items-center'>
                    <UserCard
                        data={{
                            iconSize: 48,
                            username: this.data[i].name,
                            drawSlogan: false,
                            background_style: 'none'
                        }}
                    />
                </div>
            </div>
        );
    }

    init() {
        const slotItems = [];
        for (let i = 0; i < 11; i++) {
            slotItems.push(this.getSlotItem(i % this.data.length));
        }
        return slotItems;
    }

    setData(data) {
        this.data = data;
        if (this.type === 'with_icon')
            this.preloadImages();
    }

    findValueIndexFromCurrentIndex(value) {
        let i = this.current_index >= this.data.length ? 0 : this.current_index;
        let y = 0;
        while (this.data[i].id != value && y < 20) {
            i = (i + 1) % this.data.length;
            y++;
        }
        return i;
    }

    getNextSlotItem() {
        let i = (this.current_index + 1) % this.data.length;
        this.current_index = i;
        return this.getSlotItem(i);
    }

    spin(winner, setSlotItems) {
        let winnerIndex = this.findValueIndexFromCurrentIndex(winner);
        
        // 10 * this.data.length for the spin
        // + 5 for the bottom
        // + winnerIndex for the winner
        // Remove for the current index
        let totalSpin = 10 * this.data.length + winnerIndex + 5 + (this.data.length-this.current_index); // 5 for the bottom

        let i = 0;
        let This = this;
        function runInterval(delay = 5) {
            return setInterval(() => {
                i++;
                const nextItem = This.getNextSlotItem();
                setSlotItems(prevItems => {
                    const newItems = [...prevItems];
                    newItems.shift();
                    newItems.push(nextItem);
                    This.items = [...newItems];
                    return newItems;
                });
                This.pinSound.playSlotPinSound();
                if (i === totalSpin - 100) {
                    clearInterval(interval);
                    interval = runInterval(10);
                }
                else if (i === totalSpin - 50) {
                    clearInterval(interval);
                    interval = runInterval(30);
                }
                else if (i === totalSpin - 20) {
                    clearInterval(interval);
                    interval = runInterval(100);
                }
                else if (i === totalSpin - 8) {
                    clearInterval(interval);
                    interval = runInterval(300);
                }
                else if (i === totalSpin - 3) {
                    clearInterval(interval);
                    interval = runInterval(500);
                }
                if (i >= totalSpin && This.items[6].props['data-id'] == winner) {
                    This.isSpinning = false;
                    This.endSlotSound.playSlotEndSound();
                    setSlotItems(prevItems => {
                        const newItems = [...prevItems];
                        newItems[5] = React.cloneElement(newItems[5], {
                            children: React.cloneElement(newItems[5].props.children),
                            className: `${newItems[5].props.className} item-glow`
                        });
                        return newItems;
                    });
                    clearInterval(interval);
                }
            }, delay);
        }
        This.isSpinning = true;
        let interval = runInterval();
    }
}

export default function SlotComponent({ id, type, winner, spin, onClick, onSpinEnd, link, game_start, data, ...otherProps }) {
    const props = usePage().props;
    const [slotItems, setSlotItems] = useState([]);
    const [slotInstance, setSlotInstance] = useState(null);

    async function onNewData(data) {
        if (slotInstance) {
            await waitUntil(() => !slotInstance.isSpinning);
            slotInstance.setData(data);
            setSlotItems(slotInstance.init());
        }
    }

    async function waitEndSpin() {
        await waitUntil(() => !slotInstance.isSpinning);
        if (onSpinEnd) onSpinEnd();
    }

    useEffect(() => {
        if (winner != null && winner != undefined) {
            slotInstance.spin(winner, setSlotItems);
            waitEndSpin();
        }
    }, [winner, spin]);

    useEffect(() => {
        if (data == null || data == undefined || data.length == 0) return;
        onNewData(data);
    }, [data]);

    useEffect(() => {
        if (game_start) {
            let slot = slotInstance;
            if (slot == undefined) {
                slot = new Slot(id, type, link);
                setSlotInstance(slot);
            }
            slot.setData(data);
            setSlotItems(slot.init());
        }
    }, [game_start]);

    return (
        <div className='flex flex-col items-center gap-[24px]' {...otherProps}>
            <div id={id} className='wheel-slot'>
                {slotItems}
            </div>
            {!otherProps?.noButton && <GreenButton className='button_green w-[200px]' onClick={onClick}>Tourner !</GreenButton>}
        </div>
    );
}