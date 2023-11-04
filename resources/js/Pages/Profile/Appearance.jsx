import PenguinCard from "@/Components/PenguinCard";
import PodiumPenguin from "@/Components/PodiumPenguin";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function ProfileAppearance() {

    return (
        <MainLayout>
            <Head title="Profil" />
            <div className="flex gap-[64px]">
                <div className="infos">
                    <PenguinCard data={{ username: "bite" }} />
                    <PodiumPenguin />
                </div>
                <div className="col flex-1">
                    Right
                </div>
            </div>
        </MainLayout>
    )

}
