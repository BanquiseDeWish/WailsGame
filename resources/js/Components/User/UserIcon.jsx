import UserPenguin from "@/Components/User/UserPenguin";

export default function UserIcon({propsCosmetics, width = 48}) {
    
    let background = propsCosmetics.find(cosmetic => cosmetic.sub_type == "icon_background")?.style;

    return (
        <div className={`w-[${width}px] h-[${width}px] rounded-full bg-container overflow-hidden flex items-start justify-center`}
            style={{background: background}}    
        >
            <UserPenguin className="flex-shrink-0" propsCosmetics={propsCosmetics} width={width*1.1} />
        </div>
    )
}