import { Link, Head } from '@inertiajs/react';
import LogInButton from '@/Components/Buttons/LogInButton';
import GlobalLayout from '@/Layouts/GlobalLayout';
import KoolButton from '@/Components/Buttons/KoolButton';

import VipGames from '../../assets/games/vip_games_title.png'
import VipGamesCover from '../../assets/games/vip_games_cover.png'
import VipGamesCharacter from '../../assets/games/vip_games_character.png'

import MKGames from '../../assets/games/mario_kart_title.png'
import MKCover from '../../assets/games/mario_kart_cover.png'
import MKCharacter from '../../assets/games/mario_kart_character.png'

import GameCard from '@/Components/GameCard';


export default function Welcome({ auth }) {
    console.log(auth);
    return (
        <>
            <GlobalLayout>
                <Head title="Accueil" />
                {auth.twitch ? (
                    <>
                        <div className="flex flex-row w-full items-center justify-end p-8">
                            <KoolButton routeName='dashboard'>Espace Privé</KoolButton>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-row w-full items-center justify-end p-8">
                            <LogInButton/>
                        </div>
                    </>

                )}
                <div className='flex flex-row w-full h-full justify-center items-center'>
                    <GameCard routeName={'games.vipgames'} titleImg={VipGames} characterImg={VipGamesCharacter} coverImg={VipGamesCover}/>
                    <GameCard routeName={'games.mariokart'} titleImg={MKGames} characterImg={MKCharacter} coverImg={MKCover}/>
                </div>
            </GlobalLayout>
        </>
    );
}
