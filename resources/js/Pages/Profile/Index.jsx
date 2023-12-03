import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

import Penguin from "../../Components/User/Penguin";

export default function ProfileIndex(props) {

    return (
        <MainLayout>
            <Head title="Profil" />
            <div className="info flex justify-center items-center w-full h-full">
                <Penguin
                    size={{ width: 300 }}
                    user_id={props.auth?.twitch?.id}
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
