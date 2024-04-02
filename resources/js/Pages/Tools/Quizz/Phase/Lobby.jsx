import BlueButton from '@/Components/Navigation/Buttons/BlueButton';
import SimpleButton from '@/Components/Navigation/Buttons/SimpleButton';
import PenguinCard from '@/Components/User/PenguinCard';
import { Head, usePage, router } from '@inertiajs/react';
import React, { useState, useEffect, useRef, useReducer } from 'react';
import { copyToClipboard } from '@/Game/utils';
import { toast } from 'sonner';
import InputSwitch from '@/Components/Forms/InputSwitch';
import crown from '../../../../../assets/icons/crown.svg'
import TickValidIcon from '../../../../../assets/icons/tick.svg'
import TickNotValidIcon from '../../../../../assets/icons/square.svg'
import { Disclosure } from '@headlessui/react';
import ChevronDown from '@/Components/Icons/ChevronDown';
import ChevronUp from '@/Components/Icons/ChevronUp';
import LogoutIcon from '../../../../../assets/icons/logout.svg'

export default function QuizzLobby({ auth, globalValues, modifyValues, emit }) {

    console.log(globalValues)

    const copyLink = () => {
        console.log(navigator, navigator.clipboard)
        copyToClipboard(route('games.quizz.party', { gameId: globalValues.current.gameId }));
        toast.success("Lien d'invitation copié avec succès !")
    }

    const launcGame = () => {
        emit('quizz_launch_game', { gameId: globalValues.current.gameId })
    }

    return (
        <div className="quizz_lobby flex-1">
            <div className="flex justify-center gap-8">
                <div className="gap-4 card" style={{ alignItems: 'flex-start' }}>
                    <h3 className='text-[24px] font-bold'>Code de la room</h3>
                    <div className="flex gap-4 w-full">
                        <input type="text" className='flex-1' name="gameId" defaultValue={globalValues.current.gameId} disabled />
                        <BlueButton onClick={copyLink}>Copier le lien de la room</BlueButton>
                    </div>
                    <div className="flex items-center gap-3">
                        <h3 className='text-[24px] font-bold'>Liste des joueurs</h3>
                        <h3 className='text-[14px] font-bold'>{globalValues.current.players.length}/30</h3>
                    </div>
                    <div className="grid grid-cols-4 gap-4 flex-grow overflow-y-auto h-[400px] pr-4">
                        {Array.from(Array(30)).map((s, i) => {

                            const player = globalValues.current.players[i];

                            return (
                                <div className={`player ${player?.isConnected ? 'opacity-100' : 'opacity-40'}`}>
                                    {player?.isLeader &&
                                        <div className="badgeLeader">
                                            <img src={crown} style={{ width: '24px', height: '24px' }} alt="" />
                                        </div>
                                    }
                                    <PenguinCard className="min-w-[250px] max-w-[250px] h-[82px]" skeleton={player == undefined} key={i} data={{ username: (player !== undefined ? `${player?.username}` : ' - '), background_type: "color", background_data: { color: 'var(--container_background)' } }} />
                                </div>
                            )

                        })}
                    </div>
                    <div className="flex w-full justify-end">
                        <BlueButton onClick={launcGame}>
                            Lancer la partie
                        </BlueButton>
                    </div>
                </div>
                <div className="card" style={{ justifyContent: 'flex-start', minWidth: '268px', maxWidth: '268px', gap: '24px', alignItems: 'flex-start' }}>
                    {globalValues.current.themes.map((s, i) => {

                        if (globalValues.current.isLeader) {

                            const onChangeTheme = (state, setState, subIndex) => {
                                if(subIndex !== undefined)
                                    globalValues.current.themes[i].subcategories[subIndex].state = !state
                                else
                                    globalValues.current.themes[i].state = !state
                                setState(!state)
                                console.log('GlobalValues?', globalValues.current.gameId)
                                emit("quizz_update_themes_state", { gameId: globalValues.current.gameId, themes: globalValues.current.themes })
                            }

                            if (s.type == "theme") {
                                const [state, setState] = useState(s?.state)

                                return (
                                    <InputSwitch key={i} state={state} label={s?.dname} onChange={() => { onChangeTheme(state, setState, undefined) }} />
                                )
                            } else if (s.type == "category") {
                                return (
                                    <div className="category w-full">
                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button className={`flex w-full justify-between ${open ? 'rounded-t-[4px]' : 'rounded-[4px]'} bg-[#4c6fab] px-4 py-2 text-left text-sm font-medium w-full`}>
                                                        <span>{s.dname}</span>
                                                        {open ?
                                                            <ChevronUp />
                                                        :
                                                            <ChevronDown />
                                                        }
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="flex flex-col gap-2 p-2 text-sm rounded-b-[4px] bg-[#334b75]">
                                                        {s?.subcategories?.map((sc, i2) => {
                                                            const [state, setState] = useState(sc?.state)
                                                            if (sc.type == "theme") {
                                                                return (
                                                                    <InputSwitch key={i2} state={state} label={sc?.dname} onChange={() => { onChangeTheme(state, setState, i2) }} />
                                                                )
                                                            }
                                                        })}
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </div>
                                )
                            }
                        } else {
                            if (s.type == "theme") {
                                return (
                                    <div className="flex gap-2">
                                        <img src={(s?.state ? TickValidIcon : TickNotValidIcon)} style={{ width: '24px', height: '24px' }} alt="" />
                                        <span>{s?.dname}</span>
                                    </div>
                                )
                            } else if (s.type == "category") {
                                return (
                                    <div className="category w-full">
                                        <Disclosure>
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button className={`flex w-full justify-between ${open ? 'rounded-t-[4px]' : 'rounded-[4px]'} bg-[#4c6fab] px-4 py-2 text-left text-sm font-medium w-full`}>
                                                        <span>{s.dname}</span>
                                                        {open ?
                                                            <ChevronUp />
                                                        :
                                                            <ChevronDown />
                                                        }
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="p-2 text-sm rounded-b-[4px] bg-[#334b75]">
                                                        {s?.subcategories?.map((sc, i2) => {
                                                            if (sc.type == "theme") {
                                                                return (
                                                                    <div className="flex gap-2">
                                                                        <img src={(sc?.state ? TickValidIcon : TickNotValidIcon)} style={{ width: '24px', height: '24px' }} alt="" />
                                                                        <span>{sc?.dname}</span>
                                                                    </div>
                                                                )
                                                            }
                                                        })}
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    </div>
                                )
                            }
                        }

                    })}
                </div>
            </div>
        </div>
    )

}
