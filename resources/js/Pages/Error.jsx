import GlobalLayout from "@/Layouts/GlobalLayout";
import { Head } from "@inertiajs/react";


export default function Error(props) {

    return (
        <GlobalLayout>
            <Head title={props?.status} />
            <div className="flex gap-4 h-full justify-center items-center">
                <h1 className="text-6xl">
                    {props?.status}
                </h1>
                <h2 className="text-2xl font-light">
                    Une erreur est survenue
                </h2>
            </div>
        </GlobalLayout>
    )

}
