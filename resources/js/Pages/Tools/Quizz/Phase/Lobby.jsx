import BlueButton from '@/Components/Navigation/Buttons/BlueButton';
import SimpleButton from '@/Components/Navigation/Buttons/SimpleButton';
import UserCard from '@/Components/User/UserCard';
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
import GameMode from '../Modal/GameMode';

const gameModes = [
    {
        key: 'classic',
        name: 'Classique',
        description: 'Répondez à une série de questions sur différement thèmes',
        labelElements: "questions",
        minElements: 3,
        maxElements: 50
    },
    {
        key: 'scattergories',
        name: 'Petit bac',
        description: 'Trouvez des mots en rapport avec la première lettre et le thème proposée',
        labelElements: "manches",
        minElements: 2,
        maxElements: 20
    }
]

export default function QuizzLobby({ auth, globalValues, modifyValues, settings, report, emit }) {

    const [maxQuestions, setMaxQuestions] = useState(globalValues.current.maximumQuestions)
    const [timeGame, setTimeGame] = useState(-1)
    const [isOpenHTP, setIsOpenHTP] = useState(false)
    const [isOpenGameMode, setIsOpenGameMode] = useState(false)
    const [gameIdHidden, setGameIdHidden] = useState(true)
    const [selectedGameMode, setSelectedGameMode] = useState(gameModes[0].key)
    const [gameModeParty, setGameModeParty] = useState(gameModes[0])
    const [players, setPlayers] = useState(globalValues.current.players);

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
        let timeGame = 0;
        if (globalValues.current.gameMode == "classic") {
            timeGame = Math.floor((20 * max) / 60)
        } else if (globalValues.current.gameMode == "scattergories") {
            timeGame = Math.floor((47 * max) / 60)
        }
        setTimeGame(timeGame)
    }, [globalValues.current.maximumQuestions])

    useEffect(() => {
        const gameMode = gameModes.find(game => game.key == globalValues.current.gameMode)
        if (gameMode == undefined) return;
        setGameModeParty(gameMode)
    }, [globalValues.current.gameMode])

    const handleChangeGIHidden = () => {
        setGameIdHidden(!gameIdHidden)
    }

    useEffect(() => {
        if (!globalValues.current.isLeader) return;
        emit("quizz_update_gamemode", selectedGameMode)
    }, [selectedGameMode])

    useEffect(() => {
        setPlayers(globalValues.current.players);
    }, [globalValues.current.players])

    const gameModeCurrent = gameModes.find(game => game.key == globalValues.current.gameMode)

    return (
        <div className="quizz_lobby flex-1 items-center ">
            <div className="flex flex-col w-full xl:w-auto xl:flex-row justify-center gap-4 my-8">
                <div className="card relative px-0 py-0 pb-0 pt-4 lg:pt-[4rem]" style={{ alignItems: 'flex-start' }}>
                    <div className="relative flex flex-col gap-4 px-4">
                        <div className="flex w-full justify-center lg:absolute -top-[0px] lg:-top-[122px]">
                            <img src={QuizzLogo} className='w-[200px]' />
                        </div>
                        <div className="message">
                            <span>Ce jeu est en version Bêta. Il se peut que lors de votre partie, vous rencontriez des problèmes de performances ou de gameplay.<br />Si c'est le cas, merci de vous rendre sur le serveur discord et de signaler le problème concerné</span>
                        </div>
                        <h3 className='text-[24px] font-bold'>Code de la room</h3>
                        <div className="flex flex-col lg:flex-row gap-4 w-full items-center">
                            <div className="relative w-full">
                                <input type="text" className='w-full' name="gameId" value={gameIdHidden ? "************************************" : globalValues.current.gameId} disabled />
                                <div className="absolute select-none top-0 bottom-0 mx-0 my-auto right-4 h-full" onClick={handleChangeGIHidden}>
                                    {gameIdHidden ? <Eye width={32} height={"100%"} /> : <EyeHide width={32} height={"100%"} />}
                                </div>
                            </div>
                            <BlueButton className={"w-full lg:w-auto"} onClick={copyLink}>Copier</BlueButton>
                        </div>
                        <div className="flex items-center gap-3">
                            <h3 className='text-[24px] font-bold'>Liste des joueurs</h3>
                            <h3 className='text-[14px] font-bold'>{playersCount < 10 && playersCount > 0 ? `0${playersCount}` : playersCount}/20</h3>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-grow overflow-y-auto h-[300px] lg:pr-4 lg:pb-4 lg:mb-4">
                            {
                                players.map((player, i) => {
                                    return (
                                        <UserCard
                                            className={`w-full lg:w-auto h-[82px] ${player?.isConnected ?? 'opacity-40'}`}
                                            twitchId={player.userId}
                                            key={i}
                                            data={{ username: (player !== undefined ? `${player?.username}` : ' - ') }}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 xl:flex-row w-full justify-between px-2 py-2" style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                            <BlueButton className={"w-full"} onClick={() => { settings.set(true) }}>
                                Paramètres
                            </BlueButton>
                            <BlueButton className={"w-full"} onClick={() => { setIsOpenHTP(true) }}>
                                Instructions
                            </BlueButton>
                        </div>
                        {globalValues.current.isLeader &&
                            <BlueButton onClick={launchGame}>
                                Lancer la partie
                            </BlueButton>
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full xl:w-[400px] lg:min-w-[400px]">
                    <div className="card p-4">
                        <div className="flex flex-col items-center gap-3 w-full">
                            <InputRange
                                label={`Nombres de ${gameModeCurrent?.labelElements}`}
                                value={globalValues.current.maximumQuestions}
                                onChange={questionsMaxChange}
                                min={gameModeCurrent?.minElements}
                                max={gameModeCurrent?.maxElements}
                                id="questions_max"
                            />
                            <span><b>Temps de jeu:</b> {timeGame} minutes </span>
                        </div>
                    </div>
                    <div className="card p-4 h-[15rem] lg:h-0 lg:flex-[1_1_0] w-full" style={{ justifyContent: 'flex-start', gap: '16px', alignItems: 'flex-start', overflow: 'auto' }}>
                        {globalValues.current.themes.map((s, i) => {

                            if (globalValues.current.isLeader) {

                                const onChangeTheme = (state, subIndex) => {
                                    if (subIndex !== undefined)
                                        globalValues.current.themes[i].subcategories[subIndex].state = !state
                                    else
                                        globalValues.current.themes[i].state = !state
                                    //setState(!state)
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

                                                                if (globalValues.current.gameMode == "classic" && sc.questionsLength == undefined) return;

                                                                if (sc.type == "theme") {
                                                                    return (
                                                                        <div className="flex flex-col items-start justify-start hover:bg-[rgba(0,0,0,0.2)] transition-all rounded-[0.275rem] px-2 mx-2 py-2" onClick={() => { onChangeTheme(state, i2) }}>
                                                                            <InputSwitch classNameContainer={"max-h-[28px]"} key={i2} state={sc.state} label={
                                                                                <div className='flex flex-col select-none'>
                                                                                    <span>{sc.dname}</span>
                                                                                    {globalValues.current.gameMode == "classic" && <span className='text-[12px] font-extralight'>{sc.questionsLength} Questions</span>}
                                                                                </div>
                                                                            } onChange={() => { onChangeTheme(sc.state, i2) }} />
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

                                                                if (globalValues.current.gameMode == "classic" && sc.questionsLength == undefined) return;

                                                                if (sc.type == "theme") {
                                                                    return (
                                                                        <div className="flex gap-2 hover:bg-[rgba(0,0,0,0.2)] transition-all rounded-[0.275rem] px-2 mx-2 py-2">
                                                                            <img src={(sc?.state ? TickValidIcon : TickNotValidIcon)} style={{ width: '24px', height: '24px' }} alt="" />

                                                                            <div className='flex flex-col select-none'>
                                                                                <span>{sc.dname}</span>
                                                                                {globalValues.current.gameMode == "classic" && <span className='text-[12px] font-extralight'>{sc.questionsLength} Questions</span>}
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
                    <div className="card flex-row justify-between p-4 items-start">
                        <div className="flex flex-col">
                            <span>Mode de jeu</span>
                            <h2 className='text-3xl font-bold text-gray-400 uppercase'>{gameModeParty?.name}</h2>
                        </div>
                        {globalValues.current.isLeader && <BlueButton onClick={() => { setIsOpenGameMode(true) }}>Changer</BlueButton>}

                    </div>
                    <BlueButton onClick={() => { report.set(true) }}>Signaler un problème</BlueButton>
                </div>
            </div>
            {globalValues.current.isLeader && <GameMode isOpen={isOpenGameMode} setIsOpen={setIsOpenGameMode} gamemodes={gameModes} gmSelect={{ val: selectedGameMode, set: setSelectedGameMode }} />}
            <HowToPlay isOpen={isOpenHTP} setIsOpen={setIsOpenHTP} />
            <ConfirmMaxQuestions data={{ lastError: globalValues.current.lastError }} launchGame={launchGame} emit={emit} />
            <CountDown data={{ launching: globalValues.current.launchingGame, timer: globalValues.current.timerCurrent }} />
        </div>
    )

}
