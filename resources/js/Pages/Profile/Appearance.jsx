import PenguinCard from "@/Components/PenguinCard";
import PodiumPenguin from "@/Components/PodiumPenguin";
import Penguin from "@/Components/Penguin";
import { Head } from "@inertiajs/react";
import GlobalLayout from "@/Layouts/GlobalLayout";
import '../../../css/appareance.css'
import BlueButton from "@/Components/Buttons/BlueButton";
import GreenButton from "@/Components/Buttons/GreenButton";

export default function ProfileAppearance(props) {

    const twitch = props.auth.twitch;
    console.log(twitch.id)

    return (
        <GlobalLayout>
            <Head title="Apparence" />
            <div className="appareance">
                <div className="head">
                    <div className="left">
                        <BlueButton routeName={"profile.index"}>Retour</BlueButton>
                    </div>
                    <div className="tabs_category">
                        <GreenButton>Carte</GreenButton>
                        <GreenButton>Pingouin</GreenButton>
                    </div>
                    <div className="right">
                        <GreenButton>Sauvegarder</GreenButton>
                    </div>
                </div>
                <div className="flex">
                    <div className="current_appareance">
                        <PenguinCard data={{ id: twitch.id, username: twitch.display_name }} />
                        <PodiumPenguin />
                    </div>
                    <div className="cosmetics">
                        Comsmetics
                    </div>
                </div>
            </div>
        </GlobalLayout>
    )

}
