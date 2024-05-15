import { io } from 'socket.io-client';
import env from '../../../env.json'
const URL = process.env.NODE_ENV === 'production' ? env.socketServer : 'http://localhost:4589';

export default class BDWSocket {

    constructor(game, extra, args = {}, authData = {}) {
        this.game = game;
        this.extra = extra;
        this.args = args;
        this.authData = authData;

        this.init();

        const observeUrlChange = () => {
            let oldHref = document.location.href;
            const body = document.querySelector("body");
            const observer = new MutationObserver(mutations => {
              if (oldHref !== document.location.href) {
                oldHref = document.location.href;
                if(this.socket !== null || this.socket !== undefined) {
                    this.socket.disconnect();
                }
              }
            });
            observer.observe(body, { childList: true, subtree: true });
        };

        observeUrlChange();
    }

    init() {
        this.socket = io(URL, {
            auth: {
                token: env.socketServerToken,
                ...this.authData
            },
            perMessageDeflate: {threshold: 0},
            query: {
                game: this.game,
                extra: JSON.stringify(this.extra),
                ...this.args
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
