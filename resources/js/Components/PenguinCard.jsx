import { usePage } from '@inertiajs/react';
import AvatarDefault from '../../assets/img/avatar_default.png'

export default function PenguinCard() {

    const props = usePage().props;
    const auth = props.auth;
    const penguinCard = props.penguinCard;

    return (
        <div className="penguinCard" style={{ background: penguinCard?.background_type == "color" ? penguinCard?.background_data.color : "" }}>
            <div className="avatar">
                <img src={AvatarDefault} alt="AvatarDefault" />
            </div>
            <div className="data">
                <div className="username">{ auth.twitch.display_name }</div>
                <div className="description">{ penguinCard?.slogan == undefined ? "Un pingouin sans valeur" : penguinCard?.slogan }</div>
            </div>
        </div>
    )

}
