import StatContainer from "@/Components/Content/Containers/StatContainer";
import ServerIcon from "@/Components/Icons/Server";
import UsersIcon from "@/Components/Icons/Users";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function AdminIndex(props) {

    const title = "Tableau de bord"

    return (
        <AdminLayout title={title}>
            <Head title={title} />
            <div className="flex mt-10">
                <div className="grid grid-cols-4 w-full gap-4">
                    <div className="w-full">
                        <StatContainer iconComponent={<UsersIcon className="absolute w-16 h-16 top-0 -translate-y-1/2" />} statName={"Viewers ayant rejoint la banquise"} statData={"X Viewers"} />
                    </div>
                    <div className="w-full">
                        <StatContainer iconComponent={<ServerIcon className="absolute w-16 h-16 top-0 -translate-y-1/2" />} statName={"État de WeilsBot"} statData={"Allumé"} />
                    </div>
                    <div className="w-full">
                        <StatContainer statName={"No Data"} statData={"-"} />
                    </div>
                    <div className="w-full">
                        <StatContainer statName={"No Data"} statData={"-"} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
