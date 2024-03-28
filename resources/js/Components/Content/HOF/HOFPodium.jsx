import Penguin from "../../User/Penguin";
import PenguinCard from "../../User/PenguinCard";

export default function HoFPodium({ data, style }) {
    /**
     * Example data:
     * data = {
     *  topIcon: string,
     *  userInfo: {
     *      user_id: int,
     *      userName: string,
     *      points: int
     *  },
     *  labelPoints: {
     *    singular: string,
     *    plural: string
     *  }
     * }
     */

    return (
        <>
            <div className="podium-position" style={style}>
                {
                    data?.topIcon != undefined && (
                    <div className="absolute top-[8px] left-[8px]">
                        <img src={data?.topIcon} alt="Position Icon" />
                    </div>)
                }
                <Penguin
                    size={{  width: data?.penguinWidth ? data?.penguinWidth : 84 }}
                    user_id={data?.userInfo?.user_id}
                />

                <div className="flex w-full flex-col items-center">
                    <PenguinCard
                        data={{
                            userID: data?.userInfo?.user_id,
                            username: data?.userInfo?.userName,
                            background_type: "color",
                            background_data: {
                                color: "transparent",
                            },
                        }}
                    />

                    <div className="display_points flex items-center justify-center gap-[4px]">
                        <span className="text-white text-[18px] font-[500] leading-[normal]">{data?.userInfo?.points == undefined ? "N/A" : data?.userInfo?.points}</span>
                        <div className="text-[#9799A7] text-[14px] font-[500] leading-[normal]">
                            {data?.labelPoints !== undefined ? data?.userInfo?.points !== undefined ? data?.userInfo?.points > 1 ? data?.labelPoints?.plural : data?.labelPoints?.singular : "" : ""}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
