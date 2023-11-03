export default class Slot {

    constructor(id, type) {
        this.id = id;
        this.current_index = 0;
        this.data = [];
        this.slot = undefined;
        this.type = type;
        this.playerAvatarLink = '';
    }

    setPlayerAvatarLink(link) {
        this.playerAvatarLink = link;
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
        div.classList.add('slot_item');
        div.classList.add('number');
        div.innerHTML = this.data[i];
        return div;
    }

    getPlayerSlotItem(i) {
        let div = document.createElement('div');
        div.classList.add('slot_item');
        div.classList.add('player');
        let img = document.createElement('img');
        img.src = this.playerAvatarLink.replace('[id]', i);
        div.innerHTML = this.data[i];
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
        this.init();
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
                    clearInterval(interval);
                }
            }, delay);
        }
        let interval = runInterval();
    }
}