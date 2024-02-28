import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react'
import BDWSocket from '../../Game/socket';

import GreenButton from '@/Components/Navigation/Buttons/GreenButton';
import BlueButton from '@/Components/Navigation/Buttons/BlueButton';
import YellowButton from '@/Components/Navigation/Buttons/YellowButton';

import CrownPenguin from '../../../assets/img/modals/vipgames/penguin_crown.png';
import TopHatPenguin from '../../../assets/img/modals/vipgames/penguin_top_hat.png';

import BaseModal from "./BaseModal";

import { InputRange } from '../Forms/InputRange';

export default class VIPGamesModal extends BaseModal {

    constructor(props) {
        super(props);

        this.socket = new BDWSocket('vipgames');
        this.state = {
            ...this.state,
            number_of_winning_tickets: 1,
            number_of_bonus_tickets: 5,
            number_of_dead_tickets: 1,
            number_of_tickets: 100,
            isConnected: this.socket?.connected,
        };
    }

    handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;

        if (key == 'bonus_tickets') {
            this.setState((prevState) => ({ ...prevState.values, [key]: value.split(',') }));
            return;
        }
        this.setState((prevState) => ({ ...prevState.values, [key]: value }));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.socket.emit('init_game', this.state);
        router.get('/vipgames/play');
    }

    componentDidMount() {
        this.socket.on('connect', this.onConnect);
        this.socket.on('disconnect', this.onDisconnect);
    }

    componentWillUnmount() {
        this.socket.off('connect', this.onConnect);
        this.socket.off('disconnect', this.onDisconnect);
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
            <>
            <img src={CrownPenguin} className='absolute top-[-180px] right-[30px] modal_child_img' width={150} alt="" />
            <img src={TopHatPenguin} className='absolute top-[-180px] left-[30px] modal_child_img' width={150} alt="" />
            <form onSubmit={this.handleSubmit} className='flex flex-col gap-4 items-center justify-center w-[560px]'>
                <InputRange
                    label="Nombre Total de Ticket"
                    value={this.state.number_of_tickets}
                    onChange={this.handleChange}
                    min={50}
                    max={150}
                    id="number_of_tickets"
                />
                <InputRange
                    label="Nombre de Ticket Gagnant"
                    value={this.state.number_of_winning_tickets}
                    onChange={this.handleChange}
                    min={1}
                    max={10}
                    id="number_of_winning_tickets"
                />
                <InputRange
                    label="Nombre de Ticket Bonus"
                    value={this.state.number_of_bonus_tickets}
                    onChange={this.handleChange}
                    min={0}
                    max={20}
                    id="number_of_bonus_tickets"
                />
                <InputRange
                    label="Nombre de Ticket Explosif"
                    value={this.state.number_of_dead_tickets}
                    onChange={this.handleChange}
                    min={0}
                    max={20}
                    id="number_of_dead_tickets"
                />
                <div className='flex flex-row gap-8'>
                    <GreenButton type="submit" className="w-fit button_green">Lancer</GreenButton>
                </div>
            </form>
            <style>{`
                .modal_child_img:nth-of-type(1) {
                    transform: rotate(12deg) translateZ(-10px);
                }
                .modal_child_img:nth-of-type(2) {
                    transform: rotate(-12deg) translateZ(-10px);
                }
                
            `}</style>
            </>
        );
    }
}
