import { io } from 'socket.io-client';
import env from '../../../env.json'
const URL = process.env.NODE_ENV === 'production' ? env.socketServer : 'http://localhost:4589';

const socket = io(URL, {
    query: {
        game: 'vipgames'
    }
});

export { socket }
