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
        <div className={`hof w-fit ${className}`}>
            <div className="logo" style={{ top: logoPos + "px" }}><img src={logo} width={308} alt="" /></div>

            {load &&
                <div className="flex justify-center items-center w-full h-full gap-4 text-white text-2xl">
                    <span className="loader"></span> Chargement des données
                </div>
            }

            {!load && data?.length == 0 &&
                <div className="flex justify-center items-center w-full h-full text-white text-2xl">
                    Aucune données
                </div>
            }

            {!load && data?.length !== 0 &&
                <>
                    <div className="podium w-full hidden xl:flex flex-wrap justify-between items-end">
                        <HoFPodium
                            data={{
                                topIcon: Second,
                                username: pos2?.userName,
                                labelPoints: labelPoints,
                                points: pos2?.points,
                                penguinWidth: 95
                            }}
                            style={{
                                background: 'linear-gradient(180deg, var(--container_background) 0%, #888 100%)'
                            }}
                        />
                        <HoFPodium
                            data={{
                                topIcon: First,
                                username: pos1?.userName,
                                labelPoints: labelPoints,
                                points: pos1?.points,
                                penguinWidth: 115
                            }}
                            style={{
                                background: 'linear-gradient(180deg, var(--container_background) 0%, #DCA130 100%)'
                            }}
                        />
                        <HoFPodium
                            data={{
                                topIcon: Third,
                                username: pos3?.userName,
                                labelPoints: labelPoints,
                                points: pos3?.points
                            }}
                            style={{
                                background: 'linear-gradient(180deg, var(--container_background) 0%, #AE6A38 100%)'
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
                                    <HOFEntry position={position} data={val} labelPoints={labelPoints} />
                                    <HOFEntry position={position} data={val} labelPoints={labelPoints} />
                                    <HOFEntry position={position} data={val} labelPoints={labelPoints} />
                                    </>
                                )
                            }
                        })}
                    </div>
                    <div className="ttable flex xl:hidden ">
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
