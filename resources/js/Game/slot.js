import { playSlotPinSound, playSlotEndSound } from './audio';

export default class Slot {

    constructor(id, type, game, link) {
        this.id = id;
        this.current_index = 0;
        this.data = [];
        this.slot = undefined;
        this.type = type;
        this.game = game;
        this.playerAvatarLink = link;
        this.isSpinning = false;
    }

    getSlotItem(i) {
        switch(this.type) {
            case 'number':
                return this.getNumberSlotItem(i);
            case 'player':
                return this.getPlayerSlotItem(i);
        }
        return false;
    }

    getNumberSlotItem(i) {
        let div = document.createElement('div');
        div.classList.add('slot_item', 'number');
        
        let contentDiv = document.createElement('div');
        contentDiv.classList.add('item_content');
        contentDiv.innerHTML = this.data[i];

        div.appendChild(contentDiv);
        return div;
    }

    getPlayerSlotItem(i) {
        let div = document.createElement('div');
        div.classList.add('slot_item', 'player');

        let contentDiv = document.createElement('div');
        contentDiv.classList.add('item_content');

        let img = document.createElement('img');
        img.src = this.playerAvatarLink.replace('{id}', i);
        contentDiv.appendChild(img);

        let username = document.createElement('div');
        username.classList.add('username');
        let player = this.game.getPlayer(this.data[i]);
        if(player)
            username.innerHTML = this.game.getPlayer(this.data[i]).name;
        contentDiv.appendChild(username);
        
        div.appendChild(contentDiv);

        return div;
    }

    init() {
        this.slot = document.getElementById(this.id);
        this.slot.innerHTML = '';
        for(let i = 0; i < 11; i++) {
            this.slot.appendChild(this.getSlotItem(i%this.data.length));
        }
    }

    setData(data) {
        this.data = data;
    }

    findValueIndexFromCurrentIndex(value) {
        let i = this.current_index;
        let y = 0;
        while (this.data[i] != value && y < 20) {
            i = (i + 1)%this.data.length;
            y++;
        }
        return i;
    }

    removeFirstSlotItem() {
        //this.slot.firstChild.classList.add('slot_item_hide');
        //setTimeout(() => {
            this.slot.removeChild(this.slot.firstChild);
        //}, 200);
    }

    addSlotItem() {
        this.slot.appendChild(this.getNextSlotItem());
    }

    getNextSlotItem() {
        let i = (this.current_index + 1)%this.data.length;
        this.current_index = i;
        return this.getSlotItem(i);
    }

    spin(winner) {
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
                This.removeFirstSlotItem();
                playSlotPinSound();
                This.addSlotItem();
                if (i === totalSpin-100) {
                    clearInterval(interval);
                    interval = runInterval(10);
                }
                if (i === totalSpin-50) {
                    clearInterval(interval);
                    interval = runInterval(30);
                }
                if(i === totalSpin-20) {
                    clearInterval(interval);
                    interval = runInterval(100);
                }
                if(i === totalSpin-8) {
                    clearInterval(interval);
                    interval = runInterval(300);
                }
                if(i === totalSpin-3) {
                    clearInterval(interval);
                    interval = runInterval(500);
                }
                if (i >= totalSpin) {
                    This.isSpinning = false;
                    playSlotEndSound();
                    This.slot.children[5].classList.add('item-glow');
                    clearInterval(interval);
                }
            }, delay);
        }
        This.isSpinning = true;
        let interval = runInterval();
    }
}