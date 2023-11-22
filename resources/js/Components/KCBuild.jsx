import { useEffect, useState } from "react"
import RefreshIcon from '@/Components/Icons/RefreshIcon'

export default function KCBuild({ uid, character, vehicle, glider, tire, reRandomElement }) {

    return (
        <div className="kcbuild mt-2 flex gap-2 flex-col select-none">
            {character !== null && character !== undefined &&
                <div className="flex justify-between items-center select-none">
                    <div className="character flex items-center gap-2"><img width={32} height={32} src={`/storage/kc/sprites/characters/${character?.name == undefined ? '' : character?.name}.webp`} alt="" /> <span className="name_build_element text-xl">{character?.name}</span></div>
                    <div className="refresh" onClick={() => { reRandomElement(uid, 'character') }}><RefreshIcon width={24} height={24} /></div>
                </div>
            }
            {vehicle !== null && vehicle !== undefined &&
                <div className="flex justify-between items-center select-none">
                    <div className="vehicle flex items-center gap-2"><img width={32} height={32} src={`/storage/kc/sprites/karts/${vehicle?.name == undefined ? '' : vehicle?.name}.webp`} alt="" /> <span className="name_build_element">{vehicle?.name}</span></div>
                    <div className="refresh" onClick={() => { reRandomElement(uid, 'vehicle') }}><RefreshIcon width={24} height={24} /></div>
                </div>
            }
            {glider !== null && glider !== undefined &&
                <div className="flex justify-between items-center select-none">
                    <div className="glider flex items-center gap-2"><img width={32} height={32} src={`/storage/kc/sprites/gliders/${glider?.name == undefined ? '' : glider?.name}.webp`} alt="" /> <span className="name_build_element">{glider?.name}</span></div>
                    <div className="refresh" onClick={() => { reRandomElement(uid, 'glider') }}><RefreshIcon width={24} height={24} /></div>
                </div>
            }
            {tire !== null && tire !== undefined &&
                <div className="flex justify-between items-center select-none">
                    <div className="tire flex items-center gap-2"><img width={32} height={32} src={`/storage/kc/sprites/tires/${tire?.name == undefined ? '' : tire?.name}.webp`} alt="" /> <span className="name_build_element">{tire?.name}</span></div>
                    <div className="refresh" onClick={() => { reRandomElement(uid, 'tire') }}><RefreshIcon width={24} height={24} /></div>
                </div>
            }
        </div>
    )

}
