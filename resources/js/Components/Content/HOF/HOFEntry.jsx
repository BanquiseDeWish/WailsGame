import PenguinCard from "../../User/PenguinCard";

export default function HoFEntry({ position, data, labelPoints }) {

    return (
        <div className="entry">
            <div className="w-[32px] xl:w-[64px] flex justify-center items-center text-[#B4B4B4] text-[14px] font-medium">{ position }</div>
            <PenguinCard
                data={{
                    iconSize: 32,
                    username: data?.userName,
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
