import GreenButton from "@/Components/Navigation/Buttons/GreenButton"

export default function GamePhaseHunt({socket, globalValues, ...otherProps}) {

    return (
        <>
            { globalValues?.isLeader && <GreenButton className="w-fit button_green outline-none" >C'est l'heure du dudududuDUEL !</GreenButton>}
        </>
    )

}