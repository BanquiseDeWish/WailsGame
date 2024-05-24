import { Head, usePage, router } from '@inertiajs/react';
import React, { useState, useEffect, useRef, useReducer } from 'react';
import BDWSocket from '../../../Game/socket';

import MainLayout from '@/Layouts/MainLayout';

import { toast } from 'sonner'
import env from '../../../../../env.json'
import { randomId } from '@/Game/random';
import QuizzLobby from './Phase/Lobby';
import QuizzQuestionShow from './Phase/QuizzQuestionShow';

import QuizzLogo from '@assets/img/QuizzMasterLogo.webp'
import QuizzErrorServerPicture from '@assets/img/error_server.png'

import QuoteUpIcon from '@assets/icons/quote-up.svg'
import QuoteDownIcon from '@assets/icons/quote-down.svg'
import QuizzResult from './Phase/QuizzResult';
import Settings from './Modal/Settings';
import Report from './Modal/Report';
import QuizzScattegoriesShow from './Phase/QuizzScattergoriesShow';

import '@css/quizz.css';
import BlueButton from '@/Components/Navigation/Buttons/BlueButton';

let socket = null;
const DEV = false;

export default function Quizz(props) {

    const [isOpenSettings, setIsOpenSettings] = useState(false)
    const [isOpenReport, setIsOpenReport] = useState(false)
    const [settingsValues, setSettingsValues] = useState({
        volumeState: localStorage.getItem('volume') != undefined ? parseInt(localStorage.getItem('volume')) : 5,
        chatState: localStorage.getItem('chatState') !== undefined ? localStorage.getItem('chatState') !== "false" : false,
    })
    const [, forceUpdate] = useReducer((x) => x + 1, 0)

    const defaultValues = {
        init: false,
        socket: null,
        phaseId: 0,
        launchingGame: false,
        connectionError: { state: false, message: '' },
        lastError: undefined,
        gameId: props.gameId,
        maximumQuestions: 30,
        data: undefined,
        messages: [],
        questionsFinal: [],
        alreadyPlaySoundQuestion: false,
        isLeader: false,
        answerCurrent: [],
        questionCurrent: undefined,
        timerCurrent: 8,
        resultSendAnswer: undefined,
        resultAnswersPlayers: undefined,
        gameMode: 'classic',
        isLoaded: false,
        themes: [],
        players: [],
        scattergoriesDataValidator: undefined
    }

    const globalValues = useRef(defaultValues);

    const errorMessagesFilter = [
        "themes_enable_not_superior_max_questions",
        "reset_error"
    ]

    const modifyValues = (key, value) => {
        if(key == "update_themes_state") {

        }else{
            globalValues.current[key] = value;
        }
        forceUpdate();
    }

    const emit = (event, args, callback = (response) => {}) => {
        if (globalValues.current.socket !== null) {
            const socket = globalValues.current.socket;
            socket.emit(event, args, callback)
        }
    }

    const listen = (event, callback = () => {}) => {
        if (globalValues.current.socket !== null) {
            const socket = globalValues.current.socket;
            socket.on(event, callback)
        }
    }

    const unlisten = (event, callback = () => {}) => {
        if (globalValues.current.socket !== null) {
            const socket = globalValues.current.socket;
            socket.off(event, callback)
        }
    }

    const changeSetting = (key, val) => {
        if(key == "chatState") {
            setSettingsValues({ ...settingsValues, chatState: val })
            localStorage.setItem(key, val)
            return;
        }

        if(key == "volume")
            setSettingsValues({ ...settingsValues, volumeState: parseInt(val) })

        localStorage.setItem(key, parseInt(val))
    }

    const reconnect = () => {
        modifyValues('connectionError', { state: false, message: '' })
        globalValues.current.socket.reconnect()
    }

    useEffect(() => {
        let gvc = globalValues.current;
        if(!gvc.init){
            const socket = new BDWSocket("quizz", {}, { userName: props.auth?.twitch?.display_name }, { gameId: gvc?.gameId, userId: props.auth?.twitch?.id }, { reconnection: false, reconnect: false }, { url: env.quizzmaster_server, token: env.quizzmaster_server_secret })
            modifyValues('socket', socket);
            if (gvc.socket !== null) {
                function onConnect() {
                    if(!gvc.connectionError.state) {
                        toast.success('De nouveau connecté au serveur')
                        modifyValues('connectionError', { state: false, message: '' })
                    }
                }

                function onDisconnect(reason, details) {
                    if(!gvc.connectionError.state) {
                        toast.error(`Connexion perdue avec le serveur`);
                        modifyValues('isLoaded', false)
                        modifyValues('connectionError', { state: true, message: reason })
                    }
                    gvc = defaultValues;
                }

                gvc.socket.on('connect', onConnect);
                gvc.socket.on('disconnect', onDisconnect);

                gvc.socket.on('quizz_sendGameID', (args) => {
                    modifyValues('gameId', args.gameID)
                })

                gvc.socket.on('quizz_update_playerlist', (args) => {

                    //check if player is leader
                    const isLeader = args.list.find((p) => p.userId == props.auth?.twitch?.id && p.isLeader)
                    modifyValues('isLeader', isLeader)
                    modifyValues('players', args.list)
                })

                gvc.socket.on('quizz_sendThemesState', (args) => {
                    modifyValues('themes', args.list)
                })

                gvc.socket.on('quizz_update_phaseid', (args) => {
                    const gm = gvc.gameMode
                    if(args.phaseId == 0) {
                        modifyValues('launchingGame', false)
                    }
                    if(args.phaseId == 1) {
                        modifyValues('timerCurrent', (gm == "classic" ? 15 : 45))
                    }
                    if(args.phaseId == 2) modifyValues('timerCurrent', 6)
                    if(args.phaseId == 3) {
                        modifyValues('launchingGame', false)
                    }
                    modifyValues('phaseId', args.phaseId)
                })

                gvc.socket.on('quizz_new_question_current', (args) => {
                    modifyValues('questionCurrent', args.questionData)
                })

                gvc.socket.on('quizz_update_timer', (args) => {
                    modifyValues('timerCurrent', args.timer)
                })

                gvc.socket.on('quizz_answer_result', (args) => {
                    modifyValues('resultSendAnswer', args)
                })

                gvc.socket.on('quizz_answer_result_players', (args) => {
                    modifyValues('resultAnswersPlayers', args)
                })

                gvc.socket.on('quizz_update_data', (args) => {
                    modifyValues('data', args)
                })

                gvc.socket.on('quizz_launching_game', (args) => {
                    modifyValues('launchingGame', true)
                })

                gvc.socket.on('quizz_reset_other_data', (args) => {
                    modifyValues('launchingGame', false)
                    console.log(gvc)
                })

                gvc.socket.on('quizz_update_gamemode', (gameMode) => {
                    modifyValues('gameMode', gameMode)
                })

                gvc.socket.on('quizz_new_chat_message', (args) => {
                    let messages = [...gvc.messages]
                    messages = [args, ...messages];

                    //Check settings chat
                    const val = localStorage.getItem('chatState')
                    if(val !== undefined)
                        if(val !== "false")
                            return;

                    modifyValues('messages', messages)
                })

                gvc.socket.on('quizz_send_maximum_questions', (args) => {
                    modifyValues('maximumQuestions', args)
                })

                gvc.socket.on('quizz_new_player', (player) => {
                    toast.info(`${player.username} a rejoint la partie !`)
                })

                gvc.socket.on('quizz_reset_questions_final', (questions) => {
                    modifyValues('questionsFinal', [])
                })

                gvc.socket.on('quizz_receive_questions_final', (questions) => {
                    modifyValues('questionsFinal', questions)
                })

                gvc.socket.on('quizz_scattergories_validator_new_data', (args) => {
                    modifyValues('scattergoriesDataValidator', args)
                })

                gvc.socket.on('quizz_scattergories_validator_update_data', (args) => {
                    modifyValues('scattergoriesDataValidator', args)
                })

                gvc.socket.on('quizz_end_loaded', () => {
                    modifyValues('isLoaded', true);
                })

                gvc.socket.on('errorMessage', (args) => {
                    modifyValues('lastError', (args.message !== "reset_error" ? args : undefined))
                    if(args.message == 'too_many_players') {
                        document.location.href = route('games.quizz.index');
                        return;
                    }
                    const checkFilter = errorMessagesFilter.find(msg => msg == args.message)
                    if(checkFilter) return;
                    toast.error(args.message)
                })

                gvc.socket.on('error', (data) => {
                });

                gvc.socket.on("connect_error", (err) => {
                    if(!gvc.connectionError.state) {
                        toast.error(`Connexion au serveur échoué`);
                        modifyValues('connectionError', { state: true, message: err.message })
                    }
                    gvc = defaultValues;
                });

                modifyValues('init', true);

                return () => {
                    gvc.socket.off('connect', onConnect);
                    gvc.socket.off('disconnect', onDisconnect);
                }
            }
        }

    }, []);

    let componentGame = undefined;
    switch(globalValues.current.gameMode) {
        case 'classic':
            componentGame = <QuizzQuestionShow sv={settingsValues} settings={{ state: isOpenSettings, set: setIsOpenSettings }} auth={props.auth} ziggy={props.ziggy} globalValues={globalValues} modifyValues={modifyValues} socketListen={listen} emit={emit} />
            break;
        case 'scattergories':
            componentGame = <QuizzScattegoriesShow sv={settingsValues} settings={{ state: isOpenSettings, set: setIsOpenSettings }} auth={props.auth} ziggy={props.ziggy} globalValues={globalValues} modifyValues={modifyValues} socketListen={listen} socketOff={unlisten} emit={emit} />
            break;
    }

    return (
        <>
            <MainLayout showOverflow={true} className={"flex flex-col items-center mb-12 pb-12 gap-8"}>
                <Head title="QuizzMaster" />
                <Settings fsv={changeSetting} sv={settingsValues} isOpen={isOpenSettings} setIsOpen={setIsOpenSettings} />
                <Report gameId={globalValues.current.gameId} isOpen={isOpenReport} setIsOpen={setIsOpenReport} />
                {globalValues.current.phaseId == -1 && <></>}
                {!globalValues.current.isLoaded ?
                    <>
                        <div className={`flex flex-col select-none w-full text-center ${globalValues.current.connectionError.state ? 'gap-2': 'gap-16'} h-full justify-center items-center`}>
                            <img src={QuizzLogo} className='w-[300px]' />
                            {!globalValues.current.connectionError.state ?
                                <>
                                    <div className="loader-spinner" style={{ width: '80px', height: '80px' }} />
                                    <span><b className='text-[18px]'>Chargement de la partie</b><br/>veuillez patienter..</span>
                                </>
                            :
                                <>
                                    <img style={{ width: '300px' }} src={QuizzErrorServerPicture} alt="QuizzErrorServerPicture" />
                                    <span><b className='text-[22px]'>OOPS ! Quelque chose s'est mal passé !</b><br />Une erreur est survenue lors de la connexion au serveur<br/><b>Raison:</b> {globalValues.current.connectionError.message}</span>
                                    <BlueButton className={"mt-10"} onClick={reconnect}>Réessayer</BlueButton>
                                </>
                            }
                        </div>
                    </>
                    :
                    <>
                        {globalValues.current.phaseId == 0 && <QuizzLobby report={{ state: isOpenReport, set: setIsOpenReport }} settings={{ state: isOpenSettings, set: setIsOpenSettings }} auth={props.auth} globalValues={globalValues} modifyValues={modifyValues} emit={emit} />}
                        {globalValues.current.phaseId == 1 || globalValues.current.phaseId == 1.5 || globalValues.current.phaseId == 2 ? componentGame : <></>}
                        {globalValues.current.phaseId == 3 && <QuizzResult report={{ state: isOpenReport, set: setIsOpenReport }} settings={{ state: isOpenSettings, set: setIsOpenSettings }} auth={props.auth} globalValues={globalValues} modifyValues={modifyValues} emit={emit} />}
                    </>
                }
            </MainLayout>
            <style>{`
                :root {
                    --container_background: rgba(61.34, 105.63, 173.19, 0.20);
                    --content_background: #121A25;
                    --light_background: #2C3344;
                    --web_background: linear-gradient(254deg, #18273D 0%, #070A1E 100%);
                    --modal_background: linear-gradient(254deg, #1F304A 0%, #0D1B30 100%);
                    --input_placeholder_color: #57779D;
                }
                .player {
                    position: relative;
                }
                .badgeLeader {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    width: fit-content;
                    height: fit-content;
                    border-radius: 12px;
                    position: absolute;
                    top: 12px;
                    left: 88px;
                    z-index: 99999;
                    transform: rotate(-20deg);
                }
                .badgeLeader.lobby {
                    left: 18px !important;
                }
                .quizz_question_show .propal_button {
                    background: #324b68;
                    padding: 12px 16px;
                    border-radius: 8px;
                    font-weight: 600;
                    text-align: center;
                    -webkit-user-select: none; /* Safari */
                    -ms-user-select: none; /* IE 10 and IE 11 */
                    user-select: none;

                    transition: all 0.1s ease-in-out;
                    padding: 12px 16px;
                    border-radius: 8px;
                    text-align: center;
                    -webkit-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    transition: all 0.1s ease-in-out;
                    min-width: 150px;
                }
                @media (max-width: 768px) {
                    .quizz_question_show .propal_button {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
                @media (min-width: 768px) {
                    .quizz_question_show .propal_button {
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                }
                .quizz_question_show .propal_button.good {
                    background: #207019;
                    transform: scale(1.05) !important;
                }
                .quizz_question_show .propal_button.goodNotGiven {
                    outline: 4px solid #207019;
                    transform: scale(1.012) !important;
                }
                .quizz_question_show .propal_button.bad {
                    background: #6b2018;
                    transform: scale(1.05) !important;
                }
                .quizz_question_show .propal_button.focused {
                    background: #6095d1;
                    transform: scale(1.05) !important;
                }
                .quizz_question_show .sentenceText {
                    text-wrap: wrap;
                    text-align: center;
                    font-weight: normal;
                    font-style: italic;
                }
                .quizz_question_show .playerBad {
                    background: rgb(255,236,59);
                    background: -moz-linear-gradient(128deg, rgba(255,236,59,0) 0%, rgba(107,32,24,1) 100%);
                    background: -webkit-linear-gradient(128deg, rgba(255,236,59,0) 0%, rgba(107,32,24,1) 100%);
                    background: linear-gradient(128deg, rgba(255,236,59,0) 0%, rgba(107,32,24,1) 100%);
                    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffec3b",endColorstr="#6b2018",GradientType=1);
                }
                .quizz_question_show .playerGood {
                    background: rgb(255,236,59);
                    background: -moz-linear-gradient(128deg, rgba(255,236,59,0) 0%, rgba(32,112,25,1) 100%);
                    background: -webkit-linear-gradient(128deg, rgba(255,236,59,0) 0%, rgba(32,112,25,1) 100%);
                    background: linear-gradient(128deg, rgba(255,236,59,0) 0%, rgba(32,112,25,1) 100%);
                    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffec3b",endColorstr="#207019",GradientType=1);
                }
                .quizz_question_show .buttonFast {
                    background: var(--container_background);
                    border-radius: 8px;
                    padding: 6px;
                    width: 34px;
                    height: 34px;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }
                .quizz_question_show .buttonFast svg {
                    min-width: 24px;
                    min-height: 24px;
                }
                .quizz_question_show .buttonFast.disabled span, .quizz_question_show .buttonFast.disabled svg, .quizz_question_show .buttonFast.disabled svg path {
                    color: #787878;
                    fill: #787878;
                }
                .quizz_question_show .buttonFast span {
                    width: 0%;
                    text-overflow: ellipsis;
                    transition: all 0.2s ease-in-out;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .quizz_question_show .buttonFast.disabled:hover {
                    width: 34px;
                }
                .quizz_question_show .buttonFast:hover {
                    width: fit-content;
                }
                .quizz_question_show .buttonFast.disabled:hover span {
                    width: 0%;
                }
                .quizz_question_show .buttonFast:hover span {
                    width: 100%;
                }
                .messages {
                    display: flex;
                    flex-direction: column-reverse;
                    justify-content: flex-start;
                    gap: 8px;
                    width: 100%;
                }
                .message {
                    display: flex;
                    flex-direction: column;
                    background: var(--container_background);
                    width: 100%;
                    border-radius: 8px;
                    padding: 12px 16px;
                }
                .message .author{
                    font-weight: bold;
                }
                .message .content {
                    font-size: 14px;
                    width: 250px;
                    text-wrap: wrap;
                    word-wrap: break-word;
                }
                .picture_proposal {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    background: #324b68;
                    padding: 16px;
                    border-radius: 8px;
                    transition: 0.2s all ease-in-out;
                }
                .picture_proposal.focused {
                    background: #6095d1;
                    transform: scale(1.05) !important;
                }
                .picture_proposal.good {
                    background: #207019;
                    transform: scale(1.10) !important;
                }
                .picture_proposal.bad {
                    transform: scale(0.989) !important;
                }
                .picture_proposal img {
                    position: relative;
                    z-index: 1;
                }
                .picture_proposal.bad::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(2px);
                    border-radius: inherit;
                    z-index: 2;
                }
                .animate__animated.animate__heartBeat {
                    --animate-duration: 1s;
                    --animate-delay: 0s;
                }
            `}
            </style>
        </>
    )

}
