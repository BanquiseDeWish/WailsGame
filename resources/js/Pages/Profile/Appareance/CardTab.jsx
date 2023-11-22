import { useState, useEffect } from "react"
import ColorIcon from "./Card/ColorIcon";
import BgIcon from "./Card/BgIcon";
import Slogan from "./Card/Slogan";

export default function CardTab(props) {

    const [tabActive, setTabActive] = useState()
    const [appearance, setAppearance] = useState(props.appearance)

    const tabs = [
        {
            key: "colorIcon",
            component: <ColorIcon appearance={appearance} funcParent={props.func} />
        },
        {
            key: "slogan",
            component: <Slogan />
        },
        {
            key: "bgIcon",
            component: <BgIcon />
        }
    ];

    useEffect(() => {
        console.log(appearance)
    })

    const changeTab = (e) => {
       const domTabLink = e.currentTarget;
       const tabKey = domTabLink.getAttribute('data-tab-key');
       changeTabFromKey(tabKey)
    }

    const changeTabFromKey = (tabKey) => {
        const tab = tabs.find((tab) => tab.key == tabKey)
        if(tab == undefined) return;
        setTabActive(tab)
     }

    if(tabActive == undefined) changeTabFromKey('colorIcon')

    return (
        <div className="cardPenguin flex gap-[24px] flex-col">
            <div className="tabs">
                <div className={`tab_link ${tabActive?.key == "colorIcon" ? "active" : ""}`} onClick={changeTab} data-tab-key="colorIcon">
                    Couleur icone
                </div>
                <div className={`tab_link ${tabActive?.key == "slogan" ? "active" : ""}`} onClick={changeTab} data-tab-key="slogan">
                    Slogan
                </div>
                <div className={`tab_link ${tabActive?.key == "bgIcon" ? "active" : ""}`} onClick={changeTab} data-tab-key="bgIcon">
                    Fond de la carte
                </div>
            </div>
            <div className="content">
                {tabActive?.component}
            </div>
        </div>
    )

}
