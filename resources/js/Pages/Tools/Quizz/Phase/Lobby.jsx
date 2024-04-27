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
import QuizzLogo from '../../../../../assets/img/QuizzMasterLogo.webp'
import CountDown from '../Modal/CountDown';
import { InputRange } from '@/Components/Forms/InputRange';
import ConfirmMaxQuestions from '../Modal/ConfirmMaxQuestions';
import HowToPlay from '../Modal/HowToPlay';
import Eye from '@/Components/Icons/Eye';
import EyeHide from '@/Components/Icons/EyeHide';

export default function QuizzLobby({ auth, globalValues, modifyValues, settings, report, emit }) {

    const [maxQuestions, setMaxQuestions] = useState(globalValues.current.maximumQuestions)
    const [timeGame, setTimeGame] = useState(-1)
    const [isOpenHTP, setIsOpenHTP] = useState(false)
    const [gameIdHidden, setGameIdHidden] = useState(true)
    const copyLink = () => {
        copyToClipboard(globalValues.current.gameId);
        toast.success("ID de la partie copié avec succès !")
    }

    const launchGame = () => {
        if (!globalValues.current.isLeader) return;
        emit('quizz_launch_game', { gameId: globalValues.current.gameId })
    }

    const copyListPlayers = [...globalValues.current.players];
    const playersCount = copyListPlayers.filter(p => p.isConnected).length;

    const questionsMaxChange = (e) => {
        if (!globalValues.current.isLeader) return;
        setMaxQuestions(e.target.value)
        emit("quizz_update_maximum_questions", { data: maxQuestions })
    }

    useEffect(() => {
        const max = globalValues.current.maximumQuestions
        const timeGame = Math.floor((20 * max) / 60)
        setTimeGame(timeGame)
    }, [globalValues.current.maximumQuestions])

    const handleChangeGIHidden = () => {
        setGameIdHidden(!gameIdHidden)
    }

    return (
        <div className="quizz_lobby flex-1">
            <div className="flex justify-center gap-4 my-8">
                <div className="card relative p-0" style={{ alignItems: 'flex-start', paddingTop: '4rem' }}>
                    <div className="flex flex-col gap-4 px-4">
                        <div className="flex w-full justify-center" style={{ position: "absolute", top: "-82px" }}>
                            <img src={QuizzLogo} style={{ width: '25%' }} />
                        </div>
                        <div className="message">
                            <span>Ce jeu est en version Bêta. Il se peut que lors de votre partie, vous rencontriez des problèmes de performances ou de gameplay.<br />Si c'est le cas, merci de vous rendre sur le serveur discord et de signaler le problème concerné</span>
                        </div>
                        <h3 className='text-[24px] font-bold'>Code de la room</h3>
                        <div className="flex gap-4 w-full items-center">
                            <div className="relative w-full">
                                <input type="text" className='w-full' name="gameId" value={gameIdHidden ? "************************************" : globalValues.current.gameId} disabled />
                                <div className="absolute select-none top-0 bottom-0 mx-0 my-auto right-4 h-full" onClick={handleChangeGIHidden}>
                                    {gameIdHidden ? <Eye width={32} height={"100%"} /> :<EyeHide width={32} height={"100%"} /> }
                                </div>
                            </div>
                            <BlueButton onClick={copyLink}>Copier</BlueButton>
                        </div>
                        <div className="flex items-center gap-3">
                            <h3 className='text-[24px] font-bold'>Liste des joueurs</h3>
                            <h3 className='text-[14px] font-bold'>{playersCount < 10 && playersCount > 0 ? `0${playersCount}` : playersCount}/30</h3>
                        </div>
                        <div className="grid grid-cols-4 gap-4 flex-grow overflow-y-auto h-[400px] pr-4 pb-4 mb-4">
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
                    </div>
                    <div className="flex w-full justify-between px-2 py-2" style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
                        <div className="flex gap-2">
                            <BlueButton onClick={() => { settings.set(true) }}>
                                Paramètres
                            </BlueButton>
                            <BlueButton onClick={() => { setIsOpenHTP(true) }}>
                                Comment jouer ?
                            </BlueButton>
                        </div>
                        <BlueButton onClick={launchGame}>
                            Lancer la partie
                        </BlueButton>
                    </div>
                </div>
                <div className="flex flex-col gap-4 min-w-[350px]">
                    <div className="card p-4">
                        <div className="flex flex-col items-center gap-3 w-full">
                            <InputRange
                                label="Nombres de questions"
                                value={globalValues.current.maximumQuestions}
                                onChange={questionsMaxChange}
                                min={3}
                                max={50}
                                id="questions_max"
                            />
                            <span><b>Temps de jeu:</b> {timeGame} minutes </span>
                        </div>
                    </div>
                    <div className="card p-4 flex-1 w-full" style={{ justifyContent: 'flex-start', gap: '16px', alignItems: 'flex-start', overflow: 'auto', flex: '1 1 0' }}>
                        {globalValues.current.themes.map((s, i) => {

                            if (globalValues.current.isLeader) {

                                const onChangeTheme = (state, setState, subIndex) => {
                                    if (subIndex !== undefined)
                                        globalValues.current.themes[i].subcategories[subIndex].state = !state
                                    else
                                        globalValues.current.themes[i].state = !state
                                    setState(!state)

                                    emit("quizz_update_themes_state", { gameId: globalValues.current.gameId, category_key: s.key, theme_key: globalValues.current.themes[i].subcategories[subIndex].key, new_state: !state })
                                }


                                if (s.type == "category") {

                                    const onChangeAllCategory = (state) => {
                                        try {
                                            globalValues.current.themes[i].state = !state
                                            for (let ik = 0; ik < globalValues.current.themes[i].subcategories.length; ik++) {
                                                globalValues.current.themes[i].subcategories[ik].state = !state;
                                            }
                                            emit("quizz_update_themes_state", { gameId: globalValues.current.gameId, category_key: s.key, theme_key: '*', new_state: !state })
                                        } catch (err) {
                                            console.log(err)
                                        }
                                    }

                                    return (
                                        <div className="category w-full">
                                            <Disclosure defaultOpen={true}>
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button className={`flex w-full items-center justify-between ${open ? 'rounded-t-[4px]' : 'rounded-[4px]'} bg-[#4c6fab] px-4 py-2 text-left text-sm font-medium w-full`}>
                                                            <span>{s.dname}</span>
                                                            <div className="flex items-center">
                                                                <InputSwitch classNameContainer={"max-h-[28px]"} key={i} state={null} label={""} onChange={onChangeAllCategory} />
                                                                {open ?
                                                                    <ChevronUp />
                                                                    :
                                                                    <ChevronDown />
                                                                }
                                                            </div>
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="flex flex-col gap-0 py-2 text-sm rounded-b-[4px] bg-[#334b75]">
                                                            {s?.subcategories?.map((sc, i2) => {
                                                                const [state, setState] = useState(sc?.state)

                                                                useEffect(() => {
                                                                    setState(sc.state)
                                                                }, [globalValues.current.themes])

                                                                if (sc.type == "theme" && sc.questionsLength !== undefined) {
                                                                    return (
                                                                        <div className="flex flex-col items-start justify-start hover:bg-[rgba(0,0,0,0.2)] transition-all rounded-[0.275rem] px-2 mx-2 py-2" onClick={() => { onChangeTheme(state, setState, i2) }}>
                                                                            <InputSwitch classNameContainer={"max-h-[28px]"} key={i2} state={state} label={
                                                                                <div className='flex flex-col select-none'>
                                                                                    <span>{sc.dname}</span>
                                                                                    <span className='text-[12px] font-extralight'>{sc.questionsLength} Questions</span>
                                                                                </div>
                                                                            } onChange={() => { onChangeTheme(state, setState, i2) }} />
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
                            } else {
                                if (s.type == "category") {
                                    return (
                                        <div className="category w-full">
                                            <Disclosure defaultOpen={true}>
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button className={`flex w-full justify-between ${open ? 'rounded-t-[4px]' : 'rounded-[4px]'} bg-[#4c6fab] items-center px-4 py-2 text-left text-sm font-medium w-full`}>
                                                            <span>{s.dname}</span>
                                                            {open ?
                                                                <ChevronUp />
                                                                :
                                                                <ChevronDown />
                                                            }
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="py-2 text-sm rounded-b-[4px] flex flex-col gap-0 bg-[#334b75] ">
                                                            {s?.subcategories?.map((sc, i2) => {
                                                                if (sc.type == "theme" && sc.questionsLength !== undefined) {
                                                                    return (
                                                                        <div className="flex gap-2 hover:bg-[rgba(0,0,0,0.2)] transition-all rounded-[0.275rem] px-2 mx-2 py-2">
                                                                            <img src={(sc?.state ? TickValidIcon : TickNotValidIcon)} style={{ width: '24px', height: '24px' }} alt="" />

                                                                            <div className='flex flex-col select-none'>
                                                                                <span>{sc.dname}</span>
                                                                                <span className='text-[12px] font-extralight'>{sc.questionsLength} Questions</span>
                                                                            </div>
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
                    <BlueButton onClick={() => { report.set(true) }}>Signaler un problème</BlueButton>
                </div>
            </div>
            <HowToPlay isOpen={isOpenHTP} setIsOpen={setIsOpenHTP} />
            <ConfirmMaxQuestions data={{ lastError: globalValues.current.lastError }} launchGame={launchGame} emit={emit} />
            <CountDown data={{ launching: globalValues.current.launchingGame, timer: globalValues.current.timerCurrent }} />
        </div>
    )

}
