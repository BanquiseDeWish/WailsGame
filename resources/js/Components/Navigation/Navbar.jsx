import { Link, router, usePage } from '@inertiajs/react';
import VIPGamesModal from "../Modal/VIPGamesModal";
import ProfileDropdown from "./ProfileDropdown";
import TwitchButton from "./Buttons/TwitchButton";
import '../../../css/navbar.css'
import LinkSidebar from '@/Components/Navigation/Sidebar/LinkSidebar';
import ProfileSidebar from './Sidebar/ProfileSidebar';

import TwitchSVG from '@/Components/Icons/IconTwitch';

import AppLogo from '@/Components/AppLogo';

export default function Navbar() {

    const props = usePage().props;
    const isWeils = props.auth && props.auth.twitch && props.auth.twitch.id == props.weils_id;

    return (
        <>
            <div className="navbar flex flex-row w-full items-center justify-between p-4 flex-shrink-0 h-[93px]">
                <LinkSidebar className="" />
                <AppLogo className="z-0 absolute left-1/2 -translate-x-1/2 lg:flex lg:relative lg:left-auto lg:translate-x-0" />
                {
                    props.auth.twitch ? (
                        <ProfileSidebar className="" isWeils={isWeils} />
                    ) : (
                        <Link href={route('twitch.start')} className='flex items-center justify-center lg:hidden z-[0] gap-[8px] p-[12px] rounded-[8px]' style={{ background: 'linear-gradient(90deg, #8B5ABB 0%, #362565 100%)'
                        >
                            <TwitchSVG />
                        </Link>
                    )
                }
                <div className='hidden lg:flex flex-row justify-end items-center gap-4 w-fit'>
                    <div className="link store_merch">
                        <a href="/boutique/merch" target='_blank'>Boutique Merch</a>
                    </div>
                    <div className={`link ${window.location.href.startsWith(route('vipgames.index')) ? "active" : ""}`}>
                        <Link href={route('vipgames.index')}>VIPGames</Link>
                    </div>
                    <div className={`link ${window.location.href.startsWith(route('predigivre.halloffame', { filter: 'today' })) ? "active" : ""}`}>
                        <Link href={route('predigivre.halloffame', { filter: 'today' })}>Prédi Givrées</Link>
                    </div>
                    <div className={`link ${window.location.href.startsWith(route('kartchance.index')) ? "active" : ""}`}>
                        <Link href={route('kartchance.index')}>Kart Chance</Link>
                    </div>

                    {props.auth.twitch ? (
                        <>
                            {
                                route('vipgames.index') == window.location.href && isWeils ?
                                    (
                                        <>
                                            <VIPGamesModal />
                                        </>
                                    ) : (<></>)
                            }
                            <ProfileDropdown />
                        </>
                    ) : (
                            <TwitchButton />
                        )}
                </div>
            </div>
        </>

    )

}
