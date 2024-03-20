import BaseModal from '@/Components/Modal/BaseModal';
import EggImg from '@assets/img/tools/shinywars/egg.png';
import GameSound from '@/Game/audio';

import wooshIn from '@assets/sounds/shinywars/woosh_in.mp3';
import wooshOut from '@assets/sounds/shinywars/woosh_out.mp3';

import '@css/modal.css';

export default class PokemonDrawModal extends BaseModal {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            data: props.data
        };
        this.state.onBackgroundClick = () => {};
    }

    componentDidMount() { }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data?.pokemon !== this.props.data?.pokemon) {
            this.setState((prevState) => ({ ...prevState, data: {pokemon: this.props.data?.pokemon }}));
            this.openModal();
            GameSound.playSound(wooshIn, 0.3);
            setTimeout(() => {
                this.closeModal();
                GameSound.playSound(wooshOut, 0.05);
            }, 5000);
        }
    }

    getButton() {
        return undefined;
    }

    render() {
        return super.render(
            <>
                <div className='flex flex-col gap-[32px] items-center justify-center w-[800px] px-[32px]'>
                    <img
                        width={360}
                        src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${this.state.data?.pokemon?.id}/${this.state.data?.pokemon.form == 'regular' ? 'shiny' : 'shiny_' + this.state.data?.pokemon?.form}.png`}
                        alt=""
                        onError={(e) => { e.target.onerror = null; e.target.src = EggImg }}
                    />
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <span className='font-semibold text-2xl'>{this.state.data?.pokemon?.name}</span>
                        <div className='flex flex-row gap-[16px]'>
                            {
                                this.state.data?.pokemon?.types.map((type, index) => {
                                    return (
                                        <img
                                            src={type.image}
                                            alt={type.name}
                                            width={48}
                                            className={`rounded-[6px]`}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <style>{`
                    #modal {
                        background: none !important;
                    }
                    #modal input {
                        background: none !important;
                    }
                    :root {
                        --rw_popup_background: #233E67;
                        --rw-list-option-color: #fff;
                        --rw-list-option-hover: #395786;
                    }
                `}</style>
            </>
        )
    }
}