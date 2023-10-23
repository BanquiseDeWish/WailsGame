import SimpleButton from './SimpleButton';
import TwitchSVG from '../Svg/Icons/IconTwitch';

export default function TwitchButton({ disabled=false, ...props }) {
    return (
        <>
            <SimpleButton
                routeName='twitch.start'
                className='button_twitch'
                {...props}
            >
                <TwitchSVG/>
                <div>Se Connecter</div>
            </SimpleButton>
        </>
    );
}
