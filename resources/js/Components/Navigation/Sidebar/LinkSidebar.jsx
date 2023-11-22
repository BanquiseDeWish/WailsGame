import Sidebar from "./Utils/Sidebar"
import { Link } from "@inertiajs/react"
import AppLogo from "../../AppLogo"

import SidebarOpener from "./Utils/SidebarOpener"
import SidebarContent from "./Utils/SidebarContent"
import SidebarSeparator from "./Utils/SidebarSeparator"
import SidebarCategory from "./Utils/SidebarCategory"

import BarMenuMobile from "@/Components/Icons/BarMenuMobile"

export default function LinkSidebar({className, ...otherProps}) {

    return (
        <Sidebar className={className} {...otherProps}>
            <SidebarOpener>
                <BarMenuMobile fill={"white"} width={42} height={42} />
            </SidebarOpener>
            <SidebarContent>
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
            </SidebarContent>
        </Sidebar>
    )

}
