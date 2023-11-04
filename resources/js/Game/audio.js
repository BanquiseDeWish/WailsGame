import MISS_1 from '../../assets/sounds/miss_1.mp3';
import MISS_2 from '../../assets/sounds/miss_2.wav';
import MISS_3 from '../../assets/sounds/miss_3.wav';
import MISS_4 from '../../assets/sounds/miss_4.wav';
import MISS_5 from '../../assets/sounds/miss_5.wav';
import MISS_6 from '../../assets/sounds/miss_6.wav';

import MISS_SECRET from '../../assets/sounds/miss_secret.wav';

import BONUS_1 from '../../assets/sounds/bonus_1.mp3';
import BONUS_2 from '../../assets/sounds/bonus_2.mp3';
import BONUS_3 from '../../assets/sounds/bonus_3.mp3';
import BONUS_4 from '../../assets/sounds/bonus_4.mp3';
import BONUS_5 from '../../assets/sounds/bonus_5.mp3';

import SLOT_PIN from '../../assets/sounds/slot_pin.wav';
import SLOT_PIN_2 from '../../assets/sounds/slot_pin_2.wav';
import SPIN_END from '../../assets/sounds/slot_end.wav';


function playSound(url, volume = 0.5, randomUrl = false, loop = false) {
    if(randomUrl) {
        url = url[Math.floor(Math.random() * url.length)];
    }
    let audio = new Audio(url);
    audio.loop = loop;
    audio.volume = volume;
    audio.play();
}

function playMissSound() {
    playSound([MISS_1, MISS_2, MISS_3, MISS_4, MISS_5, MISS_6], 0.2, true);
}

function playMissSoundSecret() {
    playSound(MISS_SECRET, 0.2);
}

function playBonusSound() {
    playSound([BONUS_1, BONUS_2, BONUS_3, BONUS_4, BONUS_5], 0.2, true);
}

function playSlotPinSound() {
    playSound(SLOT_PIN, 0.05);
}

function playSlotEndSound() {
    playSound(SPIN_END, 0.15);
}

export {
    playSound,
    playMissSound,
    playMissSoundSecret,
    playBonusSound,
    playSlotPinSound,
    playSlotEndSound
}