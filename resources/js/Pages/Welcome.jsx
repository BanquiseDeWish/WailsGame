import { Link, Head, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

import VipGames from '../../assets/games/vip_games_title.png'
import VipGamesCover from '../../assets/games/vip_games_cover.png'
import VipGamesCharacter from '../../assets/games/vip_games_character.png'

import MKGames from '../../assets/games/mario_kart_title.png'
import MKCover from '../../assets/games/mario_kart_cover.png'
import MKCharacter from '../../assets/games/mario_kart_character.png'

import GameCard from '@/Components/GameCard';


export default function Welcome() {

    const props = usePage().props
    console.log(props)

    return (
        <>
            <MainLayout>
                <Head title="Accueil" />
                <div className='flex flex-row w-full h-full justify-center items-center'>
                    <GameCard route={route('games.show', 'vipgames')} titleImg={VipGames} characterImg={VipGamesCharacter} coverImg={VipGamesCover}/>
                    <GameCard route={route('predigivre.halloffame', {filter: 'today'})} titleImg={MKGames} characterImg={MKCharacter} coverImg={MKCover}/>
                </div>
            </MainLayout>
        </>
    );
}
