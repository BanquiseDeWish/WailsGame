import BaseModal from '@/Components/Modal/BaseModal';
import EggImg from '@assets/img/tools/shinywars/egg.png';

import '@css/modal.css';

export default class PokemonDrawModal extends BaseModal {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            pokemon: props.pokemon
        };
        this.state.openModal = props.openModal;
    }

    componentDidMount() { }

    getButton() {
        return undefined;
    }

    render() {
        return super.render(
            <>
                <div className='flex flex-col gap-[32px] items-center justify-center w-[800px] px-[32px]'>
                    <img
                        width={360}
                        src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${this.state.pokemon?.id}/${'shiny_' + this.state.pokemon?.form}.png`}
                        alt=""
                        onError={(e) => { e.target.onerror = null; e.target.src = EggImg }}
                    />
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <span className='font-semibold text-2xl'>{this.state.pokemon?.name}</span>
                        <div className='flex flex-row gap-[16px]'>
                            {
                                this.state.pokemon?.types.map((type, index) => {
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