import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

import UserPenguin from "../../Components/User/UserPenguin";

export default function ProfileIndex(props) {

    return (
        <MainLayout>
            <Head title="Profil" />
            <div className="info flex justify-center items-center w-full h-full">
                <UserPenguin
                    width={300}
                    twitchId={props.auth?.twitch?.id}
                />
            </div>

            <style>
            {`
                .info {
                    color: #FFF;
                    font-family: Poppins;
                    font-size: 3rem;
                    font-style: italic;
                    font-weight: 300;
                    line-height: normal;
                }
            `}
            </style>
        </MainLayout>
    )

}
