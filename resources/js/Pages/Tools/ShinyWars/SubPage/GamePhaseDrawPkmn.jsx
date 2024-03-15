import GreenButton from "@/Components/Navigation/Buttons/GreenButton"

export default function GamePhaseDrawPkmn({ socket, globalValues, ...otherProps }) {

    return (
        <>
            <div className="flex flex-row gap-16">
                <div className="flex flex-col">
                    <span className="text-xl font-semibold">Au tour de</span>
                    <div className="flex flex-row gap-2 justify-start items-center w-[256px] p-2 rounded container">
                        <img width={48} src={globalValues.current?.drawpkm_player_turn?.icon} alt="" className="rounded-full" />
                        <span>{globalValues.current?.drawpkm_player_turn?.name}</span>
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-8">
                    {globalValues.current?.pokemon_types?.map((type, index) => {
                        return (
                            <img
                                src={type.image}
                                alt={type.name}
                                width={80}
                                className={`rounded-[8px] relative
                                    ${type.available ?
                                        'cursor-pointer transition-all hover:rotate-12 hover:scale-125'
                                        :
                                        'cursor-not-allowed brightness-35 filter transition-none'
                                    }`}
                                onClick={() => {
                                    socket.emit('drawpkm_player_choose', { index: index })
                                }}
                            />
                        )
                    })}
                </div>
            </div>

            {globalValues.current?.isLeader && <GreenButton className="w-fit button_green outline-none" >C'est l'heure du dudududuDUEL !</GreenButton>}
        </>
    )

}