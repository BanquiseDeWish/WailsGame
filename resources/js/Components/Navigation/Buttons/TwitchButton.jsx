import SimpleButton from './SimpleButton';
import TwitchSVG from '../../Icons/IconTwitch';

export default function TwitchButton({ disabled=false, ...otherProps }) {
    return (
        <>
            <SimpleButton
                routeName='twitch.start'
                className='button_twitch'
                {...otherProps}
            >
                <TwitchSVG/>
                <div>Se Connecter</div>
            </SimpleButton>
        </>
    );
}
