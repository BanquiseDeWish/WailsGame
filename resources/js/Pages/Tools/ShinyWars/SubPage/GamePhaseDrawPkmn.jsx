import GreenButton from "@/Components/Navigation/Buttons/GreenButton"

export default function GamePhaseHunt({socket, globalValues, ...otherProps}) {

    return (
        <>
            <div className="grid grid-cols-6 gap-12">
                { globalValues.current?.pokemon_types?.map((type, index) => {
                    return (
                            <img
                                src={type.image}
                                alt={type.name}
                                width={80}
                                className="rounded-[4px]"
                                key={index}
                                onClick={() => {
                                    socket.emit('drawpkm_player_choose', {index: index})
                                }}
                            />
                    )})
                }
            </div>

            { globalValues.current?.isLeader && <GreenButton className="w-fit button_green outline-none" >C'est l'heure du dudududuDUEL !</GreenButton>}
        </>
    )

}