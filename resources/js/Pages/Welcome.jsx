import { Link, Head, usePage } from '@inertiajs/react';
import MainLayoutWF from '@/Layouts/MainLayoutWF';
import WeilsText from '@/Components/Icons/WeilsText';
import WeilsLogo from '@/Components/Icons/WeilsLogo';
import Discord from '@/Components/Icons/Discord';
import { useEffect, useState } from 'react';
import '../../css/home.css'
import env from '../../../env.json'
import Eye from '@/Components/Icons/Eye';
import StoreThumbnail from '../../assets/img/home/store.png'
import VIPGamesLogo from '../../assets/img/home/vip_games.svg'
import VIPGamesThumbnail from '../../assets/img/home/vip_games_thumbnail.png'
import PGLogo from '../../assets/img/home/pg.svg'
import PGThumbnail from '../../assets/img/home/pg_thumbnail.png'
import GreenButton from '@/Components/Navigation/Buttons/GreenButton';
import SectionHome from '@/Components/Content/SectionHome';

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
                <div className="relative flex flex-col py-[64px] justify-between" style={{ height: "calc(100dvh - 93px)" }}>
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
                                    {onLive && (<div className="flex items-center gap-2"><Eye /> {counter}</div>)}
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="discord hidden lg:flex">
                        <div className="head">
                            <Discord width={32} height={32} />
                            <span className="title">Rejoignez la communauté sur Discord !</span>
                        </div>
                        <div className="list">
                            {discordData !== undefined &&
                                discordData?.members?.map((member, index) => {
                                    return (
                                        <div key={index} className="user">
                                            <div className="avatar"><img src={member?.avatar_url} alt="avatar_discord" /></div>
                                            <div className="infos">
                                                <div className="username">{member?.username}</div>
                                                <div className="state">{member?.status}{member?.game !== undefined ? ` - ${member?.game?.name}` : ""}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="actions">
                            <a className='join' href="https://dcord.banquisedeweils.fr">Rejoindre le discord</a>
                        </div>
                    </div>
                </div>
                <SectionHome
                    id="store"
                    filled
                    thumbnailSection={StoreThumbnail}
                    TextLogo="Weils'tore !"
                    ContentTitle="Découvrez le Weils’tore !"
                    TextButton="Aller vers la boutique"
                >
                    Lorem ipsum dolor sit amet et dolore eos. Vulputate est feugiat sit et erat consequat et at sed.  Sadipscing clita ut eirmod sadipscing augue ipsum illum ipsum amet adipiscing duo diam. Est erat eum ea voluptua consetetur.  Aliquyam lorem lobortis odio vel duo ipsum et. Diam clita in rebum diam lorem in dolor labore. Stet kasd clita elitr gubergren est assum gubergren diam.
                    Tempor lorem ipsum sit augue stet stet amet consequat erat amet sit nostrud in.
                </SectionHome>
                <SectionHome
                    id="vipgames"
                    reverse
                    thumbnailSection={VIPGamesThumbnail}
                    PictureLogo={VIPGamesLogo}
                    ContentTitle="Devenez VIP en jouant avec la communauté !"
                    TextButton="Voir le Hall of Fame"
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
                >
                    Pendant les parties de Mario Kart, au début de chaque course, on lance une prédiction sur ma position à la fin de la course ! Prédisez ma position et si vous tombez sur le chiffre exact, vous gagnez des points !
                    Mais si vous votez une position au-dessus ou en dessous, vous en gagnez également ! Ces points sont visibles dans le Hall of Fame disponible ci-dessous.
                </SectionHome>
            </MainLayoutWF>
        </>
    );
}
