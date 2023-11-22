import { Link, router, usePage } from '@inertiajs/react';
import VIPGamesModal from "../Modal/VIPGamesModal";
import ProfileDropdown from "./ProfileDropdown";
import TwitchButton from "./Buttons/TwitchButton";
import '../../../css/navbar.css'
import LinkSidebar from '@/Components/Navigation/Sidebar/LinkSidebar';
import ProfileSidebar from './Sidebar/ProfileSidebar';

import AppLogo from '@/Components/AppLogo';

export default function Navbar() {

    const props = usePage().props;
    const isWeils = props.auth && props.auth.twitch && props.auth.twitch.id == props.weils_id;

    return (
        <>
            <div className="navbar flex flex-row w-full items-center justify-between p-4">
                <LinkSidebar className=""/>
                <AppLogo className="z-0"/>
                <ProfileSidebar className="" isWeils={isWeils}/>
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
                            <ProfileDropdown/>
                        </>
                    ) : (

                        <TwitchButton />
                    )}
                </div>
            </div>
        </>

    )

}
