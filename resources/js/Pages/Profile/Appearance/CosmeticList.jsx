import CosmeticCard from "./CosmeticCard"
import EmptyBoxIcon from "@/Components/Icons/EmptyBoxIcon"
import { randomId } from "@/Game/random"
import { useEffect } from "react"

export default function CosmeticList({ cosmetics, activeTab, selectCosmetic}) {

    return (
        <div className="md:order-2 md:flex md:flex-shrink-0 container justify-start items-start xl:col-span-5 col-span-3 p-2 md:p-8 select-none md:h-full overflow-hidden">
        {!cosmetics && <div className="flex justify-center items-center w-full h-full"><div className="loader-spinner"></div></div>}
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 h-full overflow-y-auto content-start">
            {cosmetics && activeTab == 'slogan' &&
                <CosmeticCard className={"md:h-[128px] md:w-[200px]"} key={'no_cosmetic'} onClick={() => { selectCosmetic(undefined) }}>
                    <span className="flex items-center justify-center text-center h-full w-full">Un Pingouin Voyageur</span>
                </CosmeticCard>
            }
            {cosmetics && activeTab == 'penguin_eye' &&
                <CosmeticCard className={"h-[160px] md:h-[200px] md:w-[200px]"} key={'no_cosmetic'} onClick={() => { selectCosmetic(undefined) }}>
                    <div className={window.innerWidth <= 768 ? 'scale-[0.75]' : ''}>
                    <svg width={128} height={128}>
                        <g id="eye" transform="translate(-250,0)">
                            <path id="Vector_11" d="M288.77 27.6313C288.338 46.3919 291.648 68.8273 304.255 83.4833C308.6 87.9707 312.609 91.3304 319.033 91.6313C322.98 91.5842 325.139 90.7372 328.097 88.1436C331.959 84.1284 334.743 79.7328 336.966 74.6247C337.432 73.5695 337.432 73.5695 337.907 72.4929C339.184 67.0322 339.204 61.9018 336.366 56.9726C330.887 49.131 322.062 45.5862 313.566 42.0938C306.665 39.253 292.765 30.8921 288.77 27.6313Z" fill="#FAFAFB" />
                            <g id="pupil">
                                <circle id="Ellipse 8" cx="319.765" cy="68.3921" r="10" fill="#354357" />
                                <circle id="Ellipse 9" cx="323.265" cy="63.8921" r="3" fill="#EAEEF0" />
                            </g>
                        </g>
                    </svg>
                    </div>
                </CosmeticCard>
            }
            {cosmetics && activeTab != 'slogan' && activeTab != 'penguin_eye' &&
                <CosmeticCard className={"h-[160px] md:h-[200px] md:w-[200px]"} key={'no_cosmetic_1'} onClick={() => { selectCosmetic(undefined) }}>
                    <div className={`flex justify-center items-end overflow-hidden w-[128px] h-[128px]`}>
                        <EmptyBoxIcon className="flex-shrink-0" width={window.innerWidth <= 768 ? 64 : 96} height={window.innerWidth <= 768 ? 64 : 96} />
                    </div>
                    <span>Rien</span>
                </CosmeticCard>
            }
            {
                cosmetics?.map((cosmetic, _) => {
                    switch (cosmetic.sub_type) {
                        case 'hat':
                        case 'backpack':
                        case 'accessory':
                        case 'penguin_eye':
                            return (
                                <CosmeticCard className={"h-[160px] md:h-[200px] md:w-[200px] overflow-hidden justify-end"} key={cosmetic.name+'_'+randomId()} onClick={() => { selectCosmetic(cosmetic) }} lock={!cosmetic.owned}>
                                    <div className={`flex flex-shrink-0 justify-center items-end overflow-hidden top-[-10px] w-[128px] h-[128px] absolute md:relative ${!cosmetic.owned && 'opacity-70'}`}>
                                        <div dangerouslySetInnerHTML={{ __html: cosmetic.style }} className={window.innerWidth <= 768 ? 'scale-[0.75]' : ''} />
                                    </div>
                                    <span>{cosmetic.name}</span>
                                </CosmeticCard>
                            )
                        case 'penguin_color':
                        case 'icon_background':
                        case 'card_background':
                            return (
                                <CosmeticCard className={"h-[160px] md:h-[200px] md:w-[200px]"} key={cosmetic.name+'_'+randomId()} onClick={() => { selectCosmetic(cosmetic) }} lock={!cosmetic.owned}>
                                    <div className={`flex flex-shrink-0 justify-center items-end overflow-hidden w-[84px] h-[84px] md:w-[128px] md:h-[128px] rounded-full ${!cosmetic.owned && 'opacity-70'}`}
                                        style={{ background: cosmetic.style, backgroundSize: 'cover' }}
                                    />
                                    <span>{cosmetic.name}</span>
                                </CosmeticCard>
                            )
                        case 'slogan':
                            return (
                                <CosmeticCard className={"h-[128px] md:w-[200px]"} key={cosmetic.name+'_'+randomId()} onClick={() => { selectCosmetic(cosmetic) }} lock={!cosmetic.owned}>
                                    <span className="flex justify-center items-center w-full h-full text-center">{cosmetic.name}</span>
                                </CosmeticCard>
                            )
                    }
                })
            }
        </div>
    </div>
    )
}