import BaseModal from '@/Components/Modal/BaseModal';
import '@css/modal.css';
import BlueButton from '../Navigation/Buttons/BlueButton';
import UserPenguin from '../User/UserPenguin';
import UserCard from '../User/UserCard';
import RedButton from '../Navigation/Buttons/RedButton';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

export default class ShopDetailsArticle extends BaseModal {

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            process: false,
            data: props.data
        };
        this.state.onBackgroundClick = () => {
            if(!this.state.process) {
                this.props.setChooseArticle(undefined)
            }
        };
    }

    componentDidMount() {
        console.log(this.props.chooseArticle?.cosmetics)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.chooseArticle !== this.props.chooseArticle) {
            if (this.props.chooseArticle) {
                this.openModal();
            } else if (!this.props.chooseArticle) {
                this.closeModal();
            }
        }
    }

    getButton() {
        return null;
    }

    processBuy() {
        this.setState({ process: true })
        router.post(route('paypal.start'), { article_id: this.props.chooseArticle?.id }, {
            onSuccess: (response) => {
                if(response.props.flash.message.type == 'error') {
                    toast.error(response.props.flash.message.msg)
                }
            },
            onFinish: () => {
                this.setState({ process: false })
            }
        })
    }

    render() {
        return super.render(
            <>
                <div className='relative flex flex-col lg:flex-row self-stretch p-6 gap-8 w-full items-start justify-between select-none overflow-y-auto lg:overflow-y-hidden' style={{ background: 'var(--modal_background)', borderRadius: 'inherit' }}>
                    {this.state.process &&
                        <div className="loading_payemnt">
                            <div className="loader-spinner" />
                            <div className="flex flex-col text-center">
                                <h2 className='text-[24px] font-light'>Achat en cours</h2>
                                <h5 className='text-[18px] font-bold'>Redirection vers le service de paiement..</h5>
                            </div>
                        </div>
                    }
                    <div className="flex flex-col flex-1 h-full justify-between w-full lg:w-[650px]">
                        <div className="flex flex-col gap-2">
                            <h2 className='text-[28px] font-semibold'>Achat de cosmétique</h2>

                        </div>
                        <div className="more_datas flex-1 mt-4">
                            <h2 className='text-[24px]'>{this.props.chooseArticle?.name}</h2>
                            <p className='text-[14px]'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at interdum massa. Phasellus finibus justo sed lectus venenatis pretium.
                                Sed a scelerisque urna, eget varius magna. Nulla tortor justo, imperdiet vel facilisis nec, laoreet mollis mi. Praesent tempor consequat erat sed egestas.
                                Curabitur metus magna, sodales a convallis nec, dictum in odio. Proin aliquet molestie varius. Aliquam vestibulum sem sit amet suscipit malesuada. Pellentesque luctus suscipit augue, eu placerat lorem tristique tempor.
                                Duis sagittis massa eros, vitae convallis augue condimentum vitae.
                            </p>
                        </div>
                        <div className="flex gap-2 items-center justify-between">
                            <div className="flex flex-col">
                                <span className='text-[20px] font-light'>Prix de l'article</span>
                                <span className='text-[18px] font-bold'>{this.props.chooseArticle?.price == 0 ? "Gratuit" : `${this.props.chooseArticle?.price}€`}</span>
                            </div>
                            <div className="flex gap-4">
                                {this.props.chooseArticle?.price > 0 && <BlueButton onClick={() => { this.props.addArticleCart(this.props.chooseArticle); this.props.setChooseArticle(undefined) }}>Ajouter au panier</BlueButton>}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full lg:w-auto">
                        <UserCard propsCosmetics={this.props.chooseArticle?.cosmetics} data={{ username: this.props.twitch.display_name }} />
                        <div className="flex flex-col flex-1 gap-4 items-center p-4 rounded-md" style={{ background: 'var(--container_background)' }}>

                            <div className="preview">
                                <UserPenguin className={"scale-x-[-1]"} propsCosmetics={this.props.chooseArticle?.cosmetics} />
                            </div>
                            <div className="separator" />
                            <div className="infos">
                                <h2 className='text-[18px] font-bold text-center'>Prévisualisation avant achat</h2>
                                <h2 className='text-[12px] font-light text-center'>Applicable immédiatement sur <br /> la page Apparence après votre achat.</h2>
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
