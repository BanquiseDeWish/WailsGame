import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function ProfileIndex() {

    return (
        <MainLayout>
            <Head title="Profil" />
            <div className="text-white">
                This is profile index
            </div>
        </MainLayout>
    )

}
