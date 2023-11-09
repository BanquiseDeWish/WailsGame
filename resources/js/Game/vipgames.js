import { socket } from './socket';
import Player from './player'

import GameSound from './audio';


export default class VIPGames {
    constructor(modifyValue, getTicket, getNewsItem, getUserCard) {
        this.modifyValue = modifyValue;
        this.getTicket = getTicket;
        this.getNewsItem = getNewsItem;
        this.getUserCard = getUserCard;
        this.DATA = {};
        this.setupGame();
        this.missSound = new GameSound('miss');
        this.missSecret = new GameSound('miss_secret');
        this.bonusSound = new GameSound('bonus');
    }

    setData(data) {
        this.DATA = data;
    }

    endPhase(phaseName) {
        if(phaseName == 'waiting') {
            document.getElementById('wheels').classList.remove('my-hidden');
            this.modifyValue('game_start', true);
        }
        socket.emit('game_phase', {phaseName: phaseName});
    }

    askRandomPlayer() {
        socket.emit('random', 'player');
    }

    askRandomPlayCount() {
        socket.emit('random', 'play_count');
    }

    playTicket(id) {
        socket.emit('play_ticket', id);
    }

    getPlayer(userId) {
        return this.DATA.players.find(player => player.id == userId);
    }    

    getFirstGameInfo(data) {
        if(data == null || data == undefined)
            return;
        this.setData(data);
        let tickets = [];
        for (let i = 0; i < this.DATA.number_of_tickets; i++) {
            if (this.DATA.tickets.includes(i)) {
                tickets.push(this.getTicket(i, "ticket", () => this.playTicket(i)))
            }
            else {
                if (this.DATA.bonus_tickets.includes(i)) {
                    tickets.push(this.getTicket(i, "ticket ticket_bonus animate__flip", null))
                }
                else if (i == this.DATA.winning_ticket) {
                    tickets.push(this.getTicket(i, "ticket ticket_win animate__flip", null))
                }
                else {
                    tickets.push(this.getTicket(i, "ticket ticket_miss", null))
                }
            }
        }
        this.modifyValue('tickets', tickets);
        this.modifyValue('playCount', this.DATA.playCount);
        this.modifyValue('current_player', this.DATA.current_player ? this.DATA.current_player : {id: -1, name: '?????????'});
        this.modifyValue('avatar', this.DATA.current_player ? this.DATA.current_player.id : 0);
        this.modifyValue('roll_players', this.DATA.roll_players);
        this.modifyValue('roll_playCount', this.DATA.roll_playCount);
        this.modifyValue('game_start', this.DATA.phaseWaitingEnd);
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
                }
                document.getElementById("ticket_" + data.ticket_id).onClick = null;
                this.modifyValue('playCount', data.playCount);
                break;

            case 'player_turn':
                this.DATA.current_player = data.player;
                this.modifyValue('current_player', {id: -1, name: '?????????'});
                this.modifyValue('avatar', data.player.id);
                this.modifyValue('choosen_player', data.player.id);
                this.modifyValue('spin_1', 0);
                break;
            
            case 'play_count':
                this.DATA.playCount = data.playCount;
                this.modifyValue('playCount', '?');
                this.modifyValue('choosen_playCount', data.playCount);
                this.modifyValue('spin_2', 0);
                break;

            case 'all_players_info':
                this.DATA.players = data.players;
                this.modifyValue('roll_players', data.roll_players);
                this.modifyValue('players', data.players);
                break;

            case 'new_player':
                let player = new Player(data.player.id, data.player.name, 0)
                this.DATA.players.push(player);
                if(!this.DATA.phaseWaitingEnd) {
                    this.modifyValue('waiting_users', this.getUserCard(player))
                }
                this.modifyValue('roll_players', data.roll_players);
                break;

            case 'prio':
                this.getPlayer(data.player.id).points = data.player.points;
                this.modifyValue('news_list', this.getNewsItem(data.player, 'PRIO'));
                break;
 
            case 'changement': // changement
                this.getPlayer(data.player.id).points = data.player.points;
                this.modifyValue('roll_players', data.roll_players);
                this.modifyValue('news_list', this.getNewsItem(data.player, 'CHANGEMENT'));
                break;

            case 'vision': // vision
                this.flipTicketWithDelay(data.tickets, 0);
                let bonusName = 'VISION';
                if(data.tickets.length == 1)
                    bonusName = 'MINI VISION'
                    this.getPlayer(data.player.id).points = data.player.points;
                    this.modifyValue('news_list', this.getNewsItem(data.player, bonusName));
                break;

            case 'chance':
                this.getPlayer(data.player.id).points = data.player.points;
                this.modifyValue('roll_players', data.roll_players);
                this.modifyValue('news_list', this.getNewsItem(data.player, 'CHANCE'));
                break;

            case 'bonus_ticket':
                console.log("Ticket bonus pour " + data.player.name + " ( +3 Points )");
                this.getPlayer(data.player.id).points = data.player.points;
                break;

            case 'end_game':
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
        socket.removeAllListeners();
        socket.on('connect', () => {this.onConnect()});
        socket.on('disconnect', () => {this.onDisconnect()});
        socket.on('first_game_info', (e) => {this.getFirstGameInfo(e)});
        socket.on('game_info', (e) => {this.receiveInfo(e)});
    
        socket.emit('need_game_info', null);
    }
}