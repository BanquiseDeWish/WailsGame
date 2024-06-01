import BaseModal from '@/Components/Modal/BaseModal';
import '@css/modal.css';
import BlueButton from '../Navigation/Buttons/BlueButton';
import UserPenguin from '../User/UserPenguin';
import UserCard from '../User/UserCard';
import RedButton from '../Navigation/Buttons/RedButton';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import PaymentSuccess from '../Icons/PaymentSuccess';
import moment from 'moment-timezone';
export default class ShopStatusPayment extends BaseModal {

    constructor(props) {
        super(props);
        this.paymentData = this.props.payment_data
        if(this.paymentData) {
            this.paymentData.created_at = moment(this.paymentData?.created_at).format('DD/MM/YYYY [à] HH:mm');
        }

        this.state = {
            ...this.state,
            data: props.data
        };
        this.state.onBackgroundClick = () => {
            this.closeModal();
        };
    }

    componentDidMount() {
        if (this.props?.isOpen) {
            this.openModal();
            setTimeout(() => {
                const newPath = window.location.pathname.split('/')[1];
                window.history.replaceState(null, '', '/' + newPath);
            }, 1500)
        }
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
                <div className='relative flex flex-col self-stretch p-6 gap-8 w-full items-start justify-between select-none' style={{ background: 'var(--modal_background)', borderRadius: 'inherit' }}>
                    <div className="flex flex-col flex-1 h-full w-full">
                        <div className="flex gap-4 items-center">
                            <PaymentSuccess width='64' height='64' />
                            <h2 className='text-[28px] font-semibold'>Merci d'avoir commandé !</h2>
                        </div>
                        <div className="flex flex-1 flex-col mt-6 w-full">
                            <span className='text-[18px] font-bold'>{this.props.username},</span>
                            <p>
                                Nous vous remercions pour votre achat sur Banquise de Weils !
                                <br />
                                Nous avons le plaisir de vous informer que votre paiement a été traité avec succès.<br />Voici les détails de votre commande :
                            </p>
                            <br />
                            <p>Numéro de commande: <b>{this.paymentData?.id}</b></p>
                            <p>Date de la commande: <b>{this.paymentData?.created_at}</b></p>
                            <p>Mode de paiement: <b>PayPal</b></p>
                            <br />
                            <p>Articles Commandés :</p>
                            <div className="flex flex-col overflow-y-auto h-36">
                                {this.paymentData?.cart_details?.map((item, _) => {
                                    return (
                                        <div className="flex pl-4 py-2 gap-2">
                                            <span>{(_ + 1)}.</span>
                                            <div key={item.id} className="flex flex-col ">
                                                <p>Nom: <b>{item?.name}</b></p>
                                                <p>Quantité: <b>1x</b></p>
                                                <p>Prix: <b>{item?.price}€</b></p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <br />
                            <div className="flex items-end w-full">
                                <div className="flex flex-1 text-[18px]">
                                    <p>Total: <b>{this.paymentData?.amount} {this.paymentData?.currency}</b></p>
                                </div>
                                <BlueButton href={route('profile.appearance')}>Aller voir mon pingouin</BlueButton>
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`
                    .modal {
                        background: transparent;
                        position: relative;
                    }
                    .loading_payemnt {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.4);
                        top: 0;
                        left: 0;
                        z-index: 99;
                        border-radius: inherit;
                        backdrop-filter: blur(3px);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 24px;
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
