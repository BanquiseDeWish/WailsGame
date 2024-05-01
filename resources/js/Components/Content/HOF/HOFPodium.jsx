import Penguin from "../../User/Penguin";
import PenguinCard from "../../User/PenguinCard";

export default function HoFPodium({ data, style }) {
    /**
     * Example data:
     * data = {
     *  topIcon: string,
     *  user_info: {
     *      user_id: int,
     *      user_name: string,
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
                    user_id={data?.user_info?.user_id}
                />

                <div className="flex w-full flex-col items-center">
                    <PenguinCard
                        data={{
                            user_id: data?.user_info?.user_id,
                            username: data?.user_info?.user_name,
                            background_type: "color",
                            background_data: {
                                color: "transparent",
                            },
                        }}
                    />

                    <div className="display_points flex items-center justify-center gap-[4px]">
                        <span className="text-white text-[18px] font-[500] leading-[normal]">{data?.points == undefined ? "N/A" : data?.points}</span>
                        <div className="text-[14px] font-[500] leading-[normal]">
                            {data?.labelPoints !== undefined ? data?.points !== undefined ? data?.points > 1 ? data?.labelPoints?.plural : data?.labelPoints?.singular : "" : ""}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
