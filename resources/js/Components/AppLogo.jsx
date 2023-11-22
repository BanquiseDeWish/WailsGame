import { Link } from '@inertiajs/react';
import AppLogoImg from '../../assets/logo.png';

export default function AppLogo({className, ...otherProps}) {

    return (
        <>
            <Link href={route('/')} className={`app_logo ${className}`} {...otherProps}>
                <img src={AppLogoImg} alt="Logo Pingouin de Weils" width={48}/>
                <div className="hidden lg:block">La Banquise de Weils</div>
            </Link>
            <style> {`
                .app_logo {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    gap: 16px;
                    color: white;
                    font-weight: 700;
                    font-family: Poppins;
                    font-size: 20px;
                }
            `}
            </style>
        </>
    );

}
