import PenguinCard from "@/Components/User/PenguinCard";
import PodiumPenguin from "@/Components/User/PodiumPenguin";
import { Head } from "@inertiajs/react";
import GlobalLayout from "@/Layouts/GlobalLayout";
import '../../../css/appareance.css'
import BlueButton from "@/Components/Navigation/Buttons/BlueButton";
import GreenButton from "@/Components/Navigation/Buttons/GreenButton";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
export default function ProfileAppearance(props) {


    const twitch = props.auth.twitch;
    const tabs = [
        {
            key: "card",
            display: "Carte",
            sub: [
                {
                    key: "colorIcon",
                    display: "Couleur Icone"
                },
                {
                    key: "slogan",
                    display: "Slogan"
                },
                {
                    key: "backgroundCard",
                    display: "Fond de la carte"
                },
            ]
        },
        {
            key: "penguin",
            display: "Pingouin",
            sub: [
                {
                    key: "hat",
                    display: "Chapeau"
                },
                {
                    key: "equipment",
                    display: "Équipement"
                },
                {
                    key: "emote",
                    display: "Émote"
                },
                {
                    key: "decoration",
                    display: "Decoration"
                },
            ]
        }
    ]

    const [items, setItems] = useState([])

    const [cosmeticIDCurrent, setCosmeticIDCurrent] = useState(-1)
    const [colorIconCurrent, setColorIconCurrent] = useState({ key: "-1", style: "linear-gradient(180deg, #10A3F5 0%, #0B308E 100%)" });
    const [cosmeticsActive, setCosmeticsActive] = useState(props.activeCosmetics)
    const [cosmeticsCurrent, setCosmeticsCurrent] = useState([])
    const [tabCategory, setTabCategory] = useState("card")
    let tabCategoryCurrent = tabs.find((tab) => tab.key == tabCategory);

    useEffect(() => {
        let cosmeticsCurrentPre = [];
        cosmeticsActive.forEach((cosmetic) => {
            if(cosmetic.type == "card" && cosmetic.sub_type == "colorIcon") {
                setColorIconCurrent({ key: cosmetic.id, style: cosmetic.style })
            }
            cosmeticsCurrentPre.push({ id: cosmetic.id })
        })
        setCosmeticsCurrent(cosmeticsCurrentPre)
        console.log(cosmeticsActive)
    }, [cosmeticsActive])

    const changeSubtabCategory = async (subcategory) => {
        await axios.post(route('cosmetics.get'), { type: tabCategoryCurrent.key, sub_type: subcategory })
            .then((res) => {
                const data = res.data;
                if(data?.error !== undefined) return;
                setItems(res.data)
            })
            .catch((err) => {
                toast.error(err)
            })
    }

    const selectItem = (item) => {
        setCosmeticIDCurrent(item.id)
        let cosmetic = cosmeticsCurrent.find((cosm) => cosm.id == item.id)
        console.log(cosmeticsCurrent)
        if(item.type == "card") {
            if(item.sub_type == "colorIcon") {
                cosmetic.id = item.id
            }
        }
    }

    useEffect(() => {
        console.log(cosmeticsCurrent)
    }, [cosmeticsCurrent])

    return (
        <GlobalLayout>
            <Head title="Apparence" />
            <div className="appareance">
                <div className="head">
                    <div className="left">
                        <BlueButton routeName={"profile.index"}>Retour</BlueButton>
                    </div>
                    <div className="tabs_category">
                        <GreenButton onClick={() => { setTabCategory('card') }}>Carte</GreenButton>
                        <GreenButton onClick={() => { setTabCategory('penguin') }}>Pingouin</GreenButton>
                    </div>
                    <div className="right">
                        <GreenButton>Sauvegarder</GreenButton>
                    </div>
                </div>
                <div className="flex flex-1 gap-16">
                    <div className="current_appareance">
                        <PenguinCard colorIcon={colorIconCurrent.style} blankIcon={true} data={{ id: twitch.id, username: twitch.display_name }} />
                        <PodiumPenguin noRequest={true} penguinData={cosmeticsActive} data={{ userID: twitch.id }} />
                    </div>
                    <div className="cosmetics">
                        <div className="tabs">
                            {tabCategoryCurrent?.sub?.map((tab, key) => {
                                return (
                                    <div className="tab_link active" onClick={() => { changeSubtabCategory(tab.key) }} key={key}>{tab.display}</div>
                                )
                            })}
                        </div>
                        <div className="items">
                            {items?.map((item, key) => {
                                return (
                                    <div className={`item ${cosmeticIDCurrent == item.id && "active"}`} key={key} onClick={() => { selectItem(item) }}>
                                        {item.type == "card" && item.sub_type == "colorIcon" &&
                                            <>
                                                <div className="circleColor" style={{ background: item.style }} />
                                                <span>{item.name}</span>
                                            </>
                                        }
                                        {item.type == "penguin" && item.sub_type == "hat"  &&
                                            <div className="hat" dangerouslySetInnerHTML={{ __html: item.style }} />
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </GlobalLayout>
    )

}
