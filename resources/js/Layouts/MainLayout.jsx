import { Link, router, usePage } from '@inertiajs/react';
import GlobalLayout from "./GlobalLayout";
import EasterEggEars from '@/Components/EasterEggEars';
import AppLogo from '@/Components/AppLogo';

import TwitchButton from '../Components/Buttons/TwitchButton';
import RedButton from '@/Components/Buttons/RedButton';
import BlueButton from '@/Components/Buttons/BlueButton';

import VIPGamesModal from '@/Components/Modal/VIPGamesModal';
import ProfileDropdown from '@/Components/ProfileDropdown';
import Navbar from '@/Components/Navbar';

export default function MainLayout({ children }) {

    const props = usePage().props;
    const isWeils = props.auth && props.auth.twitch && props.auth.twitch.id == props.weils_id;

    console.log(window.location.href, route('predigivre.halloffame', { filter: 'today' }), window.location.href.startsWith(route('predigivre.halloffame', { filter: 'today' })))

    return (
        <>
            <GlobalLayout>
                <div className="relative flex flex-row w-full items-center justify-between p-8">
                    <AppLogo />
                    <Navbar />
                </div>
                <EasterEggEars />
                <div className="p-[64px] h-full relative z-[1]">
                    {children}
                </div>
            </GlobalLayout>
        </>
    );
}
