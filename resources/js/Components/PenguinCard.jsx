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
            <div className="data">
                <div className="username">{ data.username }</div>
                <div className="description">{ data?.slogan == undefined ? "Un pingouin sans valeur" : data?.slogan }</div>
            </div>
        </div>
    )

}
