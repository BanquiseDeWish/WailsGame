import { Link, Head, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

import VipGames from '../../assets/games/vip_games_title.png'
import VipGamesCover from '../../assets/games/vip_games_cover.png'
import VipGamesCharacter from '../../assets/games/vip_games_character.png'

import MKGames from '../../assets/games/mario_kart_title.png'
import MKCover from '../../assets/games/mario_kart_cover.png'
import MKCharacter from '../../assets/games/mario_kart_character.png'

import BoutiqueMerchCover from '../../assets/img/boutique/boutique_merch_cover.png';
import BoutiqueMerchCharacter from '../../assets/img/boutique/boutique_merch_character.png';
import BoutiqueMerchTitle from '../../assets/img/boutique/boutique_merch_title.png';

import GameCard from '@/Components/GameCard';


export default function Welcome() {

    return (
        <>
            <MainLayout>
                <Head title="Accueil" />
                <div className='flex flex-row w-full h-full justify-center items-center'>
                    <GameCard route={route('vipgames.index')} titleImg={VipGames} characterImg={VipGamesCharacter} coverImg={VipGamesCover}/>
                    <GameCard route={route('predigivre.halloffame', {filter: 'today'})} titleImg={MKGames} characterImg={MKCharacter} coverImg={MKCover}/>
                    <GameCard href={'/boutique/merch'} titleImg={BoutiqueMerchTitle} characterImg={BoutiqueMerchCharacter} coverImg={BoutiqueMerchCover}/>
                </div>
            </MainLayout>
        </>
    );
}
