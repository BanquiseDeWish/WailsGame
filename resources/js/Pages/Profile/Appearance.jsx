import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import '@css/page/profile/appearance/appareance.css'
import UserPenguin from "@/Components/User/UserPenguin";
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import axios from "axios";
import CosmeticCard from "@/Pages/Profile/Appearance/CosmeticCard";
import BlueButton from "@/Components/Navigation/Buttons/BlueButton";


export default function ProfileAppearance(props) {

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
                },
                {
                    name: 'Sacs à Dos',
                    key: 'backpack'
                },
                {
                    name: 'Accessoires',
                    key: 'accessory'
                },
            ]
        },
        {
            name: 'Carte',
            key: 'card',
            subtabs: [
                {
                    name: 'Fond d\'Icone',
                    key: 'colorIcon'
                },
                {
                    name: 'Slogan',
                    key: 'slogan'
                }
            ]
        }
    ]

    function getCosmetics(type, subtype) {
        setCosmetics(undefined);
        setActiveTab(subtype);
        let userCosmetics = [];
        // Get user cosmetics
        axios.get(route('user.cosmetics.all', { twitch_id: twitch.id }), {
            params: {
                type: type,
                sub_type: subtype
            }
        }).then(response => {
            userCosmetics = response.data;

            // Get all cosmetics
            axios.get(route('cosmetics.get'), {
                params: {
                    type: type,
                    sub_type: subtype
                }
            }).then(response => {
                let res = response.data;
                res.forEach((cosmetic, _) => {
                    if(userCosmetics.find(userCosmetic => userCosmetic.id === cosmetic.id)) {
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
                toast.error('Une erreur est survenue lors de la récupération des cosmétiques', {position: 'bottom-left'});
                console.error(error);
            });

        }).catch(error => {
            toast.error('Une erreur est survenue lors de la récupération des cosmétiques de l\'utilisateur', {position: 'bottom-left'});
            console.error(error);
        });
    }

    function selectCosmetic(cosmetic) {
        if(!cosmetic.owned)
            return toast.error('Vous ne possédez pas ce cosmétique', {position: 'bottom-left'});

        let newCosmetics = [...activeCosmetics];
        newCosmetics = newCosmetics.filter(aCosmetic => aCosmetic.sub_type !== cosmetic.sub_type);
        newCosmetics.push(cosmetic);
        setActiveCosmetics(newCosmetics);
    }

    function saveCosmetics() {
        axios.post(route('user.cosmetics.update'), {cosmetics: [activeCosmetics.map(cosmetic => cosmetic.id)]})
        .then(response => {
            if(response.data.success)
                toast.success('Sauvegarde effectuée avec succès', {position: 'bottom-left'});
        }).catch(error => {
            toast.error('Une erreur est survenue lors de la sauvegarde des cosmétiques');
            console.error(error);
        });
    }

    useEffect(() => {
        getCosmetics('penguin', 'hat');
    }, []);

    return (
        <MainLayout>
            <Head title="Apparence" />

            <div className="grid xl:grid-cols-9 grid-cols-7 gap-6 h-full">
                <div className="container xl:col-span-2 col-span-2 flex flex-col justify-start items-start p-6 gap-8">
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
                </div>

                <div className="container justify-start items-start xl:col-span-5 col-span-3 p-8 select-none overflow-y-auto">
                    {!cosmetics && <div className="flex justify-center items-center w-full h-full"><div className="loader-spinner"></div></div>}
                    <div className="flex flex-wrap gap-4">
                    {
                        cosmetics?.map((cosmetic, _) => {
                            switch (cosmetic.sub_type) {
                                case 'hat':
                                case 'backpack':
                                case 'accessory':
                                    return (
                                        <CosmeticCard key={cosmetic.name} onClick={() => {selectCosmetic(cosmetic)}}>
                                            <div className={`flex justify-center items-end overflow-hidden w-[128px] h-[128px] ${!cosmetic.owned && 'filter grayscale'}`}
                                                dangerouslySetInnerHTML={{ __html: cosmetic.style }}
                                            />
                                            <span>{cosmetic.name}</span>
                                        </CosmeticCard>
                                    )
                                case 'colorIcon':
                                    return (
                                        <CosmeticCard key={cosmetic.name} onClick={() => {selectCosmetic(cosmetic)}}>
                                            <div className={`flex justify-center items-end overflow-hidden w-[128px] h-[128px] rounded-full ${!cosmetic.owned && 'filter grayscale'}`}
                                                style={{ background: cosmetic.style }}
                                            />
                                            <span>{cosmetic.name}</span>
                                        </CosmeticCard>
                                    )
                            }
                        })
                    }
                    </div>
                </div>

                <div className="container xl:col-span-2 col-span-2 flex-col gap-8 p-6">
                    <div className="flex flex-col h-full justify-center items-center">
                        <UserPenguin propsCosmetics={activeCosmetics} className={'scale-x-[-1]'} />
                    </div>
                    <BlueButton className="w-full" onClick={saveCosmetics}>Sauvegarder</BlueButton>
                </div>
            </div>
        </MainLayout>
    )

}
