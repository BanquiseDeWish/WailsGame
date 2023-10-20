import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://185.157.245.94:4589';

const socket = io(URL, {
    query: {
        game: 'vipgames'
    }
});

export { socket }