import { Link, Head, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

import WeilsText from '@/Components/Icons/WeilsText';
import WeilsLogo from '@/Components/Icons/WeilsLogo';
import { useEffect, useState } from 'react';
import env from '../../../env.json'
import Eye from '@/Components/Icons/Eye';

export default function Welcome() {

    const [onLive, setOnLive] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        axios.get(env.socketServer + "/stream")
            .then((resp) => {
                setOnLive(resp?.data?.on_live)
                setCounter(resp?.data?.counter)
            })
    }, [])

    /*<div className='flex flex-row w-full h-full justify-center items-center'>
            <GameCard route={route('vipgames.index')} titleImg={VipGames} characterImg={VipGamesCharacter} coverImg={VipGamesCover}/>
            <GameCard route={route('predigivre.halloffame', {filter: 'today'})} titleImg={MKGames} characterImg={MKCharacter} coverImg={MKCover}/>
            <GameCard href={'/boutique/merch'} titleImg={BoutiqueMerchTitle} characterImg={BoutiqueMerchCharacter} coverImg={BoutiqueMerchCover}/>
        </div>*/

    return (
        <>
            <MainLayout>
                <Head title="Accueil" />
                <div className="flex flex-col items-center">
                    <WeilsText className="w-[940px] h-[132px]" />
                    <WeilsLogo p1="gold_0" p2="gold_1" className="mt-[-45px] w-[352px] h-[380px]" />
                </div>
                <div className="flex justify-center">
                    <a href="https://twitch.tv/weilsttv" target="_blank" className={`badge_state_live ${onLive ? "on" : "off"}`}>
                        <div className="flex gap-[16px] items-center">
                            <span className="state" />
                            <span className='flex items-center gap-4'>
                                {onLive ? "En Stream" : "Hors Stream"}
                                {onLive && ( <div className="flex items-center gap-2"><Eye /> {counter}</div> ) }
                            </span>
                        </div>
                    </a>
                </div>
            </MainLayout>
        </>
    );
}
