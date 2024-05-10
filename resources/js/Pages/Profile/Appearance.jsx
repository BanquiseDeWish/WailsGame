import { Head } from "@inertiajs/react";
import GlobalLayout from "@/Layouts/GlobalLayout";
import '@css/page/profile/appearance/appareance.css'
export default function ProfileAppearance(props) {

    const twitch = props.auth.twitch;
    return (
        <GlobalLayout>
            <Head title="Apparence" />
        </GlobalLayout>
    )

}
