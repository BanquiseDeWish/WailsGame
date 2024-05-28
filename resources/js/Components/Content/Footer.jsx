import { Link } from "@inertiajs/react";
import Discord from "../Icons/Discord";
import IconTwitch from "../Icons/IconTwitch";
import YT from "../Icons/YT";
import Tiktok from "../Icons/Tiktok";
import Twitter from "../Icons/Twitter";

export default function Footer() {

    return (
        <div className="footer">
            <div className="title">Mes réseaux</div>
            <div className="infos">
                <div className="networks flex-wrap lg:flex-nowrap">
                    <a target="_blank" href="https://dcord.banquisedeweils.fr">
                        <Discord width={52} height={52} />
                    </a>
                    <a target="_blank" href="https://twitch.tv/weilsttv">
                        <IconTwitch size={52} />
                    </a>
                    <a target="_blank" href="https://www.youtube.com/@weils1613">
                        <YT />
                    </a>
                    <a target="_blank" href="https://www.tiktok.com/@weilsiew">
                        <Tiktok />
                    </a>
                    <a target="_blank" href="https://twitter.com/WeilsGG">
                        <Twitter />
                    </a>
                </div>
                <div className="separator"></div>
                <div className="util_links flex-col items-center lg:flex-row lg:flex-start">
                    <span>© {new Date(Date.now()).getFullYear()} - Tous droits réservés</span>
                    <Link>
                        Politique de Confidentialité
                    </Link>
                    <Link href={route('legals.page', { page: 'mentions-legals' })}>
                        Mentions Légales
                    </Link>
                    <Link href={route('legals.page', { page: 'cgu' })}>
                        CGU
                    </Link>
                    <Link href={route('legals.page', { page: 'cgv' })}>
                        CGV
                    </Link>
                </div>
            </div>
        </div>
    )

}
