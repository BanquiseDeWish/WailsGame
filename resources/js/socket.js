import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://weilsgames.test:4000';
export const socket = io(URL);