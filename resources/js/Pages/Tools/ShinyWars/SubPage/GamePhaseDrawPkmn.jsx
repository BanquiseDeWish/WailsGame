import GreenButton from "@/Components/Navigation/Buttons/GreenButton"

import PokemonDrawModal from "../Modal/PokemonDrawModal"
import EggImg from '@assets/img/tools/shinywars/egg.png';

import { useEffect, useState } from "react"

export default function GamePhaseDrawPkmn({ socket, globalValues, ...otherProps }) {

    return (
        <>
            <PokemonDrawModal data={globalValues.current?.drawpkm_player_choose} />
            <div className="flex flex-row gap-12">
                <div className="flex flex-col justify-between">
                    <div className="flex flex-row gap-2 justify-start items-center p-2 rounded container_background w-full">
                        <img width={56} src={globalValues.current?.drawpkm_player_turn?.icon} alt="" className="rounded-full" />
                        <span>{globalValues.current?.drawpkm_player_turn?.name}</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        {
                            globalValues.current?.players_list?.map((player, index) => {
                                return (
                                    <>
                                        <div key={index + player.name} className="flex flex-row gap-6 justify-start items-center p-2 rounded container_background">
                                            <img width={56} src={player?.icon} alt="" className="rounded-full" />
                                            <div className="flex flex-row gap-2">
                                            {[0,1,2,3,4,5].map((index) => {
                                                return (
                                                    <div key={index + player.name + player?.pokemons?.[index]?.id} className="container_background w-[56px] h-[56px] rounded-full">
                                                        {
                                                            player?.pokemons?.[index] &&
                                                            <img
                                                            width={56}
                                                            src={`https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${player?.pokemons?.[index]?.id}/${player?.pokemons?.[index]?.form == 'regular' ? 'shiny' : 'shiny_' + player?.pokemons?.[index]?.form}.png`}
                                                            alt=""
                                                            onError={(e) => { e.target.onerror = null; e.target.src = EggImg }}
                                                        />
                                                        }
                                                    </div>
                                                )
                                            })}

                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="grid grid-cols-6 container_background rounded-lg gap-8 p-8">
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