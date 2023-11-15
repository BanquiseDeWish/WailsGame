import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react'
import { socket } from '../../Game/socket';

import GreenButton from '@/Components/Buttons/GreenButton';
import BlueButton from '@/Components/Buttons/BlueButton';
import YellowButton from '@/Components/Buttons/YellowButton';

import BaseModal from "./BaseModal";

export default class VIPGamesModal extends BaseModal {

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            winning_ticket: -1,
            bonus_tickets: [],
            number_of_bonus_tickets: 5,
            number_of_tickets: 100,
            isConnected: socket.connected,
        };
    }

    handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;

        if(key == 'bonus_tickets') {
            this.setState((prevState) => ({...prevState.values, [key]: value.split(',')}));
            return;
        }
        this.setState((prevState) => ({...prevState.values, [key]: value}));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('launch', this.state.values);
        router.get('/games/vipgames/play');
    }

    randomStart = () => {
        const { values } = this.state;
        values.winning_ticket = Math.floor(Math.random() * values.number_of_tickets);
        let bonus_tickets = [];

        for (let i = 0; i < values.number_of_bonus_tickets; i++) {
            let ticket = Math.floor(Math.random() * values.number_of_tickets);

            while (bonus_tickets.includes(ticket)) {
                ticket = Math.floor(Math.random() * values.number_of_tickets);
            }

            bonus_tickets.push(ticket);
        }

        this.setState((prevState) => ({...prevState, bonus_tickets: bonus_tickets}));
        socket.emit('init_game', values);
        router.get('/games/vipgames/play');
    }

    componentDidMount() {
        socket.on('connect', this.onConnect);
        socket.on('disconnect', this.onDisconnect);
    }

    componentWillUnmount() {
        socket.off('connect', this.onConnect);
        socket.off('disconnect', this.onDisconnect);
    }

    onConnect = () => {
        this.setState((prevState) => ({ ...prevState, isConnected: true }));
    }

    onDisconnect = () => {
        this.setState((prevState) => ({ ...prevState, isConnected: false }));
    }

    getButton() {
        return (<div className='simple_button button_yellow cursor-pointer'>Lancer une Game</div>);
    }

    render() {
    return super.render(
                    <form onSubmit={this.handleSubmit} className='flex flex-col gap-4 items-center justify-center w-[560px]'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="number_of_tickets">Nombre Total de Ticket</label>
                            <input id="number_of_tickets" type='number' value={this.state.number_of_tickets} onChange={this.handleChange} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="winning_ticket">Ticket Gagnant</label>
                            <input id="winning_ticket" type='number' value={this.state.winning_ticket} onChange={this.handleChange} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="number_of_bonus_tickets">Nombre de Ticket Bonus</label>
                            <input id="number_of_bonus_tickets" type='number' value={this.state.number_of_bonus_tickets} onChange={this.handleChange} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="bonus_ticket">Tickets Bonus</label>
                            <input id="bonus_tickets" value={this.state.bonus_tickets} onChange={this.handleChange} />
                        </div>
                        <div className='flex flex-row gap-8'>
                            <GreenButton type="submit" className="w-fit button_green">Lancer</GreenButton>
                            <BlueButton onClick={this.randomStart}>Random</BlueButton>
                        </div>
                    </form>
        );
    }
}