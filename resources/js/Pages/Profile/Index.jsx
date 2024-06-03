import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

import UserPenguin from "../../Components/User/UserPenguin";
import { useState } from "react";
import InformationsTab from "./Tabs/InformationsTab";
import PurchaseTab from "./Tabs/PurchaseTab";
import StatsTab from "./Tabs/StatsTab";

const tabs = [
    {
        key: 'infos',
        name: 'Informations',
        component: <InformationsTab />
    },
    {
        key: 'purchase',
        name: 'Historique d\'achats',
        component: <PurchaseTab />
    },
    {
        key: 'stats',
        name: 'Vos statistiques',
        component: <StatsTab />
    }
]

export default function ProfileIndex(props) {

    const [tab, setTab] = useState(tabs[0].key)

    const selectTab = (key) => {
        console.log(key)
        const tab = tabs.find(tab => tab.key === key)
        if (!tab) return;
        setTab(tab.key)

    }

    const TabItemProfile = ({ t }) => {
        return (
            <div class={`tab_item flex bg-container select-none cursor-pointer justify-center px-8 py-4 items-center w-fit h-[64px] text-[18px] font-bold ${t.key == tab ? "enable" : ""}`} onClick={() => { selectTab(t.key) }}>
                <span style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'center'
                }}>{t.name}</span>
            </div>
        )
    }

    const tabCurrent = tabs.find(t => t.key === tab)

    return (
        <MainLayout>
            <Head title="Profil" />
            <div className="bg-container flex flex-col rounded-lg w-full h-full overflow-hidden">
                <div className="flex gap-2 box-border overflow-x-auto">
                    {tabs.map((tab, _) => {
                        return <TabItemProfile key={tab.key} t={tab} />
                    })}
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-4 xl:py-0 xl:px-0">
                    {tabCurrent.component}
                </div>
            </div>
            <style>
                {`
                .tab_item {
                    position: relative;
                    border-radius: 4px;
                }
                .tab_item.enable::after {
                    position: absolute;
                    content: '';
                    display: flex;
                    background: #5DA9D4;
                    width: 85%;
                    height: 6px;
                    bottom: 0;
                    border-radius: 8px 8px 0px 0px;
                }
                `}
            </style>
        </MainLayout>
    )

}
