import Sidebar from "./Utils/Sidebar"
import { Link } from "@inertiajs/react"
import AppLogo from "../../AppLogo"

import SidebarOpener from "./Utils/SidebarOpener"
import SidebarContent from "./Utils/SidebarContent"

import BarMenuMobile from "@/Components/Icons/BarMenuMobile"

export default function AppearanceSidebar({ tabs, getCosmetics, activeTab, className, ...otherProps }) {

    return (
        <Sidebar className={className} {...otherProps}>
            <SidebarOpener>
                <BarMenuMobile fill={"white"} width={42} height={42} />
            </SidebarOpener>
            <SidebarContent>
                {
                    tabs.map((tab, _) => {
                        return (
                            <div key={tab.key} className="flex flex-col gap-4 w-full">
                                <span className="font-bold text-xl" key={tab.name}>{tab.name}</span>
                                <div className="flex flex-col ml-6">
                                    {tab.subtabs.map((subtab, _) => {
                                        return (
                                            <span className={`hover:bg-container transition-all p-3 w-full rounded-lg select-none ${activeTab === subtab.key && 'bg-container'}`}
                                                key={subtab.name}
                                                onClick={() => getCosmetics(tab.key, subtab.key)}
                                            >
                                                {subtab.name}
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })
                }
            </SidebarContent>
        </Sidebar>
    )

}
