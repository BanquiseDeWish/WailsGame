import HOFEntry from "./HOFEntry";

import First from "../../../../assets/img/hof/first.svg"
import Second from "../../../../assets/img/hof/second.svg"
import Third from "../../../../assets/img/hof/third.svg"
import '../../../../css/hof.css'

import HOFPodium from "./HOFPodium";
import RankingEntries from "./RankingEntries";

export default function HOFTable({ load, logoPos, filter, logo, data, labelPoints, className }) {

    const pos1 = data?.find((_, index) => index == 0)
    const pos2 = data?.find((_, index) => index == 1)
    const pos3 = data?.find((_, index) => index == 2)

    return (
        <div className={`hof h-fit max-h-full xl:h-full w-fit ${className}`}>
            <div className="logo" style={{ top: logoPos + "px" }}>
                <img src={logo} className="w-[250px] lg:w-[308px]" alt="" />
            </div>

            {load &&
                <div className="flex justify-center items-center w-full h-[12rem] xl:h-full gap-4 text-white text-2xl">
                    <span className="icon-loader"></span> Chargement des données
                </div>
            }

            {!load && data?.length == 0 &&
                <div className="flex justify-center items-center w-full h-[12rem] xl:h-full text-white text-2xl">
                    Aucune données
                </div>
            }

            {!load && data == undefined && data == null &&
                <div className="flex justify-center items-center w-full h-[12rem] xl:h-full text-white text-2xl">
                    Aucune données
                </div>
            }

            {!load && data?.length !== 0 && data !== null && data !== undefined &&
                <>
                    {filter?.type !== "category" && filter?.displayName &&
                        <div className="flex justify-center w-full text-2xl">
                            {filter?.displayName}
                        </div>
                    }

                    <div className="podium w-full hidden xl:flex flex-wrap justify-between items-end">
                        <HOFPodium
                            data={{
                                topIcon: Second,
                                user_info: pos2,
                                labelPoints: labelPoints,
                                points: pos2?.points,
                                penguinWidth: 95
                            }}
                            style={{
                                background: 'linear-gradient(180deg, transparent 0%, #9F9F9F 100%)'
                            }}
                        />
                        <HOFPodium
                            data={{
                                topIcon: First,
                                user_info: pos1,
                                labelPoints: labelPoints,
                                points: pos1?.points,
                                penguinWidth: 115
                            }}
                            style={{
                                background: 'linear-gradient(180deg, transparent 0%, #EDA61E 100%)'
                            }}
                        />
                        <HOFPodium
                            data={{
                                topIcon: Third,
                                user_info: pos3,
                                labelPoints: labelPoints,
                                points: pos3?.points
                            }}
                            style={{
                                background: 'linear-gradient(180deg, transparent 0%, #D87731 100%)'
                            }}
                        />
                    </div>
                    <div className="hidden xl:block separator"></div>
                    <div className="ttable hidden xl:flex">
                        <RankingEntries users_ids={data.map((val, _) => {return val.user_id})} data={data} labelPoints={labelPoints} type="pc" />
                    </div>
                    <div className="ttable flex xl:hidden">
                        <RankingEntries users_ids={data.map((val, _) => {return val.user_id})} data={data} labelPoints={labelPoints} type="mobile" />
                    </div>
                </>
            }
        </div>

    )

}
