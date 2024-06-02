import MainLayout from "@/Layouts/MainLayout";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CosmeticCard from "../Profile/Appearance/CosmeticCard";
import BlueButton from "@/Components/Navigation/Buttons/BlueButton";
import ShopDetailsArticle from "@/Components/Modal/ShopDetailsArticle";
import { toast } from "sonner";
import ArticleItem from '@/Components/Content/Shop/ArticleItem'
import GreenButton from "@/Components/Navigation/Buttons/GreenButton";
import { TrashIcon } from "@heroicons/react/20/solid";
import Cart from "@/Components/Content/Shop/Cart";
import ShopStatusPayment from "@/Components/Modal/ShopStatusPayment";
import ShopIcon from "@/Components/Icons/Shop";
import IllusEmptyCategory from '@assets/img/market/illus_empty_category.webp'
export default function ShopIndex(props) {

    const [shopStatePayment, setShopStatePayment] = useState(props?.state == "success" && props?.payment_data !== null)
    const [activeTab, setActiveTab] = useState(null);
    const [chooseArticle, setChooseArticle] = useState(undefined);
    const [shopDetailsOpen, setShopDetailsOpen] = useState(false);
    const [openCartModal, setOpenCartModal] = useState(false);
    const [articles, setArticles] = useState(undefined);
    const [storageCart, setStorageCart] = useState(localStorage.getItem('cart') == null ? [] : JSON.parse(localStorage.getItem('cart')));
    const [cart, setCart] = useState(undefined);
    const [priceCart, setPriceCart] = useState(0);

    const twitch = props.auth.twitch;

    function getArticles(tab) {
        if(tab == activeTab) return;
        setArticles(undefined);
        setActiveTab(tab);
        axios.get(route('shop.articles', { tab_id: tab }))
            .then((response) => {
                setArticles(response.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getArticles(props.tabs?.[0]?.subtabs?.[0]?.id);

        if (props.flash.shop_redirect_success) {
            localStorage.removeItem('cart')
            setStorageCart([])
        }

        //init Cart if inexist
        const cart = localStorage.getItem('cart');
        if (!cart) return localStorage.setItem('cart', JSON.stringify([]));


        processCart()

        if (props?.state == "error") {
            setTimeout(() => {
                const newPath = window.location.pathname.split('/')[1];
                window.history.replaceState(null, '', '/' + newPath);
            }, 1500)
            return toast.error('Une erreur est survenue lors du paiement :(')
        }

    }, []);

    const processCart = () => {
        axios.post(route('shop.cart'), { cart: storageCart })
            .then((response) => {
                const cartProcessed = response.data;
                setCart(cartProcessed)
                let priceFinal = 0;
                cartProcessed.forEach((article) => {
                    priceFinal = priceFinal + parseFloat(article.price)
                })
                setPriceCart(priceFinal);
            })
    }

    const selectArticle = (e, article) => {
        setChooseArticle(article);
        /*router.post(route('paypal.start'), { article_id: article.id }, {
            onSuccess: (response) => {
                if(response.props.flash.message.type == 'error') {
                    toast.error(response.props.flash.message.msg)
                }
            }
        })*/
    }

    const addArticleCart = (article) => {
        const cartCopy = [...storageCart];
        if (cartCopy.includes(article.id)) return toast.error('Vous avez déjà ajouté cet article dans le panier.');
        cartCopy.push(article.id);
        setStorageCart(cartCopy)
        localStorage.setItem('cart', JSON.stringify(cartCopy));
        toast.success('Ajouté au panier avec succès !')
    }

    const deleteArticle = (article) => {
        let cartCopy = [...storageCart];
        if (!cartCopy.includes(article)) return;
        cartCopy = cartCopy.filter((art) => { return art !== article })
        setStorageCart(cartCopy)
        localStorage.setItem('cart', JSON.stringify(cartCopy));
    }

    useEffect(() => {
        setCart(undefined)
        processCart()
    }, [storageCart])

    const reloadTab = () => {
        getArticles(activeTab)
    }

    const removeArticle = (uuid) => {
        let copyArticles = [...articles];
        copyArticles = copyArticles.filter(article => article.uuid !== uuid);
        setArticles(copyArticles);
    }

    const TabLink = (subtab) => {
        return (
            <span className={`hover:bg-container transition-all p-3 w-full rounded-lg select-none ${activeTab === subtab.id && 'bg-container'}`}
                key={subtab.name}
                onClick={() => getArticles(subtab.id)}
            >
                {subtab.name}
            </span>
        )
    }

    return (
        <MainLayout showOverflow={true}>
            <Head title="Boutique" />
            {props?.state == "success" && props?.payment_data !== null && <ShopStatusPayment payment_data={props.payment_data} username={twitch?.display_name} isOpen={shopStatePayment} setIsOpen={setShopStatePayment} />}
            <div className="flex gap-4 flex-col h-full" >
                <div className="flex items-center gap-2">
                    <ShopIcon width={52} height={52} />
                    <div className="flex flex-col gap-0">
                        <h2 className="text-[28px] font-bold mb-[-4px]">Boutique</h2>
                        <span className="leading-6" >Retrouvez ici des élements à ajouter à votre petit pingouin !</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-9 gap-y-6 lg:gap-6 w-full pb-6">
                    <div className="container xl:col-span-2 col-span-2 flex flex-col justify-start items-start p-6 gap-8 w-full">
                        <div className="flex flex-col flex-1 gap-8 w-full">
                            {
                                props.tabs.map((tab, _) => {
                                    return (
                                        <div key={tab.key} className="flex flex-col gap-3 w-full">
                                            <span className="font-bold text-xl" key={tab.name}>{tab.name}</span>
                                            <div className="flex flex-col ml-6">
                                                {tab.subtabs.map((subtab, _) => {
                                                    return (
                                                        <span className={`hover:bg-container transition-all p-3 w-full rounded-lg select-none ${activeTab === subtab.id && 'bg-container'}`}
                                                            key={subtab.name}
                                                            onClick={() => getArticles(subtab.id)}
                                                        >
                                                            {subtab.name}
                                                        </span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <span className={`hover:bg-container transition-all p-3 w-full rounded-lg select-none ${activeTab === -1 && 'bg-container'}`}
                                key={"free"}
                                onClick={() => getArticles(-1)}
                            >
                                Cosmétiques/Skins Gratuit
                            </span>
                        </div>
                        <BlueButton onClick={() => { setOpenCartModal(true) }} className={"w-full"}>Voir le panier</BlueButton>
                    </div>

                    <div className="container justify-start items-start xl:col-span-7 p-4 select-none overflow-y-auto w-full lg:w-auto">
                        {!articles && <div className="flex justify-center items-center w-full h-full"><div className="loader-spinner"></div></div>}
                        {articles?.length > 0 &&
                            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                                {articles?.map((article) => {
                                    return (
                                        <ArticleItem key={article.uuid} article={article} reloadTab={reloadTab} removeArticle={removeArticle} selectArticle={selectArticle} addArticleCart={addArticleCart} />
                                    )
                                })}
                            </div>
                        }
                        {articles?.length == 0 &&
                            <div className="flex jsutify-center items-center h-full w-full">
                                <div className="flex flex-col w-full h-full items-center justify-center">
                                    <img src={IllusEmptyCategory} alt="" />
                                    <h2 className="text-[24px] font-bold">Aucun articles disponible dans cette catégorie.</h2>
                                    <h4 className="text-center">Il se peut que vous ayez été trop gourmand sur la boutique ou que nous n'avons pas encore<br/>ajouté d'articles dans cette catégorie.</h4>
                                </div>
                            </div>
                        }
                        <Cart openCart={openCartModal} deleteArticle={deleteArticle} priceCart={priceCart} cart={cart} setOpenCart={setOpenCartModal} />
                    </div>

                    <ShopDetailsArticle twitch={twitch} chooseArticle={chooseArticle} setChooseArticle={setChooseArticle} addArticleCart={addArticleCart} />
                </div>
            </div>
            <style>
                {`
                `}
            </style>
        </MainLayout >
    )

}
