import BaseModal from '@/Components/Modal/BaseModal';
import GameSound from '@/Game/audio';
import '@css/modal.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import TriangleIcon from '../../../../../assets/icons/warning.svg'
import BlueButton from '@/Components/Navigation/Buttons/BlueButton';
import RedButton from '@/Components/Navigation/Buttons/RedButton';
export default class ConfirmMaxQuestions extends BaseModal {

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            data: props.data
        };
        this.state.onBackgroundClick = () => {
            this.closeModal()
        };
    }

    componentDidMount() {

    }

    percentageTimer() {
        return (this.props.data?.timer / 5 * 100)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            if(this.props.data?.lastError !== undefined) {
                if (prevProps.data?.lastError?.message !== this.props.data?.lastError?.message && this.props.data?.lastError.message == "themes_enable_not_superior_max_questions" && !this.state.openModal) {
                    this.openModal();
                }
            }
        }
    }

    getButton() {
        return undefined;
    }

    launchGameAfterAdapt = () => {
        this.props.emit("quizz_update_maximum_questions", { data: this.props.data.lastError.data.numberAdapt })
        this.closeModal()
        setTimeout(() => {
            this.props.launchGame()
        }, 400)
    }

    render() {
        return super.render(
            <>
                <div className='flex flex-col gap-[32px] w-[800px] p-8 select-none' style={{ background: 'var(--modal_background)', height: 'fit-content', borderRadius: 'inherit' }}>
                    <div className="flex gap-2 items-center">
                        <img src={TriangleIcon} className='w-12 h-12' alt=""/>
                        <h2 className='text-[28px] font-semibold'>Avertissement</h2>
                    </div>
                    <p>Impossible de lancer la partie dans ces conditions, il semblerait que le nombre de thèmes activés ne soit pas assez pour le nombre de questions choisis. Souhaitez-vous adapter le nombre de questions en conséquence ?</p>
                    <span className="italic text-[14px] font-semibold">{this.props.data?.lastError?.data?.numberAdapt} Questions trouvées avec les thèmes choisis</span>
                    <div className="flex gap-2 justify-end">
                        <RedButton onClick={() => { this.closeModal() }}>Non, annuler</RedButton>
                        <BlueButton onClick={this.launchGameAfterAdapt}>Oui, adapter</BlueButton>
                    </div>
                </div>
                <style>{`
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
