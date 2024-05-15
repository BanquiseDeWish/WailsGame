import UserCard from "../../User/UserCard";

export default function HoFEntry({ position, data, labelPoints, cosmetics }) {

    return (
        <div className="entry">
            <div className="w-[32px] xl:w-[64px] flex justify-center items-center text-[#adb7c9] text-[14px] font-medium">{ position }</div>
            <UserCard
                propsCosmetics={cosmetics}
                data={{
                    iconSize: 32,
                    userID: data?.user_id,
                    username: data?.user_name,
                    points: data?.points,
                    labelPoints: labelPoints,
                    stylePoints: "default",
                    background_style: "transparent"
                }}
            />
        </div>
    )

}
