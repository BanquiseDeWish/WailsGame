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
                <AppLogo/>

                <SidebarSeparator/>

                <SidebarCategory>
                    <a href="/boutique/merch" target='_blank'>Boutique Merch</a>
                    <Link href={route('vipgames.index')}>VIPGames</Link>
                    <Link href={route('predigivre.halloffame', { filter: 'today' })}>Prédi Givrées</Link>
                    <Link href={route('kartchance.index')}>Kart Chance</Link>
                    <Link href={route('tierlist.index')}>Tierlist</Link>
                    <Link href={route('games.quizz.index')}>QuizzMaster</Link>
                </SidebarCategory>
            </SidebarContent>
        </Sidebar>
    )

}
