import PenguinCard from "../../User/PenguinCard";

export default function HoFEntry({ position, data, labelPoints }) {

    return (
        <div className="entry">
            <div className="w-[32px] xl:w-[64px] flex justify-center items-center text-[#adb7c9] text-[14px] font-medium">{ position }</div>
            <PenguinCard
                data={{
                    iconSize: 32,
                    userID: data?.user_id,
                    username: data?.user_name,
                    points: data?.points,
                    labelPoints: labelPoints,
                    stylePoints: "default",
                    background_type: "color",
                    background_data: {
                        color: "transparent",
                    },
                }}
            />
        </div>
    )

}
