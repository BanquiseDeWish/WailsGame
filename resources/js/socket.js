import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

let DATA = null;
function setData(data) {
    DATA = data;
}


const socket = io(URL);

export { socket, DATA, setData }