import CosmeticCard from "./CosmeticCard"
import EmptyBoxIcon from "@/Components/Icons/EmptyBoxIcon"
import { randomId } from "@/Game/random"

export default function CosmeticList({ cosmetics, activeTab, selectCosmetic, activeCosmeticsIds=[] }) {

    return (
        <div className="md:order-2 md:flex md:flex-shrink-0 container justify-start items-start xl:col-span-5 col-span-3 select-none h-full overflow-hidden">
            {!cosmetics && <div className="col-span-2 flex justify-center items-center w-full h-full"><div className="loader-spinner"></div></div>}
            {cosmetics && <div className="grid grid-cols-2 md:flex w-full md:flex-wrap gap-2 md:gap-4 overflow-y-scroll p-2 md:p-8 h-full content-start">
                {cosmetics && activeTab == 'slogan' &&
                    <CosmeticCard
                        className={"md:h-[128px] md:w-[200px]"} 
                        key={'no_cosmetic'} onClick={() => { selectCosmetic(undefined) }}
                    >
                        <span className="flex items-center justify-center text-center h-full w-full">Un Pingouin Voyageur</span>
                    </CosmeticCard>
                }
                {cosmetics && activeTab == 'penguin_eye' &&
                    <CosmeticCard 
                        className={"h-[160px] md:h-[200px] md:w-[200px]"} 
                        key={'no_cosmetic'} 
                        onClick={() => { selectCosmetic(undefined) }}
                        name={"Par Défaut"}
                    >
                        <div className={'scale-[0.75]'}>
                            <svg width={128} height={128}>
                                <g id="eye" transform="translate(-250,0)">
                                    <path id="white_eye" d="M288.77 27.6313C288.338 46.3919 291.648 68.8273 304.255 83.4833C308.6 87.9707 312.609 91.3304 319.033 91.6313C322.98 91.5842 325.139 90.7372 328.097 88.1436C331.959 84.1284 334.743 79.7328 336.966 74.6247C337.432 73.5695 337.432 73.5695 337.907 72.4929C339.184 67.0322 339.204 61.9018 336.366 56.9726C330.887 49.131 322.062 45.5862 313.566 42.0938C306.665 39.253 292.765 30.8921 288.77 27.6313Z" fill="#FAFAFB" />
                                    <g id="pupil">
                                        <circle id="pupil_2" cx="319.765" cy="68.3921" r="10" fill="#354357" />
                                        <circle id="pupil_reflect" cx="323.265" cy="63.8921" r="3" fill="#EAEEF0" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </CosmeticCard>
                }
                {cosmetics && activeTab != 'slogan' && activeTab != 'penguin_eye' &&
                    <CosmeticCard 
                        className={"h-[160px] md:h-[200px] md:w-[200px] justify-end"} 
                        key={'no_cosmetic_1'} onClick={() => { selectCosmetic(undefined) }}
                        name={"Rien"}
                    >
                        <div className={`flex justify-center items-end overflow-hidden w-[96px] h-[96px]`}>
                            <EmptyBoxIcon className="flex-shrink-0" width={window.innerWidth <= 768 ? 64 : 96} height={window.innerWidth <= 768 ? 64 : 96} />
                        </div>
                    </CosmeticCard>
                }
                {
                    cosmetics?.map((cosmetic, _) => {
                        switch (cosmetic.sub_type) {
                            case 'penguin_color':
                            case 'icon_background':
                                return (
                                    <CosmeticCard 
                                        className={"h-[160px] md:h-[200px] md:w-[200px]"} 
                                        key={cosmetic.name + '_' + randomId()} 
                                        onClick={() => { selectCosmetic(cosmetic) }} 
                                        lock={!cosmetic.owned} 
                                        active={activeCosmeticsIds?.includes(cosmetic?.id)}
                                        name={cosmetic.name}
                                    >
                                        <div className={`flex flex-shrink-0 justify-center items-end overflow-hidden w-[80px] h-[80px] md:w-[96px] md:h-[96px] rounded-full ${!cosmetic.owned && 'opacity-70'}`}
                                            style={{ background: cosmetic?.style[0]?.style, backgroundSize: 'cover' }}
                                        />
                                    </CosmeticCard>
                                )
                            case 'card_background':
                                return (
                                    <CosmeticCard 
                                        className={"h-[160px] md:h-[200px] md:w-[200px]"} 
                                        key={cosmetic.name + '_' + randomId()} 
                                        onClick={() => { selectCosmetic(cosmetic) }} 
                                        lock={!cosmetic.owned} 
                                        active={activeCosmeticsIds?.includes(cosmetic?.id)}
                                        name={cosmetic.name}
                                    >
                                        <div className={`flex flex-shrink-0 justify-center items-end overflow-hidden w-[80px] h-[80px] md:w-[160px] md:h-[80px] rounded-lg ${!cosmetic.owned && 'opacity-70'}`}
                                            style={{ background: cosmetic?.style[0]?.style, backgroundSize: 'cover' }}
                                        />
                                    </CosmeticCard>
                                )
                            case 'slogan':
                                return (
                                    <CosmeticCard 
                                        className={"h-[128px] md:w-[200px]"} 
                                        key={cosmetic.name + '_' + randomId()} 
                                        onClick={() => { selectCosmetic(cosmetic) }} 
                                        lock={!cosmetic.owned} 
                                        active={activeCosmeticsIds?.includes(cosmetic?.id)}
                                    >
                                        <span className="flex justify-center items-center w-full h-full text-center">{cosmetic.name}</span>
                                    </CosmeticCard>
                                )
                            default:
                                return (
                                    <CosmeticCard 
                                        className={"h-[160px] md:h-[200px] md:w-[200px] overflow-hidden"} 
                                        key={cosmetic.name + '_' + randomId()} 
                                        onClick={() => { selectCosmetic(cosmetic) }} 
                                        lock={!cosmetic.owned} 
                                        active={activeCosmeticsIds?.includes(cosmetic?.id)}
                                        name={cosmetic.name}
                                        rarity={cosmetic.rarity}
                                    >
                                        <div className={`flex flex-shrink-0 justify-center items-center overflow-hidden ${!cosmetic.owned && 'opacity-70'} ${window.innerWidth <= 768 ? 'scale-[0.625]' : 'scale-[0.85]'} `}>
                                                <svg  viewBox="0 0 128 128" width={128} height={128}>
                                                    {
                                                        cosmetic.style.map((style, _) => {
                                                            return <g dangerouslySetInnerHTML={{ __html: style.style }} />
                                                        })
                                                    }
                                                </svg>
                                        </div>
                                    </CosmeticCard>
                                )
                        }
                    })
                }
            </div>}
        </div>
    )
}