import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import '@css/page/profile/appearance/appareance.css'
import UserPenguin from "@/Components/User/UserPenguin";
import { useEffect } from "react";

export default function ProfileAppearance(props) {

    const twitch = props.auth.twitch;

    useEffect(() => {
        
    }, []);

    return (
        <MainLayout>
            <Head title="Apparence" />

            <div className="grid xl:grid-cols-9 grid-cols-7 gap-6 h-full">
                <div className="container xl:col-span-2 col-span-2">
                    Menu
                </div>

                <div className="container xl:col-span-5 col-span-3">
                    Cosmétiques
                </div>

                <div className="container xl:col-span-2 col-span-2">
                    <UserPenguin className={'scale-x-[-1]'}/>
                </div>
            </div>
        </MainLayout>
    )

}
