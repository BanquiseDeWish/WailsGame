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
                    <Link>
                        <Discord />
                    </Link>
                    <Link>
                        <IconTwitch size={52} />
                    </Link>
                    <Link>
                        <YT />
                    </Link>
                    <Link>
                        <Tiktok />
                    </Link>
                    <Link>
                        <Twitter />
                    </Link>
                </div>
                <div className="separator"></div>
                <div className="util_links flex-col items-center lg:flex-row lg:flex-start">
                    <span>© 2023 - Tous droits réservés</span>
                    <Link>
                        Politique de Confidentialité
                    </Link>
                    <Link>
                        Mentions Légales
                    </Link>
                    <Link>
                        CGU
                    </Link>
                    <Link>
                        CGV
                    </Link>
                </div>
            </div>
        </div>
    )

}
