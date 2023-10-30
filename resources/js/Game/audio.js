import MISS_1 from '../../assets/sounds/miss_1.mp3';
import MISS_2 from '../../assets/sounds/miss_2.wav';
import MISS_3 from '../../assets/sounds/miss_3.wav';
import MISS_4 from '../../assets/sounds/miss_4.wav';
import MISS_5 from '../../assets/sounds/miss_5.wav';

import BONUS_1 from '../../assets/sounds/bonus_1.mp3';
import BONUS_2 from '../../assets/sounds/bonus_2.mp3';
import BONUS_3 from '../../assets/sounds/bonus_3.mp3';
import BONUS_4 from '../../assets/sounds/bonus_4.mp3';
import BONUS_5 from '../../assets/sounds/bonus_5.mp3';


function playSound(url, randomUrl = false, volume = 0.5, loop = false) {
    if(randomUrl) {
        url = url[Math.floor(Math.random() * url.length)];
    }
    let audio = new Audio(url);
    audio.loop = loop;
    audio.volume = volume;
    audio.play();
}

function playMissSound() {
    playSound([MISS_1, MISS_2, MISS_3, MISS_4, MISS_5], true, 0.3);
}

function playBonusSound() {
    playSound([BONUS_1, BONUS_2, BONUS_3, BONUS_4, BONUS_5], true, 0.3);
}


export {
    playSound,
    playMissSound,
    playBonusSound
}