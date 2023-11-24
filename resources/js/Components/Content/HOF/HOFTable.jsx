import HOFEntry from "./HOFEntry";
import Penguin from "../../User/Penguin";
import PenguinCard from "../../User/PenguinCard";

import OnePol from "../../../../assets/img/hof/first.svg"
import TwoPol from "../../../../assets/img/hof/two.svg"
import ThreePol from "../../../../assets/img/hof/three.svg"
import '../../../../css/hof.css'

export default function HOFTable({ load, logoPos, logo, data, labelPoints }) {

    const pos1 = data.find((val, index) => index == 0)
    const pos2 = data.find((val, index) => index == 1)
    const pos3 = data.find((val, index) => index == 2)

    return (
        <div className="ranking min-h-[15rem] max-h-[30rem] xl:min-h-full xl:min-w-[800px]">
            <div className="hoftable">
                <div className="logo" style={{ top: logoPos + "px" }}><img src={logo} width={308} alt="" /></div>

                {load &&
                    <div className="flex justify-center items-center w-full h-full gap-4 text-white text-2xl">
                        <span class="loader"></span> Chargement des données
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
                            <div className="pos two flex-1">
                                <div className="pol"><img src={TwoPol} alt="two_pol" /></div>
                                <Penguin size={{ width: 84, height: 112 }} />
                                <div className="flex flex-col items-center">
                                    <PenguinCard data={{ username: pos2?.userName }} />
                                    <div className="display_points flex items-center justify-center gap-[4px]">
                                        <span className="text-white text-[18px] font-[500] leading-[normal]">{pos2?.points == undefined ? "N/A" : pos2?.points}</span>
                                        <div className="text-[#9799A7] text-[14px] font-[500] leading-[normal]">
                                            {labelPoints !== undefined ? pos2?.points !== undefined ? pos2?.points > 1 ? labelPoints?.plural : labelPoints?.singular : "" : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pos first flex-1">
                                <div className="pol"><img src={OnePol} alt="one_pol" /></div>
                                <Penguin size={{ width: 114, height: 156 }} />
                                <div className="flex flex-col items-center">
                                    <PenguinCard data={{ username: pos1?.userName }} />
                                    <div className="display_points flex items-center justify-center gap-[4px]">
                                        <span className="text-white text-[18px] font-[500] leading-[normal]">{pos1?.points == undefined ? "N/A" : pos1?.points}</span>
                                        <span className="text-[#9799A7] text-[14px] font-[500]">
                                            {labelPoints !== undefined ? pos1?.points !== undefined ? pos1?.points > 1 ? labelPoints?.plural : labelPoints?.singular : "" : ""}
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="pos three flex-1">
                                <div className="pol"><img src={ThreePol} alt="three_pol" /></div>
                                <Penguin size={{ width: 80, height: 110 }} />
                                <div className="flex flex-col items-center">
                                    <PenguinCard data={{ username: pos3?.userName }} />
                                    <div className="display_points flex items-center justify-center gap-[4px]">
                                        <span className="text-white text-[18px] font-[500] leading-[normal]">{pos3?.points == undefined ? "N/A" : pos3?.points}</span>
                                        <span className="text-[#9799A7] text-[14px] font-[500]">
                                            {labelPoints !== undefined ? pos3?.points !== undefined ? pos3?.points > 1 ? labelPoints?.plural : labelPoints?.singular : "" : ""}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="hidden xl:block separator"></div>
                        <div className="ttable hidden xl:flex">
                            {data?.map((val, index) => {

                                const position = (index + 1);

                                if (position > 3) {
                                    return (
                                        <HOFEntry position={position} data={val} labelPoints={labelPoints} />
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
        </div>

    )

}
