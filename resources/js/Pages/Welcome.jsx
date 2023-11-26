import { Link, Head, usePage } from '@inertiajs/react';
import MainLayoutWF from '@/Layouts/MainLayoutWF';
import WeilsText from '@/Components/Icons/WeilsText';
import WeilsLogoSVG from '../../assets/img/weils_logo_mobile.svg';
import WeilsLogo from '@/Components/Icons/WeilsLogo';
import { useEffect, useState } from 'react';
import '../../css/home.css'
import env from '../../../env.json'
import Eye from '@/Components/Icons/Eye';
import StoreThumbnail from '../../assets/img/home/store.png'
import StoreArtefact from '../../assets/img/boutique/boutique_merch_character.png'
import VIPGamesLogo from '../../assets/img/home/vip_games.svg'
import VIPGamesThumbnail from '../../assets/img/home/vip_games_thumbnail.png'
import VIPGamesArtefact from '../../assets/games/vip_games_character.png'
import PGLogo from '../../assets/img/home/pg.svg'
import PGThumbnail from '../../assets/img/home/pg_thumbnail.png'
import PGArtefact from '../../assets/games/mario_kart_character.png'
import SectionHome from '@/Components/Content/SectionHome';
import WidgetDiscord from '@/Components/Content/WidgetDiscord';
import BadgeStream from '@/Components/Content/BadgeStream';

export default function Welcome() {

    const [onLive, setOnLive] = useState(false);
    const [counter, setCounter] = useState(0);
    const [discordData, setDiscordData] = useState(undefined)

    let urlDiscordWidget = "https://discord.com/api/guilds/722862220458983495/widget.json"

    useEffect(() => {
        axios.get(env.socketServer + "/stream")
            .then((resp) => {
                setOnLive(resp?.data?.on_live)
                setCounter(resp?.data?.counter)
            })

        axios.get(urlDiscordWidget)
            .then((resp) => {
                setDiscordData(resp?.data)
            })
    }, [])

    /*<div className='flex flex-row w-full h-full justify-center items-center'>
        <GameCard route={route('vipgames.index')} titleImg={VipGames} characterImg={VipGamesCharacter} coverImg={VipGamesCover}/>
        <GameCard route={route('predigivre.halloffame', {filter: 'today'})} titleImg={MKGames} characterImg={MKCharacter} coverImg={MKCover}/>
        <GameCard href={'/boutique/merch'} titleImg={BoutiqueMerchTitle} characterImg={BoutiqueMerchCharacter} coverImg={BoutiqueMerchCover}/>
    </div>*/

    return (
        <>
            <MainLayoutWF>
                <Head title="Accueil" />
                <div className="relative flex flex-col py-[64px] justify-center gap-[70px] lg:gap-0 lg:justify-between" style={{ height: "calc(100dvh - 93px)" }}>
                    <div className="flex lg:hidden flex-col items-center">
                        <img src={WeilsLogoSVG} className='px-[32px] w-[80%]' />
                    </div>
                    <div className="hidden lg:flex flex-col items-center">
                        <WeilsText className="w-[940px] h-[132px]" />
                        <WeilsLogo p1="gold_0" p2="gold_1" className="mt-[-45px] w-[352px] h-[380px]" />
                    </div>
                    <BadgeStream onLive={onLive} counter={counter} />
                    <WidgetDiscord discordData={discordData} />
                </div>
                <SectionHome
                    id="store"
                    filled
                    thumbnailSection={StoreThumbnail}
                    TextLogo="Weils'tore !"
                    ContentTitle="Découvrez le Weils’tore !"
                    TextButton="Aller vers la boutique"
                    UrlButton={{ url: "boutique.merch" }}
                    ArtefactPicture={StoreArtefact}
                >
                    Tu veux être habillé à la pointe de la mode ? Sur le Weils'tore je propose divers produits, allant d'un simple t-shirt à un sweat en passant par une magnifique tasse. Tous arborant notre logo, un pingouin aussi splendide que toi !
                    <p>Et comme je le fais en live, <i><b>*glup*</b></i> <i><b>*glup*</b></i> tasse dispo sur la boutique !</p>
                </SectionHome>
                <SectionHome
                    id="vipgames"
                    reverse
                    thumbnailSection={VIPGamesThumbnail}
                    PictureLogo={VIPGamesLogo}
                    ContentTitle="Devenez VIP en jouant avec la communauté !"
                    TextButton="Voir le Hall of Fame"
                    UrlButton={{ url: 'vipgames.index' }}
                    ArtefactPicture={VIPGamesArtefact}
                >
                    VIPGames vous permet de gagner un badge VIP pendant une semaine ! C’est simple, un tableau contenant 100 numéros est affiché, avec deux roues, une pour les joueurs et l’autre le nombre de tentatives. Si vous êtes choisis par la sainte roue, vous devez choisir parmi les 100 numéros et tomber sur le numéro gagnant ! Des bonus sont à découvrir en jeu pour vous aider à maximiser vos chances de réussite !
                </SectionHome>
                <SectionHome
                    id="pg"
                    filled
                    thumbnailSection={PGThumbnail}
                    PictureLogo={PGLogo}
                    ContentTitle="Les prédictions givrées"
                    TextButton="Voir le Hall of Fame"
                    UrlButton={{ url: 'predigivre.halloffame', extra: { filter: 'today' } }}
                    ArtefactPicture={PGArtefact}
                >
                    Pendant les parties de Mario Kart, au début de chaque course, on lance une prédiction sur ma position à la fin de la course ! Prédisez ma position et si vous tombez sur le chiffre exact, vous gagnez des points !
                    Mais si vous votez une position au-dessus ou en dessous, vous en gagnez également ! Ces points sont visibles dans le Hall of Fame disponible ci-dessous.
                </SectionHome>
            </MainLayoutWF>
        </>
    );
}
