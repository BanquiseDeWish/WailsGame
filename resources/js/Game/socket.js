import { io } from 'socket.io-client';
import env from '../../../env.json'
const URL = process.env.NODE_ENV === 'production' ? env.socketServer : 'http://localhost:4589';

export default class BDWSocket {

    constructor(game, extra, args = {}, authData = {}, opts = {}, custom = {}) {
        this.game = game;
        this.extra = extra;
        this.args = args;
        this.authData = authData;
        this.custom = custom;
        this.init(opts);

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

    init({ ...props }) {
        const opts = {
            auth: {
                token: !this.custom?.token ? env.socketServerToken : this.custom?.token,
                ...this.authData
            },
            perMessageDeflate: {threshold: 0},
            query: {
                game: this.game,
                extra: JSON.stringify(this.extra),
                ...this.args
            },
            ...props
        };
        this.socket = io(!this.custom?.url ? URL : this.custom.url, opts);
    }

    reconnect() {
        return this.socket.connect();
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
