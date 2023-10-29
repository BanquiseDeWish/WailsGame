import { socket } from './socket';
import Player from './player'

let DATA = null;
function setData(data) {
    DATA = data;
}

function endPhase(phaseName) {
    socket.emit('game_phase', {phaseName: phaseName});
}

function askRandomPlayer() {
    socket.emit('random', 'player');
}

function askRandomPlayCount() {
    socket.emit('random', 'play_count');
}

function setupGame(modifyValue, setIsConnected, getTicket, getNewsItem) {
    function flipTicketWithDelay(tickets, amount) {
        setTimeout(() => {
            document.getElementById("ticket_" + tickets[amount]).classList.add('ticket_miss');
            if (amount < tickets.length - 1) {
                flipTicketWithDelay(tickets, amount + 1);
            }
        }, 1000);
    }

    function playTicket(id) {
        socket.emit('play_ticket', id);
    }

    function getPlayer(userId) {
        return DATA.players.find(player => player.id == userId);
    }


    function receiveInfo(data) {
        switch (data.name) {
            case 'play_ticket':
                if (data.action == 'miss') {
                    document.getElementById("ticket_" + data.ticket_id).classList.add('ticket_miss');
                }
                else if (data.action == 'bonus') {
                    document.getElementById("ticket_" + data.ticket_id).classList.add('ticket_bonus', 'animate__flip');
                }
                else if (data.action == 'win') {
                    document.getElementById("ticket_" + data.ticket_id).classList.add('ticket_win', 'animate__flip');
                }
                document.getElementById("ticket_" + data.ticket_id).onClick = null;
                modifyValue('playCount', data.playCount);
                break;

            case 'player_turn':
                DATA.current_player = data.player;
                modifyValue('current_player', data.player);
                modifyValue('avatar', data.player.id);
                break;
            
            case 'play_count':
                DATA.playCount = data.playCount;
                modifyValue('playCount', data.playCount);
                break;

            case 'all_players_info':
                DATA.players = data.players;
                break;

            case 'new_player':
                DATA.players.push(new Player(data.player.id, data.player.name, 0));
                break;

            case 'prio':
                getPlayer(data.player.id).points = data.player.points;
                modifyValue('news_list', getNewsItem(data.player, 'PRIO'));
                break;
 
            case 'changement': // changement
                let data2 = DATA;
                data2.roll_players = data.roll_players;
                setData(data2);
                getPlayer(data.player.id).points = data.player.points;
                modifyValue('news_list', getNewsItem(data.player, 'CHANGEMENT'));
                break;

            case 'vision': // vision
                flipTicketWithDelay(data.tickets, 0);
                let bonusName = 'VISION';
                if(data.tickets.length == 1)
                    bonusName = 'MINI VISION'
                getPlayer(data.player.id).points = data.player.points;
                modifyValue('news_list', getNewsItem(data.player, bonusName));
                break;

            case 'chance':
                DATA.roll_players = data.roll_players;
                getPlayer(data.player.id).points = data.player.points;
                modifyValue('news_list', getNewsItem(data.player, 'CHANCE'));
                break;

            case 'bonus_ticket':
                console.log("Ticket bonus pour " + data.player.name + " ( +3 Points )");
                break;

            case 'end_game':
                console.log("Fin de la partie");
                break;
        }

    }

    function onConnect() {
        setIsConnected(true);
    }

    function onDisconnect() {
        setIsConnected(false);
    }

    function getFirstGameInfo(data) {
        setData(data);
        let tickets = [];
        for (let i = 0; i < DATA.number_of_tickets; i++) {
            if (DATA.tickets.includes(i)) {
                tickets.push(getTicket(i, "ticket", () => playTicket(i)))
            }
            else {
                if (DATA.bonus_tickets.includes(i)) {
                    tickets.push(getTicket(i, "ticket ticket_bonus animate__flip", null))
                }
                else if (i == DATA.winning_ticket) {
                    tickets.push(getTicket(i, "ticket ticket_win animate__flip", null))
                }
                else {
                    tickets.push(getTicket(i, "ticket ticket_miss", null))
                }
            }
        }
        modifyValue('tickets', tickets)
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('first_game_info', getFirstGameInfo);
    socket.on('game_info', receiveInfo);

    socket.emit('need_game_info', null);

}
export {
    setupGame,
    DATA,
    setData,
    endPhase,
    askRandomPlayer,
    askRandomPlayCount
}