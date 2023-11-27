import WeilsLogo from "@/Components/Icons/WeilsLogo";
import GlobalLayout from "@/Layouts/GlobalLayout";
import { Head } from "@inertiajs/react";


export default function Maintenance(props) {

    return (
        <GlobalLayout>
            <Head title={"Maintenance"} />
            <div className="flex flex-col gap-10 h-full justify-center items-center">
                <WeilsLogo w={250} />
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-semibold">
                        Maintenance en cours
                    </h2>
                    <h4 className="text-xl font-light">
                        On revient très vite les pingouins :)
                    </h4>
                </div>
            </div>
        </GlobalLayout>
    )

}
