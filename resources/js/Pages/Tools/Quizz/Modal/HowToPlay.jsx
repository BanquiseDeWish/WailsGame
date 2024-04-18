import BaseModal from '@/Components/Modal/BaseModal';
import GameSound from '@/Game/audio';
import '@css/modal.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import GameIcon from '../../../../../assets/icons/game.svg'
import BlueButton from '@/Components/Navigation/Buttons/BlueButton';
import RedButton from '@/Components/Navigation/Buttons/RedButton';
export default class HowToPlay extends BaseModal {

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

    percentageTimer() {
        return (this.props.data?.timer / 5 * 100)
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
                        <img src={GameIcon} className='w-12 h-12' alt="" />
                        <h2 className='text-[28px] font-semibold'>Comment se déroule une partie ?</h2>
                    </div>
                    <p>
                        Le principe est simple : vous répondez jusqu'à 50 questions variées pendant 15 secondes chacune. Ça peut être une simple question, une question audio ou encore une image ou des images. Le but, avoir le meilleur score pour prouver à vos amis que vous avez un BIG BRAIN.<br /><br />
                        Plus vous répondez vite, plus vous gagnerez ou perdrez de points. Cependant, à contrario, plus vous prenez votre temps pour répondre moins vous gagnerez ou perdrez de points.<br /><br />
                        <div className="flex">
                            <div className="message w-fit" style={{ width: 'fit-content' }}>
                                <i>
                                    Timothée répond bon avec 12 secondes au timer: +12 pts<br />
                                    Alors que Titouan répond faux avec 8 secondes à son timer: -8 pts
                                </i>
                            </div>
                        </div>
                    </p>
                    <div className="flex gap-2 justify-end">
                        <BlueButton onClick={() => { this.props.setIsOpen(false) }}>Parfait !</BlueButton>
                    </div>
                </div>
                <style>{`
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
