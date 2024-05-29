import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import '@css/page/profile/appearance/appareance.css'
import UserPenguin from "@/Components/User/UserPenguin";
import UserCard from "@/Components/User/UserCard";
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import axios from "axios";
import BlueButton from "@/Components/Navigation/Buttons/BlueButton";
import UserIcon from "@/Components/User/UserIcon";
import AppearanceSidebar from "@/Components/Navigation/Sidebar/AppearanceSidebar";
import CosmeticList from "./Appearance/CosmeticList";


export default function ProfileAppearance(props) {

    const [mainTab, setMainTab] = useState('penguin');
    const [activeTab, setActiveTab] = useState('hat');
    const [cosmetics, setCosmetics] = useState(undefined);
    const [activeCosmetics, setActiveCosmetics] = useState(props.activeCosmetics);
    const twitch = props.auth.twitch;

    const tabs = [
        {
            name: 'Pingouin',
            key: 'penguin',
            subtabs: [
                {
                    name: 'Chapeaux',
                    key: 'hat',
                    active: true
                },
                {
                    name: 'Sacs à Dos',
                    key: 'backpack',
                    active: false
                },
                {
                    name: 'Accessoires',
                    key: 'accessory',
                    active: false
                },
                {
                    name: 'Couleurs',
                    key: 'penguin_color',
                    active: true
                },
                {
                    name: 'Yeux',
                    key: 'penguin_eye',
                    active: true
                },
                {
                    name: 'Becs',
                    key: 'penguin_beak',
                    active: false
                },
                {
                    name: 'Queue',
                    key: 'penguin_tail',
                    active: true
                },
            ]
        },
        {
            name: 'Carte',
            key: 'card',
            subtabs: [
                {
                    name: 'Fond d\'Icone',
                    key: 'icon_background',
                    active: true
                },
                {
                    name: 'Slogan',
                    key: 'slogan',
                    active: true
                },
                {
                    name: 'Fond de Carte',
                    key: 'card_background',
                    active: true
                }
            ]
        }
    ]

    function getCosmetics(type, subtype) {
        setCosmetics(undefined);
        setMainTab(type);
        setActiveTab(subtype);
        let userCosmetics = [];
        // Get user cosmetics
        axios.get(route('user.cosmetics.all', { twitch_id: twitch.id }), {
            params: {
                type: type,
                sub_type: subtype
            }
        }).then(response => {
            userCosmetics = response.data.error ? [] : response.data;

            // Get all cosmetics
            axios.get(route('cosmetics.get'), {
                params: {
                    type: type,
                    sub_type: subtype
                }
            }).then(response => {
                let res = response.data;
                res.forEach((cosmetic, _) => {
                    if (userCosmetics?.find(userCosmetic => userCosmetic.id === cosmetic.id)) {
                        cosmetic.owned = true;
                    } else {
                        cosmetic.owned = false;
                    }

                });
                // Order by owned
                res.sort((a, b) => {
                    return b.owned - a.owned;
                });
                setCosmetics(res);

            }).catch(error => {
                toast.error('Une erreur est survenue lors de la récupération des cosmétiques', { position: 'bottom-left' });
                console.error(error);
            });

        }).catch(error => {
            toast.error('Une erreur est survenue lors de la récupération des cosmétiques de l\'utilisateur', { position: 'bottom-left' });
            console.error(error);
        });
    }

    function selectCosmetic(cosmetic) {
        if (!cosmetic) {
            let newCosmetics = [...activeCosmetics];
            newCosmetics = newCosmetics.filter(aCosmetic => aCosmetic.sub_type !== activeTab);
            setActiveCosmetics(newCosmetics);
            return;
        }

        if (!cosmetic.owned)
            return toast.error('Vous ne possédez pas ce cosmétique', { position: 'bottom-left' });

        let newCosmetics = [...activeCosmetics];
        newCosmetics = newCosmetics.filter(aCosmetic => aCosmetic.sub_type !== cosmetic.sub_type);
        newCosmetics.push(cosmetic);
        setActiveCosmetics(newCosmetics);
    }

    function saveCosmetics() {
        axios.post(route('user.cosmetics.update'), { cosmetics: activeCosmetics.map(cosmetic => cosmetic.id) })
            .then(response => {
                if (response.data.success)
                    toast.success('Sauvegarde effectuée avec succès', { position: 'bottom-left' });
            }).catch(error => {
                toast.error('Une erreur est survenue lors de la sauvegarde des cosmétiques', { position: 'bottom-left' });
                console.error(error);
            });
    }

    useEffect(() => {
        getCosmetics('penguin', 'hat');
    }, []);

    return (
        <MainLayout showOverflow={false} className={"relative p-2"}>
            <Head title="Apparence" />


            <div className="flex flex-col gap-2 md:grid xl:grid-cols-9 grid-cols-7 md:gap-6 h-full overflow-hidden">
                {/* Save button mobile and SideBar */}
                <div className="flex md:hidden gap-3 w-full navbar z-[100000]" style={{position: "static"}}>
                    {/*<div className="flex-shrink-0 rounded-md bg-container w-[48px] h-[48px]">
                    </div>*/}
                    <AppearanceSidebar className={"z-10"} tabs={tabs} getCosmetics={getCosmetics} activeTab={activeTab} />
                    <BlueButton className="z-0 w-full h-[48px] text-base" onClick={saveCosmetics}>Sauvegarder</BlueButton>
                </div>

                {/* User */}
                <div className="container md:order-3 xl:col-span-2 col-span-2 flex-col gap-12 p-4 md:p-8">
                    <div className="flex flex-col md:flex-col-reverse h-full justify-between items-center w-full">
                        {((window.innerWidth <= 768 && mainTab == 'penguin') || (window.innerWidth > 768))  && <UserPenguin width={window.innerWidth <= 768 ? 128 : 256} propsCosmetics={activeCosmetics} className={'md:scale-x-[-1]'} />}
                        <div className="flex md:flex-col gap-4 justify-center items-center w-full">
                            <UserIcon className={"hidden md:block"} propsCosmetics={activeCosmetics} width={window.innerWidth <= 768 ? 92 : 148} />
                            { ((window.innerWidth <= 768 && mainTab == 'card') || (window.innerWidth > 768))  && <UserCard propsCosmetics={activeCosmetics} data={{ username: twitch.display_name }} className={'w-full'} />}
                        </div>                    </div>
                    <BlueButton className="hidden md:flex w-full" onClick={saveCosmetics}>Sauvegarder</BlueButton>
                </div>

                {/* Cosmetics */}
                <CosmeticList cosmetics={cosmetics} activeTab={activeTab} selectCosmetic={selectCosmetic} />

                {/* Menu */}
                <div className="hidden md:order-1 md:flex container xl:col-span-2 col-span-2 flex-col justify-start items-start p-3 md:p-6 gap-8">
                    {
                        tabs.map((tab, _) => {
                            return (
                                <div key={tab.key} className="flex flex-col gap-4 w-full">
                                    <span className="font-bold text-xl" key={tab.name}>{tab.name}</span>
                                    <div className="flex flex-col ml-6">
                                        {tab.subtabs.map((subtab, _) => {
                                            if(!subtab.active) return;
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
                </div>

            </div>
        </MainLayout>
    )

}
