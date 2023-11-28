import { io } from 'socket.io-client';
import env from '../../../env.json'
const URL = process.env.NODE_ENV === 'production' ? env.socketServer : 'http://localhost:4589';

export default class BDWSocket {

    constructor(game, args) {
        this.game = game;
        this.extra = args;

        this.init();
    }

    init() {
        this.socket = io(URL, {
            auth: {
                token: env.socketServerToken
            },
            query: {
                game: this.game,
                extra: JSON.stringify(this.extra)
            }
        });
    }

    getSocket() {
        return this.socket;
    }

    emit(key, val) {
        this.socket.emit(key, val);
    }

    on(key, callback) {
        this.socket.on(key, callback);
    }

    off(key, callback) {
        this.socket.off(key, callback);
    }

    removeAllListeners() {
        this.socket.removeAllListeners();
    }


}
