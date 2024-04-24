import { InputRange } from '@/Components/Forms/InputRange';
import InputSwitch from '@/Components/Forms/InputSwitch';
import BaseModal from '@/Components/Modal/BaseModal';
import BlueButton from '@/Components/Navigation/Buttons/BlueButton';
import '@css/modal.css';

export default class Settings extends BaseModal {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            data: props.data
        };
        this.state.onBackgroundClick = () => {
            this.props.setIsOpen(false)
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isOpen !== this.props.isOpen) {
            if (this.props.isOpen && !this.state.openModal) {
                this.openModal();
            } else if (!this.props.isOpen && this.state.openModal) {
                this.closeModal();
            }
        }
    }

    getButton() {
        return null;
    }

    render() {
        return super.render(
            <>
                <div className='flex flex-col gap-[32px] w-[800px] p-8 select-none' style={{ background: 'var(--modal_background)', height: 'fit-content', borderRadius: 'inherit' }}>
                    <div className="flex gap-2 items-center">
                        <h2 className='text-[28px] font-semibold'>Paramètres</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <InputRange
                            label="Volume"
                            value={this.props.sv.volumeState}
                            onChange={(e) => { this.props.fsv('volume', e.target.value) }}
                            min={0}
                            max={10}
                            id="volumes_quizzmaster"
                        />
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className='text-[18px] font-semibold'>
                                    Désactiver le chat en jeu
                                </span>
                                <span className='text-[14px] font-light'>
                                    Si cochée, vous ne reçevez plus aucun message venant des autres joueurs
                                </span>
                            </div>
                            <InputSwitch classNameContainer={"max-h-[28px]"} state={this.props.sv.chatState} label={""} onChange={() => { this.props.fsv('chatState', !this.props.sv.chatState) }} />
                        </div>

                    </div>
                    <div className="flex gap-2 justify-end">
                        <BlueButton onClick={() => { this.props.setIsOpen(false) }}>Sauvegarder</BlueButton>
                    </div>
                </div>
                <style>{`
                    #modal {
                        background: transparent !important;
                    }
                    :root {
                        --modal_background: transparent;
                        --rw_popup_background: #233E67;
                        --rw-list-option-color: #fff;
                        --rw-list-option-hover: #395786;
                    }
                `}</style>
            </>
        )
    }
}
