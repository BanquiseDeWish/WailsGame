import BaseModal from '@/Components/Modal/BaseModal';
import GameSound from '@/Game/audio';
import '@css/modal.css';
import { CircularProgressbar } from 'react-circular-progressbar';

export default class CountDown extends BaseModal {

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            data: props.data
        };
        this.state.onBackgroundClick = () => {};
    }

    componentDidMount() {

    }

    percentageTimer() {
        return (this.props.data?.timer / 5 * 100)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            if (this.props.data?.launching && !this.state.openModal) {
                this.openModal();
            }
            if (this.props.data?.launching && this.state.openModal) {
                new GameSound('quizz_aw_timer_countdown').playSound(0.5, false)
            }
            if(this.props.data?.timer <= 0) {
                if(this.state.openModal) this.closeModal();
            }
        }
    }

    getButton() {
        return undefined;
    }

    render() {
        return super.render(
            <>
                <div className='flex flex-col gap-[32px] items-center justify-center w-[800px] px-[32px]'>
                    <div className='flex flex-col items-center justify-center gap-8'>
                        <CircularProgressbar strokeWidth={10} value={this.percentageTimer()} text={`${this.props.data?.timer}`}
                            styles={{
                                path: {
                                    stroke: `rgba(61.34, 105.63, 173.19, 1)`,
                                    strokeLinecap: 'butt',
                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                    transformOrigin: 'center center',
                                },
                                trail: {
                                    stroke: 'rgba(61.34, 105.63, 173.19, 0.20)',
                                    strokeLinecap: 'butt',
                                    transform: 'rotate(0.25turn)',
                                    transformOrigin: 'center center',
                                },
                                text: {
                                    fill: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '32px',
                                },
                            }} />
                        <h2 className='text-[32px] font-bold text-center'>Début de la partie dans..</h2>
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
