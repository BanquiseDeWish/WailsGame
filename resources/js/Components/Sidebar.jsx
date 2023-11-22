import { useState } from "react"
import BarMenuMobile from "@/Components/Icons/BarMenuMobile"
import { usePage, Link } from "@inertiajs/react"
import TwitchButton from "./Buttons/TwitchButton"
import AppLogo from "./AppLogo"

export default function Sidebar({ isWeils }) {

    const [show, setShow] = useState(false)
    const props = usePage().props
    const auth = props.auth.twitch

    return (
        <div className="navbar flex lg:hidden">
            <BarMenuMobile onClick={() => { setShow(true) }} fill={"white"} width={42} height={42} />
            <div onClick={() => { setShow(false) }} className={`backdrop ${show ? "show" : "hide"}`}></div>
            <aside className={`sidebar ${show ? "show" : "hide"}`}>
                <AppLogo />
                <div className="menu">
                    <div className="link store_merch">
                        <a href="/boutique/merch" target='_blank'>Boutique Merch</a>
                    </div>
                    <div className={`link ${window.location.href.startsWith(route('vipgames.index')) ? "active" : ""}`}>
                        <Link href={route('vipgames.index')}>VIPGames</Link>
                    </div>
                    <div className={`link ${window.location.href.startsWith(route('predigivre.halloffame', { filter: 'today' })) ? "active" : ""}`}>
                        <Link href={route('predigivre.halloffame', { filter: 'today' })}>Prédi Givrées</Link>
                    </div>
                </div>
                <div className="separator w-full"/>
                {props.auth.twitch ? (
                    <>
                        <div className="user flex gap-4 items-center text-white text-[14px] font-[500]">
                            <img width={40} height={40} style={{ borderRadius: 50 }} src={auth?.profile_image_url} alt="avatar_twitch" />
                            <span>{auth?.display_name}</span>
                        </div>
                        <div className="separator w-full"></div>
                        <div className="menu">
                            <Link href={route('profile.index')} className="link">
                                Profil
                            </Link>
                            {isWeils &&
                                <Link href={"/dashboard"} className="link">
                                    Espace privé
                                </Link>
                            }
                        </div>
                        <div className="separator w-full"></div>
                        <div className="menu">
                            <Link href={route('twitch.logout')} className="link">
                                Déconnexion
                            </Link>
                        </div>
                    </>
                ) : (
                    <TwitchButton />
                )}

            </aside>
        </div>
    )

}
