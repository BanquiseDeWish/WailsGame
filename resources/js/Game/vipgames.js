import BDWSocket from './socket';
import Player from './player'

import GameSound from './audio';


export default class VIPGames {
    constructor(modifyValue, getTicket, getNewsItem, getUserCard) {
        this.socket = new BDWSocket('vipgames');
        this.modifyValue = modifyValue;
        this.getTicket = getTicket;
        this.getNewsItem = getNewsItem;
        this.getUserCard = getUserCard;
        this.setupGame();
        this.missSound = new GameSound('miss');
        this.missSecret = new GameSound('miss_secret');
        this.bonusSound = new GameSound('bonus');
        this.winSound = new GameSound('win');
        this.gameStart = false;
        this.player_list = [];
    }

    getPlayer(userId) {
        let player = this.player_list.find(player => player.id == userId);
        if(player)
            return player;
        else
            return {id: -1, name: '?????????'};
    }

    removePlayer(userId) {
        this.socket.emit('remove_player', userId);
    }

    endPhase(phaseName) {
        if(phaseName == 'waiting') {
            document.getElementById('user-list-container').classList.add('my-hidden');
            this.modifyValue('game_start', true);
            this.gameStart = true;
        }
        this.socket.emit('game_phase', {phaseName: phaseName});
    }

    askRandomPlayer() {
        this.socket.emit('random', 'player');
    }

    askRandomPlayCount() {
        this.socket.emit('random', 'play_count');
    }

    playTicket(id) {
        this.socket.emit('play_ticket', id);
    }

    getFirstGameInfo(data) {
        if(data == null || data == undefined)
            return;
        let tickets = [];
        for (let i = 0; i < data.number_of_tickets; i++) {
            if (data.tickets.includes(i)) {
                tickets.push(this.getTicket(i, "ticket", () => this.playTicket(i)))
            }
            else {
                if (data.bonus_tickets.includes(i)) {
                    tickets.push(this.getTicket(i, "ticket ticket_bonus animate__flip", null))
                }
                else if (i == data.winning_ticket) {
                    tickets.push(this.getTicket(i, "ticket ticket_win animate__flip", null))
                }
                else {
                    tickets.push(this.getTicket(i, "ticket ticket_miss", null))
                }
            }
        }
        this.modifyValue('tickets', tickets);
        this.modifyValue('playCount', data.playCount);
        this.modifyValue('current_player', data.current_player ? data.current_player : {id: -1, name: '?????????'});
        this.modifyValue('avatar', data.current_player ? data.current_player.id : 0);
        this.modifyValue('roll_players', data.roll_players);
        this.modifyValue('roll_playCount', data.roll_playCount);
        this.modifyValue('game_start', data.phaseWaitingEnd);
        this.modifyValue('players', data.players);
        this.player_list = [...data.players];
    }

    flipTicketWithDelay(tickets, amount) {
        setTimeout(() => {
            document.getElementById("ticket_" + tickets[amount]).classList.add('ticket_miss');
            if (amount < tickets.length - 1) {
                this.flipTicketWithDelay(tickets, amount + 1);
            }
        }, 1000);
    }

    receiveInfo(data) {
        switch (data.name) {
            case 'play_ticket':
                if (data.action == 'miss') {
                    document.getElementById("ticket_" + data.ticket_id).classList.add('ticket_miss');
                    if(Math.random() < 0.001)
                        this.missSecret.playMissSoundSecret();
                    else
                        this.missSound.playMissSound();
                }
                else if (data.action == 'bonus') {
                    document.getElementById("ticket_" + data.ticket_id).classList.add('ticket_bonus', 'animate__flip');
                    this.bonusSound.playBonusSound();
                }
                else if (data.action == 'win') {
                    document.getElementById("ticket_" + data.ticket_id).classList.add('ticket_win', 'animate__flip');
                    this.winSound.playWinSound();
                }
                document.getElementById("ticket_" + data.ticket_id).onClick = null;
                this.modifyValue('playCount', data.playCount);
                this.modifyValue('available_tickets', data.available_tickets);
                break;

            case 'player_turn':
                if(!data.prio) {
                    document.getElementById('current_player_prio').classList.add('my-hidden');
                    this.modifyValue('current_player', {id: -1, name: '?????????'});
                    this.modifyValue('choosen_player', data.player.id);
                    this.modifyValue('spin_1', 0);
                    this.modifyValue('round', data.round);
                }
                else {
                    document.getElementById('current_player_prio').classList.remove('my-hidden');
                    this.modifyValue('current_player', data.player);
                    this.modifyValue('playCount', data.playCount);
                }
                break;

            case 'play_count':
                this.modifyValue('playCount', '?');
                this.modifyValue('choosen_playCount', data.playCount);
                this.modifyValue('spin_2', 0);
                break;

            case 'all_players_info':
                this.modifyValue('roll_players', data.roll_players);
                this.modifyValue('players', data.players);
                break;

            case 'new_player':
                if(!this.gameStart) {
                    this.modifyValue('waiting_users', this.getUserCard(data.player))
                }
                this.modifyValue('roll_players', data.roll_players);
                this.modifyValue('player_point', data.player);
                this.player_list.push(data.player);
                break;

            case 'remove_player':
                if(!this.gameStart) return;
                this.modifyValue('roll_players', data.roll_players);
                this.modifyValue('players', data.players);
                this.modifyValue('remove_player', data.player.id);
                break;

            case 'prio':
                if(!this.gameStart) return;
                this.modifyValue('news_list', this.getNewsItem(data.player, 'PRIO'));
                this.modifyValue('player_point', data.player);
                break;

            case 'changement': // changement
                if(!this.gameStart) return;
                this.modifyValue('roll_players', data.roll_players);
                this.modifyValue('news_list', this.getNewsItem(data.player, 'CHANGEMENT'));
                this.modifyValue('player_point', data.player);
                break;

            case 'vision': // vision
                if(!this.gameStart) return;
                this.flipTicketWithDelay(data.tickets, 0);
                let bonusName = 'VISION';
                if(data.tickets.length == 1)
                    bonusName = 'MINI VISION';
                let ticks = [...data.tickets]
                for (let i = 0; i < ticks.length; i++) {
                    ticks[i] = ticks[i] + 1;
                }
                this.modifyValue('news_list', this.getNewsItem(data.player, bonusName + ': ' + ticks.join(',')));
                this.modifyValue('player_point', data.player);
                this.modifyValue('available_tickets', data.available_tickets);
                break;

            case 'chance':
                if(!this.gameStart) return;
                this.modifyValue('roll_players', data.roll_players);
                this.modifyValue('news_list', this.getNewsItem(data.player, 'CHANCE'));
                this.modifyValue('player_point', data.player);
                break;

            case 'bonus_ticket':
                if(!this.gameStart) return;
                this.modifyValue('player_point', data.player);
                break;

            case 'end_game':
                if(!this.gameStart) return;
                this.modifyValue('game_end', true);
                console.log("Fin de la partie");
                console.log(data.stats);
                break;
        }

    }

    onConnect() {
        this.modifyValue('isConnected', true);
    }

    onDisconnect() {
        this.modifyValue('isConnected', false);
    }

    setupGame() {
        this.socket.removeAllListeners();
        this.socket.on('connect', () => {this.onConnect()});
        this.socket.on('disconnect', () => {this.onDisconnect()});
        this.socket.on('first_game_info', (e) => {this.getFirstGameInfo(e)});
        this.socket.on('game_info', (e) => {this.receiveInfo(e)});

        this.socket.emit('need_game_info', null);
    }
}
