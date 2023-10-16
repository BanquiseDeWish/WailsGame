import { Link } from '@inertiajs/react';

export default function KoolButton({ children, routeName, color1='#4690FF', color2='#2D5B9F', className = '', disabled, ...props }) {
    return (
        <>
            <span className='kool_button'>
                <Link
                    href={route(routeName)}
                    className='flex row gap-4 align-center justify-center'
                >
                    <span>{children}</span>
                </Link>
                <span className='kool_button_bottom'></span>
            </span>

            <style>
                {`

                .kool_button {
                    display: block;
                    width: 260px;
                    height: 64px;
                }

                .kool_button a {
                    background-color: `}{color1}{`;
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

                .kool_button a:hover {
                    transform: translate(0px, -4px);
                    transition: 0.25s;
                }

                .kool_button_bottom {
                    z-index: -1;
                    position: absolute;
                    content: '';
                    width: inherit;
                    height: inherit;
                    background: `}{color2}{`;
                    border-radius: 8px;
                    display: block;
                    transform: translate(0, -64px);
                }
            `}
            </style>
        </>
    );
}
