import MISS_1 from '../../assets/sounds/miss_1.mp3';
import MISS_2 from '../../assets/sounds/miss_2.wav';
import MISS_3 from '../../assets/sounds/miss_3.wav';
import MISS_4 from '../../assets/sounds/miss_4.wav';
import MISS_5 from '../../assets/sounds/miss_5.wav';
import MISS_6 from '../../assets/sounds/miss_6.wav';

import MISS_SECRET from '../../assets/sounds/vipgames/miss/miss_secret.ogg';

import BONUS_1 from '../../assets/sounds/bonus_1.mp3';
import BONUS_2 from '../../assets/sounds/bonus_2.mp3';
import BONUS_3 from '../../assets/sounds/bonus_3.mp3';
import BONUS_4 from '../../assets/sounds/bonus_4.mp3';
import BONUS_5 from '../../assets/sounds/bonus_5.mp3';

import SLOT_PIN from '../../assets/sounds/slot_pin.wav';
import SPIN_END from '../../assets/sounds/slot_end.wav';

import WIN from '../../assets/sounds/win.mp3';


import PG_NOTIF from '../../assets/sounds/pg_notif.wav';

export default class GameSound {

    constructor(type) {
        switch(type) {
            case 'miss':
                this.urls = [MISS_1, MISS_2, MISS_3, MISS_4, MISS_5, MISS_6];
                break;
            case 'miss_secret':
                this.urls = [MISS_SECRET];
                break;
            case 'bonus':
                this.urls = [BONUS_1, BONUS_2, BONUS_3, BONUS_4, BONUS_5];
                break;
            case 'pin':
                this.urls = [SLOT_PIN];
                break;
            case 'slot_end':
                this.urls = [SPIN_END];
                break;
            case 'win':
                this.urls = [WIN];
                break;
            case 'pg_notif':
                this.urls = [PG_NOTIF];
                break;
        }

        this.audios = [];
        for(let i = 0; i < this.urls.length; i++) {
            this.audios.push(new Audio(this.urls[i]));
        }
    }

    playSound(volume = 0.5, loop = false) {
        let audio = this.audios[Math.floor(Math.random() * this.audios.length)];
        audio.volume = volume;
        audio.loop = loop;
        if(audio.currentTime != 0) {
            let a = audio.cloneNode();
            a.volume = volume;
            a.play();
        }
        else
            audio.play();
    }

    playMissSound() {
        this.playSound(0.2);
    }

    playMissSoundSecret() {
        this.playSound(0.1);
    }

    playBonusSound() {
        this.playSound(0.2);
    }

    playSlotPinSound() {
        this.playSound(0.05);
    }

    playSlotEndSound() {
        this.playSound(0.15);
    }

    playWinSound() {
        this.playSound(0.2);
    }
}
