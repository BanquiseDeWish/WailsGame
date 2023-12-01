import HOFEntry from "./HOFEntry";

import First from "../../../../assets/img/hof/first.svg"
import Second from "../../../../assets/img/hof/second.svg"
import Third from "../../../../assets/img/hof/third.svg"
import '../../../../css/hof.css'

import HoFPodium from "./HOFPodium";

export default function HoFTable({ load, logoPos, logo, data, labelPoints, className }) {

    const pos1 = data.find((val, index) => index == 0)
    const pos2 = data.find((val, index) => index == 1)
    const pos3 = data.find((val, index) => index == 2)
    return (
        <div className={`hof h-fit max-h-full xl:h-full w-fit ${className}`}>
            <div className="logo" style={{ top: logoPos + "px" }}>
                <img src={logo} className="w-[250px] lg:w-[308px]" alt="" />
            </div>

            {load &&
                <div className="flex justify-center items-center w-full h-[12rem] gap-4 text-white text-2xl">
                    <span className="loader"></span> Chargement des données
                </div>
            }

            {!load && data?.length == 0 &&
                <div className="flex justify-center items-center w-full h-[12rem] text-white text-2xl">
                    Aucune données
                </div>
            }

            {!load && data?.length !== 0 &&
                <>
                    <div className="podium w-full hidden xl:flex flex-wrap justify-between items-end">
                        <HoFPodium
                            data={{
                                userInfo: pos2,
                                topIcon: Second,
                                labelPoints: labelPoints,
                                penguinWidth: 95
                            }}
                            style={{
                                background: 'linear-gradient(180deg, var(--container_background) 0%, #9F9F9F 100%)'
                            }}
                        />
                        <HoFPodium
                            data={{
                                userInfo: pos1,
                                topIcon: First,
                                labelPoints: labelPoints,
                                penguinWidth: 115
                            }}
                            style={{
                                background: 'linear-gradient(180deg, var(--container_background) 0%, #EDA61E 100%)'
                            }}
                        />
                        <HoFPodium
                            data={{
                                userInfo: pos3,
                                topIcon: Third,
                                labelPoints: labelPoints,
                            }}
                            style={{
                                background: 'linear-gradient(180deg, var(--container_background) 0%, #D87731 100%)'
                            }}
                        />
                    </div>
                    <div className="hidden xl:block separator"></div>
                    <div className="ttable hidden xl:flex">
                        {data?.map((val, index) => {

                            const position = (index + 1);

                            if (position > 3) {
                                return (
                                    <>
                                        <HOFEntry position={position} data={val} labelPoints={labelPoints} />
                                    </>
                                )
                            }
                        })}
                    </div>
                    <div className="ttable flex xl:hidden">
                        {data?.map((val, index) => {

                            const position = (index + 1);

                            return (
                                <HOFEntry position={position} data={val} labelPoints={labelPoints} />
                            )
                        })}
                    </div>
                </>
            }
        </div>

    )

}
