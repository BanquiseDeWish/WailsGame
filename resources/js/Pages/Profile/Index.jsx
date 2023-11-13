import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

import Penguin from "../../Components/Penguin";

export default function ProfileIndex() {

    return (
        <MainLayout>
            <Head title="Profil" />
            <div className="info flex justify-center items-center w-full h-full">
                Coming Soon...
                <div className="absolute bottom-[-20%]">
                    <Penguin size={{ width: 300, height: 400 }} />
                </div>
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
