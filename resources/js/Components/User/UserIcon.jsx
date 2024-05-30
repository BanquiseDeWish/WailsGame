import UserPenguin from "@/Components/User/UserPenguin";

export default function UserIcon({propsCosmetics, twitchId, width = 48, className, ...props}) {
    
    let background = propsCosmetics?.find(cosmetic => cosmetic.sub_type == "icon_background")?.style;

    return (
        <div className={`${className} relative rounded-full overflow-hidden flex items-start justify-center}`}
            style={{background: background ?? 'linear-gradient(99deg, #10A3F5 0%, #0B308E 100%)', width: width, height: width}}
        >
            <UserPenguin className="absolute flex-shrink-0 -top-[15%] -left-[36%] scale-[1.10]" propsCosmetics={propsCosmetics} twitchId={twitchId} width={width*1.45} />
        </div>
    )
}