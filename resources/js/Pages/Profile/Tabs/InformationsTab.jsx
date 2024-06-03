import BlueButton from "@/Components/Navigation/Buttons/BlueButton";
import UserCard from "@/Components/User/UserCard";
import UserPenguin from "@/Components/User/UserPenguin";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

export default function InformationsTab() {

    const user = usePage().props.user;
    const twitch = usePage().props.auth.twitch;
    const twitch_subscribe = usePage().props.auth.twitch_subscribe;
    const [vipGamesPoints, setVIPGamesPoints] = useState(null);

    let tierSubscribe = -1;
    switch (twitch_subscribe?.tier) {
        case "1000":
            tierSubscribe = 1;
            break;
        case "2000":
            tierSubscribe = 2;
            break;
        case "3000":
            tierSubscribe = 3;
            break;
        default:
            break;
    }

    useEffect(() => {
        axios.get(route('user.points.vipgames', { twitch_id: twitch.id }))
            .then((response) => {
                setVIPGamesPoints(response.data?.points);
            })
            .catch((err) => {
                setVIPGamesPoints(undefined)
            })
    }, [])

    const CompLoadData = () => {
        return (
            <div className="flex items-center gap-2">
                <div className="loader-spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
                <span className="text-[14px] font-medium">Veuillez patienter</span>
            </div>
        )
    }

    const dataUser = [
        {
            name: "Pseudo",
            value: twitch.display_name
        },
        {
            name: "ID du compte twitch associé",
            value: twitch.id
        },
        {
            name: "A rejoint la banquise le",
            value: moment(user.created_at).format("DD/MM/YYYY [à] HH:mm")
        },
        {
            name: "Points bonus disponibles au prochain VIPGames",
            value: vipGamesPoints == null ? <CompLoadData /> : `${vipGamesPoints == undefined ? `Non disponible` : `${vipGamesPoints} ${vipGamesPoints > 1 ? "points" : "point"}`}`
        }
    ]

    return (
        <div className="tab_content lg:overflow-x-hidden xl:p-12 xl:h-full">
            <div className="flex flex-col xl:flex-row justify-center items-center gap-4 xl:gap-16 xl:h-full">
                <div className="w-full xl:w-[700px] bg-container flex flex-col h-full gap-2 xlgap-8 rounded-lg p-4">
                    <div className="flex gap-4">
                        <img src={twitch.profile_image_url} className="rounded-full w-[48px] h-[48px] xl:w-[64px] xl:h-[64px]" alt="" />
                        <div className="flex flex-col justify-center w-full overflow-hidden">
                            <h2 className="text-[18px] xl:text-[24px] font-bold">{twitch.display_name}</h2>
                            <h4 className="text-[10px] xl:text-[16px] font-light">
                                {twitch_subscribe == null ?
                                    'Non abonnée à WeilsTTV'
                                    :
                                    `Abonné(e) à ${twitch_subscribe?.broadcaster_name}, Tier ${tierSubscribe}`
                                }
                            </h4>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col px-4 overflow-y-auto">
                        {dataUser.map((data, _) => {
                            return (
                                <div key={_} className="flex flex-col w-full border-container py-4 border-solid border-b-2">
                                    <h2 className="text-[14px] xl:text-[18px] font-bold">{data?.name}</h2>
                                    <h4 className="text-[10px] xl:text-[14px] font-medium">{data?.value}</h4>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="w-full xl:w-auto flex flex-col gap-4 h-full">
                    <div className="flex flex-col xl:flex-row items-center gap-4">
                        <UserCard className="w-full" twitchId={twitch.id} data={{ username: twitch.display_name }} />
                        <BlueButton className={"w-full xl:w-auto h-fit"} href={route('profile.appearance')}>Éditer</BlueButton>
                    </div>
                    <div className="bg-container rounded-lg justify-center items-center w-full flex flex-1 overflow-hidden">
                        <UserPenguin className={"scale-y-[1] md:scale-x-[-1.35] xl:scale-y-[1.35] h-fit"} twitchId={twitch.id} />
                    </div>
                </div>
            </div>
        </div>
    )

}
