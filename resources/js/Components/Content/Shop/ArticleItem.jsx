import GreenButton from "@/Components/Navigation/Buttons/GreenButton";
import { router } from "@inertiajs/react";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

export default function ArticleItem({ article, reloadTab, selectArticle, addArticleCart }) {

    const [processClaim, setProcessClaim] = useState(false)

    const domId = article.id == -1 ? 'article_free_' + article.cosmetics[0]?.id : article?.id
    const claimArticle = (article) => {
        if(processClaim) return;
        setProcessClaim(true)
        axios.post(route('shop.claim_free'), { article_id: article.id == -1 ? -1 + '.' + article.cosmetics[0]?.id : article?.id })
                .then((response)=>{
                    if (response.data.status == 'error') {
                        toast.error(response.data.message)
                        return;
                    }
                    document.querySelector(`#${domId}`).remove()
                    toast.success(response.data.message)
                })
                .finally(()=> {
                    setProcessClaim(false)
                })
    }


    return (
        <div key={article.id} id={domId} className="article w-[220px] h-[258px] gap-[24px] container flex-1 flex-col p-0 m-y-4 pb-6 cursor-pointer">
            <div className="flex flex-col gap-[24px] mt-[24px] w-full items-center" onClick={(e) => { selectArticle(e, article, domId) }} >
                {article.cosmetics.length == 1 ?
                    <div className="flex w-[128px] h-[128px]">
                        {article.cosmetics?.map((cosmetic) => {
                            switch (cosmetic.sub_type) {
                                case 'hat':
                                case 'penguin_backpack':
                                case 'penguin_tail':
                                case 'penguin_accessory':
                                    return (
                                        <div key={cosmetic.id} className={`flex mt-[24px] justify-center items-end overflow-hidden w-[128px] h-[128px] scale-[0.75]`}
                                            dangerouslySetInnerHTML={{ __html: cosmetic.style }}
                                        />
                                    )
                                case 'icon_background':
                                case 'card_background':
                                    return (
                                        <div key={cosmetic.id} className={`flex mt-[24px] justify-center items-end overflow-hidden w-[128px] h-[128px] rounded-full`}
                                            style={{ background: cosmetic.style }}
                                        />
                                    )
                                case 'slogan':
                                    return (
                                        <span key={cosmetic.id} className="flex mt-[24px] justify-center items-center w-full h-full text-center">{article.name}</span>

                                    )
                            }
                        })}
                    </div>
                    :
                    <div className="flex mt-[2rem]">
                        <img src={`${route('/')}/storage/shop/articles/${article.thumbnail}.webp`} title={`thumbnail_article_${article.id}`} style={{ borderRadius: '8px', width: '130px', height: '130px' }} alt={`thumbnail_article_${article.id}`} />
                    </div>
                }
                <div className="flex flex-col items-center text-center">
                    <h4 className="text-[16px] font-bold">{article.name}</h4>
                    {article.limited_at !== null && <span className="text-[10px]">Disponible jusqu'au<br/>{moment(article.limited_at).format('DD/MM/YYYY [à] HH:mm')}</span>}
                    {article.price > 0 ? <div className="text-[16px]">{article.price}€</div> : <div className="text-[16px]">GRATUIT</div>}
                </div>
            </div>

            <div className="relative flex-col w-full justify-start items-start gap-2">
                <GreenButton style={{ width: '100%', height: '40px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }} onClick={() => { article.price <= 0 ? claimArticle(article) : addArticleCart(article) }}>
                    {article.price <= 0 ?
                        <span className="text-[16px]">{processClaim ? "Veuillez patienter.." : "Récupérer"}</span>
                        :
                        <span className="text-[16px]">Ajouter au panier</span>

                    }
                </GreenButton>
            </div>
        </div>
    )

}
