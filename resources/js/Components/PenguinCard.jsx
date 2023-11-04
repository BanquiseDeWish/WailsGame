import { usePage } from '@inertiajs/react';
import AvatarDefault from '../../assets/img/avatar_default.png'
import '../../css/penguinCard.css'

export default function PenguinCard({ data, className }) {

    const props = usePage().props;

    console.log(data)

    return (
        <div className={`penguinCard ${className}`} style={{ background: data?.background_type == "color" ? data?.background_data.color : "" }}>
            <div className="avatar">
                <img src={route('user.icon', { twitch_id: 0 })} alt="AvatarDefault" />
            </div>
            <div className="flex justify-between items-center w-full">
                <div className="data">
                    <div className="username">{ data?.username == undefined ? "N/A" : data?.username }</div>
                    <div className="description">{ data?.slogan == undefined ? "Un pingouin sans valeur" : data?.slogan }</div>
                </div>
                {data?.points !== undefined && <div className="points"><span className='text-[18px] font-[500]  leading-[normal]'>{data?.points}</span><span className="text-[#9799A7] text-[14px] font-[500] leading-[normal]">{data?.labelPoints !== undefined ? data?.labelPoints : "Victoires"}</span></div>}
            </div>
        </div>
    )

}
