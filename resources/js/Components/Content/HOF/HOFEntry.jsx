import UserCard from "../../User/UserCard";

export default function HoFEntry({ position, data, labelPoints }) {

    return (
        <div className="entry">
            <div className="w-[32px] xl:w-[64px] flex justify-center items-center text-[#adb7c9] text-[14px] font-medium">{ position }</div>
            <UserCard
                twitchId={data?.user_id}
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
