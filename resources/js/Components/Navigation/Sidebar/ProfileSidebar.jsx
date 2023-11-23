import { usePage, Link } from "@inertiajs/react"
import TwitchButton from "../Buttons/TwitchButton"
import Sidebar from "./Utils/Sidebar"

import SidebarOpener from "./Utils/SidebarOpener"
import SidebarContent from "./Utils/SidebarContent"
import SidebarSeparator from "./Utils/SidebarSeparator"
import SidebarCategory from "./Utils/SidebarCategory"

export default function ProfileSidebar({ isWeils, className, ...otherProps }) {

    const props = usePage().props;
    const auth = props.auth.twitch;

    return (
        <Sidebar className={className} {...otherProps} left={false}>
            <SidebarOpener>
                <img width={56} height={56} style={{ borderRadius: 50 }} src={auth?.profile_image_url} alt="avatar_twitch" />
            </SidebarOpener>

            <SidebarContent>
                <SidebarCategory>
                    <div className="user flex gap-4 items-center text-white text-[14px] font-[500]">
                        <img width={40} height={40} style={{ borderRadius: 50 }} src={auth?.profile_image_url} alt="avatar_twitch" />
                        <span>{auth?.display_name}</span>
                    </div>
                </SidebarCategory>

                <SidebarSeparator />

                <SidebarCategory>
                    <Link href={route('profile.index')}>
                        Profil
                    </Link>
                    {isWeils &&
                        <Link href={"/dashboard"}>
                            Espace privé
                        </Link>
                    }
                </SidebarCategory>

                <SidebarSeparator />

                <SidebarCategory>
                    <Link href={route('twitch.logout')} className="link">
                        Déconnexion
                    </Link>
                </SidebarCategory>
            </SidebarContent>
        </Sidebar>
    )

}
