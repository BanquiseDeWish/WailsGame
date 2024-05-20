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
export default function ShopIndex(props) {

    const [activeTab, setActiveTab] = useState(3);
    const [chooseArticle, setChooseArticle] = useState(undefined);
    const [shopDetailsOpen, setShopDetailsOpen] = useState(false);
    const [openCartModal, setOpenCartModal] = useState(false);
    const [articles, setArticles] = useState(undefined);
    const [storageCart, setStorageCart] = useState(localStorage.getItem('cart') == null ? [] : JSON.parse(localStorage.getItem('cart')));
    const [cart, setCart] = useState(undefined);
    const [priceCart, setPriceCart] = useState(0);

    const twitch = props.auth.twitch;

    console.log(props)

    function getArticles(tab) {
        setArticles(undefined);
        setActiveTab(tab);
        axios.get(route('shop.articles', { tab_id: tab }))
            .then((response) => {
                setArticles(response.data);
            })
    }

    useEffect(() => {
        getArticles(activeTab);

        if(props.flash.shop_redirect_success) {
            localStorage.removeItem('cart')
            setStorageCart([])
        }

        //init Cart if inexist
        const cart = localStorage.getItem('cart');
        if (!cart) return localStorage.setItem('cart', JSON.stringify([]));


        processCart()
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
        if (cartCopy.includes(article.id)) return;
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

    return (
        <MainLayout>
            <Head title="Boutique" />
            <div className="grid xl:grid-cols-9 grid-cols-7 gap-6 h-full">
                <div className="container xl:col-span-2 col-span-2 flex flex-col justify-start items-start p-6 gap-8 w-full">
                    <div className="flex flex-col flex-1 w-full">
                        {
                            props.tabs.map((tab, _) => {
                                return (
                                    <div key={tab.key} className="flex flex-col gap-4 w-full">
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
                    </div>
                    <BlueButton onClick={() => { setOpenCartModal(true) }} className={"w-full"}>Voir le panier</BlueButton>
                </div>

                <div className="container justify-start items-start xl:col-span-7 p-8 select-none overflow-y-auto">
                    {!articles && <div className="flex justify-center items-center w-full h-full"><div className="loader-spinner"></div></div>}
                    <div className="flex flex-wrap gap-4">
                        {articles?.map((article) => {
                            return (
                                <ArticleItem key={article.id} article={article} selectArticle={selectArticle} addArticleCart={addArticleCart} />
                            )
                        })}
                    </div>
                    <Cart openCart={openCartModal} deleteArticle={deleteArticle} priceCart={priceCart} cart={cart} setOpenCart={setOpenCartModal} />
                </div>

                <ShopDetailsArticle twitch={twitch} chooseArticle={chooseArticle} setChooseArticle={setChooseArticle} addArticleCart={addArticleCart} />
            </div>
            <style>
                {`
                `}
            </style>
        </MainLayout >
    )

}
