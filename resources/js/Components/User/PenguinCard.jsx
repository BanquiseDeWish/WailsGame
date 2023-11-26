import { usePage } from '@inertiajs/react';
import '../../../css/penguinCard.css'
import PAWBadge from '../../../assets/img/paw.webp'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export default function PenguinCard({ data, className }) {
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

    const props = usePage().props;

    let isPAW = false;
    let username = data?.username == undefined ? "N/A" : data?.username
    if(username.toUpperCase().startsWith('PAW_')) {
        //isPAW = true;
        //username = username.slice(4, username.length)
    }
    let stylePoints = data?.stylePoints !== undefined ? data.stylePoints : "default";
    let labelPoints = data?.labelPoints !== undefined ? data?.points !== undefined ? data?.points > 1 ? data?.labelPoints?.plural : data?.labelPoints?.singular : "" : "";

    return (
        <div className={`penguinCard p-[16px] ${className}`} style={{ background: data?.background_type == "color" ? data?.background_data.color : "" }}>
            <img
                src={route('user.icon', { twitch_id: data?.id == undefined ? 0 : data?.id })}
                width={data?.iconSize == undefined ? 40 : data?.iconSize}
                alt="AvatarDefault"
                className='rounded-full'
            />
            
            <div className="flex justify-between items-center flex-grow gap-[8px] overflow-hidden">
                <div className="data flex flex-col flex-grow overflow-hidden">
                    <div className="username select-none truncate">{ username }</div>
                    <div className="description select-none truncate">{ data?.slogan == undefined ? "Un pingouin voyageur" : data?.slogan }</div>
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
