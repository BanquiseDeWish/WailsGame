import { Link } from '@inertiajs/react';
import IconTwitch from '../Svg/Icons/IconTwitch';

export default function LogInButton({ className = '', disabled, children, ...props }) {
    return (
        <>
            <span className='login_button'>
                <Link
                    href={route('twitch.start')}
                    className='flex row gap-4 align-center justify-center'
                >
                    <IconTwitch />
                    <span>Se Connecter</span>
                </Link>
                <span className='login_button_bottom'></span>
            </span>

            <style>
                {`

                .login_button {
                    display: block;
                    width: 260px;
                    height: 64px;
                }

                .login_button a {
                    background-color: #9146FF;
                    border-radius: 8px;
                    display: inline-flex;
                    padding: 16px 32px;
                    justify-content: center;
                    align-items: center;
                    gap: 16px;
                    width: 100%;
                    height: 100%;                    

                    color: #FFFFFF;
                    font-family: Poppins;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: normal;
                    transform: translate(0px, -10px);
                    transition: 0.25s;
                }

                .login_button a:hover {
                    transform: translate(0px, -4px);
                    transition: 0.25s;
                }

                .login_button_bottom {
                    z-index: -1;
                    position: absolute;
                    content: '';
                    width: inherit;
                    height: inherit;
                    background: #5B2D9F;
                    border-radius: 8px;
                    display: block;
                    transform: translate(0, -64px);
                }
            `}
            </style>
        </>
    );
}
