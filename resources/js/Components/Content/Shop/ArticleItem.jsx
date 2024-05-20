import GreenButton from "@/Components/Navigation/Buttons/GreenButton";

export default function ArticleItem({ article, selectArticle, addArticleCart }) {

    return (
        <div key={article.id} className="article w-[220px] h-[258px] container flex-1 flex-col p-0 cursor-pointer">
            <div className="flex flex-col gap-[24px] w-full items-center pb-[24px]" onClick={(e) => { selectArticle(e, article) }} >
                <div className="flex">
                    {article.cosmetics?.map((cosmetic) => {
                        switch (cosmetic.sub_type) {
                            case 'hat':
                            case 'backpack':
                            case 'accessory':
                                return (
                                    <div key={cosmetic.id} className={`flex mt-[24px] justify-center items-end overflow-hidden w-[128px] h-[128px]`}
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
                <div className="flex flex-col items-center">
                    <h4 className="text-[12px] font-bold">{article.name}</h4>
                    <div className="text-[16px]">{article.price}€</div>
                </div>
            </div>

            <div className="relative flex-col w-full justify-start items-start gap-2">
                <GreenButton style={{ width: '100%', height: '40px', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }} onClick={() => { addArticleCart(article) }}>
                    <span className="text-[16px]">Ajouter au panier</span>
                </GreenButton>
            </div>
        </div>
    )

}
