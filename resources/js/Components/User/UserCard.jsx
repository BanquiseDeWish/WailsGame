import { useEffect, useState } from 'react';
import '@css/userCard.css'
import PAWBadge from '../../../assets/img/paw.webp'
import 'react-tooltip/dist/react-tooltip.css'
import UserIcon from './UserIcon';

import { useValues } from '@/AppContext';

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
export default function UserCard({ className='', propsCosmetics, twitchId, data, skeleton = false, components = [], style = {} }) {

    const values = useValues();
    const [cosmetics, setCosmetics] = useState(propsCosmetics ?? values.getCosmetics(twitchId));

    useEffect(() => {
        if(skeleton) return;
        setCosmetics(propsCosmetics);
        
    }, [propsCosmetics, skeleton]);

    useEffect(() => {
        if(twitchId) {
            let cosmetics = values.getCosmetics(twitchId);
            if(cosmetics)
                setCosmetics(cosmetics);
        }
    }, [twitchId, values.update, skeleton])

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
        return (
            <div className={`${className} userCard p-[16px]`} style={{background: data?.background_style ?? cosmetics.card_background?.style, backgroundSize: 'cover', backgroundPosition: 'center', ...style}}>
                <UserIcon className="flex-shrink-0" propsCosmetics={cosmetics} width={data?.iconSize ?? 48}/>

                <div className="flex justify-between items-center flex-grow gap-[8px] overflow-hidden">
                    <div className="data flex flex-col flex-grow overflow-hidden">
                        <div className="username select-none truncate">{username}</div>
                        {(data?.drawSlogan == undefined || data?.drawSlogan) && <div className="description select-none truncate">{data?.customSlogan ?? cosmetics.slogan.name}</div>}
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

                {...components}
            </div>
        )
    }
}
