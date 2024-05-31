import BaseModal from '@/Components/Modal/BaseModal';
import '@css/modal.css';
import BlueButton from '../Navigation/Buttons/BlueButton';
import UserPenguin from '../User/UserPenguin';
import UserCard from '../User/UserCard';
import RedButton from '../Navigation/Buttons/RedButton';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import CosmeticCard from '@/Pages/Profile/Appearance/CosmeticCard';
import { randomId } from '@/Game/random';

export default class ShopDetailsArticle extends BaseModal {

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            process: false,
            cosmetics_preview: [],
            data: props.data
        };
        this.cosmetics_loaded = false;
        this.intervalCosmetics = null;
        this.state.onBackgroundClick = () => {
            if (!this.state.process) {
                this.props.setChooseArticle(undefined)
            }
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        const penguins_cosmetics = this.props.chooseArticle?.cosmetics.filter((cosmetic) => cosmetic.type == "penguin")
        if (penguins_cosmetics) {
            const groupsCosmetics = Object.groupBy(penguins_cosmetics, ({ sub_type }) => sub_type)
            const listKeys = [];
            Object.keys(groupsCosmetics).forEach((key) => {
                listKeys.push({ key: key, cursor: 0, size: groupsCosmetics[key].length })
            })
            if (this.intervalCosmetics == null && !this.cosmetics_loaded) {
                const cosmeticsInit = [];
                listKeys.forEach((key) => {
                    cosmeticsInit.push(groupsCosmetics[key.key][key.cursor])
                })
                this.setState({ cosmetics_preview: cosmeticsInit })
                this.cosmetics_loaded = true;
                this.intervalCosmetics = setInterval(() => {
                    const cosmeticsInterval = [];
                    listKeys.forEach((key) => {
                        if (key.cursor + 1 == key.size) {
                            key.cursor = 0;
                        } else {
                            key.cursor++;
                        }
                        cosmeticsInterval.push(groupsCosmetics[key.key][key.cursor])
                    })
                    this.setState({ cosmetics_preview: cosmeticsInterval })
                }, 1500)
            }
        }
        if (prevProps.chooseArticle !== this.props.chooseArticle) {
            if (this.props.chooseArticle) {
                this.openModal();
            } else if (!this.props.chooseArticle) {
                if(this.intervalCosmetics !== null) {
                    clearInterval(this.intervalCosmetics);
                    this.intervalCosmetics = null;
                }
                this.cosmetics_loaded = false;
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
                if (response.props.flash.message.type == 'error') {
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
                    <div className="flex flex-col flex-1 h-full justify-between w-full lg:w-[650px]  overflow-y-auto">
                        <div className="flex flex-col gap-2">
                            <h2 className='text-[28px] font-semibold'>Achat de cosmétique</h2>

                        </div>
                        <div className="more_datas flex-1 mt-4">
                            <h2 className='text-[24px]'>{this.props.chooseArticle?.name}</h2>
                            {/*`<p className='text-[14px]'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at interdum massa. Phasellus finibus justo sed lectus venenatis pretium.
                                Sed a scelerisque urna, eget varius magna. Nulla tortor justo, imperdiet vel facilisis nec, laoreet mollis mi. Praesent tempor consequat erat sed egestas.
                                Curabitur metus magna, sodales a convallis nec, dictum in odio. Proin aliquet molestie varius. Aliquam vestibulum sem sit amet suscipit malesuada. Pellentesque luctus suscipit augue, eu placerat lorem tristique tempor.
                                Duis sagittis massa eros, vitae convallis augue condimentum vitae.
                            </p>`*/}
                            <span className='text-[18px] font-light'>Cet article contient:</span>
                            <div className="flex flex-wrap gap-2 my-4">
                                {this.props.chooseArticle?.cosmetics?.map((cosmetic) => {
                                    switch (cosmetic.sub_type) {
                                        case 'penguin_color':
                                        case 'icon_background':
                                        case 'card_background':
                                            return (
                                                <CosmeticCard className={"h-[160px] md:h-[200px] md:w-[200px]"} key={cosmetic.name + '_' + randomId()} lock={false}>
                                                    <div className={`flex flex-shrink-0 justify-center items-end overflow-hidden w-[80px] h-[80px] md:w-[96px] md:h-[96px] rounded-full ${false && 'opacity-70'}`}
                                                        style={{ background: cosmetic.style, backgroundSize: 'cover' }}
                                                    />
                                                    <span>{cosmetic.name}</span>
                                                </CosmeticCard>
                                            )
                                        case 'slogan':
                                            return (
                                                <CosmeticCard className={"h-[128px] md:w-[200px]"} key={cosmetic.name + '_' + randomId()} lock={false}>
                                                    <span className="flex justify-center items-center w-full h-full text-center">{cosmetic.name}</span>
                                                </CosmeticCard>
                                            )
                                        default:
                                            return (
                                                <CosmeticCard className={"h-[120px] md:h-[180px] md:w-[150px] overflow-hidden"} key={cosmetic.name + '_' + randomId()} lock={false}>
                                                    <div className={`flex flex-shrink-0 justify-center items-center overflow-hidden w-[96px] h-[96px] ${false && 'opacity-70'}`}>
                                                        <div dangerouslySetInnerHTML={{ __html: cosmetic.style }} className={window.innerWidth <= 768 ? 'scale-[0.625]' : 'scale-[0.75]'} />
                                                    </div>
                                                    <span style={{ width: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cosmetic.name}</span>
                                                </CosmeticCard>
                                            )
                                    }
                                })}
                            </div>
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
                    <div className="flex flex-col gap-4 w-full lg:w-auto h-full">
                        <UserCard propsCosmetics={this.state.cosmetics_preview} data={{ username: this.props.twitch.display_name }} />
                        <div className="flex flex-col flex-1 gap-4 items-center justify-center p-4 rounded-md" style={{ background: 'var(--container_background)' }}>
                            <div className="preview">
                                <UserPenguin className={"scale-x-[-1]"} propsCosmetics={this.state.cosmetics_preview} />
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
