import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import '@css/userCard.css'
import PAWBadge from '../../../assets/img/paw.webp'
import 'react-tooltip/dist/react-tooltip.css'
import UserIcon from './UserIcon';
import { toast } from 'sonner';


export default function UserCard({ className='', propsCosmetics, twitchId, data, skeleton = false, style = {} }) {

    const [cosmetics, setCosmetics] = useState(propsCosmetics);

    useEffect(() => {
        if(skeleton) return;
        if(!propsCosmetics && twitchId)
            getUserCosmetics();
        else
            setCosmetics(propsCosmetics);
        
    }, [propsCosmetics, skeleton, twitchId]);

    /**
     * Example data:
     * data = {
     *  username: string,
     *  slogan: string,
     *  points: int,
     *  labelPoints: {
     *     singular: string,
     *     plural: string
     *  },
     *  stylePoints: string,
     *  background_type: string,
     *  background_data: {
     *     color: string,
     *  },
     *  iconSize: int
     * }
     */

    function getUserCosmetics() {
        axios.get(route('user.cosmetics.active', {twitch_id: twitchId ?? 0})).then((res) => {
            if(res.data == null || res.data == undefined) return;
            if(res.data.error) return;
            setCosmetics(res.data);
        }).catch((err) => {
            toast.error('Une erreur est survenue lors de la récupération des cosmétiques.');
            console.log(err);
        });
    }

    let isPAW = false;

    let username = data?.username == undefined ? "N/A" : data?.username
    if (username.toUpperCase().startsWith('PAW_')) {
        //isPAW = true;
        //username = username.slice(4, username.length)
    }
    let stylePoints = data?.stylePoints !== undefined ? data.stylePoints : "default";
    let labelPoints = data?.labelPoints !== undefined ? data?.points !== undefined ? data?.points > 1 ? data?.labelPoints?.plural : data?.labelPoints?.singular : "" : "";


    if (skeleton) {
        return (
            <div className={`userCard p-[16px] ${className}`} style={{ background: data?.background_style ?? "", ...style }}>
                <span className={`w-[${data?.iconSize ?? 48}px] h-[${data?.iconSize ?? 48}px] rounded-full`} />

                <div className="flex justify-between items-center flex-grow gap-[8px] overflow-hidden">
                    <div className="data flex flex-col flex-grow overflow-hidden gap-1">
                        <div className="username select-none truncate bg-[#121A25] text-[#121A25] rounded-md">SKELETON</div>
                        <div className="description select-none truncate bg-[#121A25] text-[#121A25] rounded-md">SKELETON</div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        let background = cosmetics?.find(cosmetic => cosmetic.sub_type == "card_background")?.style;
        let slogan = cosmetics?.find(cosmetic => cosmetic.sub_type == "slogan")?.name ?? "Un pingouin voyageur";

        return (
            <div className={`${className} userCard p-[16px]`} style={{background: data?.background_style ?? background, ...style}}>
                <UserIcon className="flex-shrink-0" propsCosmetics={cosmetics} width={data?.iconSize ?? 48}/>

                <div className="flex justify-between items-center flex-grow gap-[8px] overflow-hidden">
                    <div className="data flex flex-col flex-grow overflow-hidden">
                        <div className="username select-none truncate">{username}</div>
                        <div className="description select-none truncate">{slogan}</div>
                    </div>
                    {data?.points !== undefined && stylePoints == "default" &&
                        <div className="points">
                            <span className='points_data text-[18px] font-[500]  leading-[normal]'>{data?.points}</span>
                            <span className="label_points text-[#9799A7] text-[14px] font-[500] leading-[normal]">{labelPoints}</span>
                        </div>
                    }
                    {data?.points !== undefined && stylePoints == "circle" &&
                        <div className="play_count_text">
                            <span className='text-[18px] font-[500]  leading-[normal]'>{data?.points}</span>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
