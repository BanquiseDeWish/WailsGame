import { usePage } from '@inertiajs/react';
import GlobalLayout from "./GlobalLayout";
import EasterEggEars from '@/Components/EasterEggEars';
import AppLogo from '@/Components/AppLogo';

import TwitchButton from '../Components/Buttons/TwitchButton';
import RedButton from '@/Components/Buttons/RedButton';
import BlueButton from '@/Components/Buttons/BlueButton';

import VIPGamesModal from '@/Components/Modal/VIPGamesModal';

export default function MainLayout({ children }) {

    const props = usePage().props;
    const isWeils = props.auth && props.auth.twitch && props.auth.twitch.id == props.weils_id;

    return (
        <>
            <GlobalLayout>
                <div className="flex flex-row w-full items-center justify-between p-8">
                    <AppLogo/>
                    {props.auth.twitch ? (
                        <>
                            <div className='flex flex-row justify-end items-end gap-4 w-fit'>
                                {
                                    route('vipgames.index') == window.location.href && isWeils ?
                                    (
                                        <>
                                            <VIPGamesModal/>
                                        </>
                                    ) : ( <></> )
                                }
                                <BlueButton routeName={'profile.index'}>Profil</BlueButton>
                                {
                                    isWeils ? (
                                        <RedButton routeName='dashboard'>Espace Privé</RedButton>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                        </>
                    ) : (
                        <>
                            <TwitchButton />
                        </>
                    )}
                </div>
                <EasterEggEars />
                {children}
            </GlobalLayout>
        </>
    );
}
