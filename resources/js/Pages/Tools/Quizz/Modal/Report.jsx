import { InputRange } from '@/Components/Forms/InputRange';
import InputSwitch from '@/Components/Forms/InputSwitch';
import BaseModal from '@/Components/Modal/BaseModal';
import BlueButton from '@/Components/Navigation/Buttons/BlueButton';
import SimpleButton from '@/Components/Navigation/Buttons/SimpleButton';
import '@css/modal.css';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export default class Report extends BaseModal {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            form: {
                question_id: "",
                type: "question",
                description: ""
            },
            sending: false,
            errors: undefined,
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


    handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value
        this.setState(values => ({
            ...values,
            form: {
                ...this.state.form,
                [key]: value
            }
        }))
    }

    handleSubmit = (e) => {
        this.setState(values => ({ ...values, sending: true }))
        const submitForm = () => {
            return new Promise((resolve, reject) => {
                router.post(route('games.quizz.report_submit'), { ...this.state.form, gameId: this.props.gameId }, {
                    forceFormData: true,
                    onSuccess: (props) => {
                        this.setState(values => ({ ...values, errors: undefined }))
                        this.setState(values => ({
                            ...values,
                            form: {
                                ['question_id']: '',
                                ['type']: 'question',
                                ['description']: '',
                            }
                        }))
                        toast.success('Rapport envoyée avec succès !')
                        this.props.setIsOpen(false)
                        resolve()
                    },
                    onError: (err) => {
                        toast.error('Des erreurs se sont produites lors de l\'envoie')
                        this.setState(values => ({ ...values, errors: err }))
                        resolve()
                    },
                    onFinish: () => {
                        this.setState(values => ({ ...values, sending: false }))
                        resolve()
                    }
                })
            })
        }
        toast.promise(submitForm, {
            loading: 'Veuillez patienter..'
        })

    }

    getButton() {
        return null;
    }

    render() {
        return super.render(
            <>
                <div className='modal_qm_report flex flex-col gap-[32px] lg:w-[800px] p-8 select-none' style={{ background: 'var(--modal_background)', height: 'fit-content', borderRadius: 'inherit' }}>
                    <div className="flex gap-2 items-center">
                        <h2 className='text-[28px] font-semibold'>Signaler un problème</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="input-group">
                            <label htmlFor="type">Type de rapport</label>
                            <select disabled={this.state.sending} value={this.state.form.type} onChange={this.handleChange} id="type">
                                <option value="question">Question éronnée</option>
                                <option value="answer">Réponses incorrecte</option>
                            </select>
                            <span className="text-red-600">{this.state.errors?.type}</span>
                        </div>
                        <div className="input-group">
                            <label htmlFor="question_id">ID de la question</label>
                            <input type="text" disabled={this.state.sending} value={this.state.form.question_id} onChange={this.handleChange} id="question_id" style={{ background: 'var(--content_background)' }} />
                            <span className="text-red-600">{this.state.errors?.question_id}</span>
                        </div>
                        <div className="input-group w-full">
                            <label htmlFor="desciption">Description</label>
                            <textarea disabled={this.state.sending} value={this.state.form.description} onChange={this.handleChange} id="description" style={{ width: '100%', resize: 'none', minHeight: '200px', maxHeight: '200px' }} />
                            <span className="text-red-600">{this.state.errors?.description}</span>
                        </div>
                    </div>
                    <div className="flex w-full gap-2 justify-end">
                        <SimpleButton disabled={this.state.sending} onClick={() => { this.props.setIsOpen(false) }}>Annuler</SimpleButton>
                        <BlueButton disabled={this.state.sending} onClick={this.handleSubmit}>Envoyer mon rapport</BlueButton>
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
