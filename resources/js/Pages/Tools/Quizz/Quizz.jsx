import { Head, usePage, router } from '@inertiajs/react';
import React, { useState, useEffect, useRef, useReducer } from 'react';
import BDWSocket from '../../../Game/socket';

import MainLayout from '@/Layouts/MainLayout';

import { toast } from 'sonner'

import { randomId } from '@/Game/random';
import QuizzLobby from './Phase/Lobby';
import QuizzQuestionShow from './Phase/QuizzQuestionShow';


import QuoteUpIcon from '../../../../assets/icons/quote-up.svg'
import QuoteDownIcon from '../../../../assets/icons/quote-down.svg'
import QuizzResult from './Phase/QuizzResult';

let socket = null;
const DEV = false;

export default function Quizz(props) {

    const [, forceUpdate] = useReducer((x) => x + 1, 0)
    const globalValues = useRef({
        init: false,
        socket: null,
        phaseId: 0,
        launchingGame: false,
        connectionError: false,
        lastError: undefined,
        gameId: props.gameId,
        maximumQuestions: 30,
        data: undefined,
        messages: [],
        alreadyPlaySoundQuestion: false,
        isLeader: false,
        answerCurrent: [],
        questionCurrent: undefined,
        timerCurrent: 5,
        resultSendAnswer: undefined,
        resultAnswersPlayers: undefined,
        themes: [],
        players: []
    });

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

    const emit = (event, args) => {
        if (globalValues.current.socket !== null) {
            const socket = globalValues.current.socket;
            socket.emit(event, args)
        }
    }

    useEffect(() => {
        if(!globalValues.current.init){
            const socket = new BDWSocket("quizz", {}, { userName: props.auth?.twitch?.display_name }, { gameId: globalValues.current?.gameId, userId: props.auth?.twitch?.id })
            modifyValues('socket', socket);
            if (globalValues.current.socket !== null) {
                function onConnect() {
                    if(globalValues.current.connectionError) {
                        toast.success('De nouveau connecté au serveur')
                        modifyValues('connectionError', false)
                    }
                }

                function onDisconnect() {
                    toast.error('Déconnecté du serveur')
                }

                globalValues.current.socket.on('connect', onConnect);
                globalValues.current.socket.on('disconnect', onDisconnect);

                globalValues.current.socket.on('quizz_sendGameID', (args) => {
                    modifyValues('gameId', args.gameID)
                })

                globalValues.current.socket.on('quizz_update_playerlist', (args) => {

                    //check if player is leader
                    const isLeader = args.list.find((p) => p.userId == props.auth?.twitch?.id && p.isLeader)
                    modifyValues('isLeader', isLeader)
                    modifyValues('players', args.list)
                })

                globalValues.current.socket.on('quizz_sendThemesState', (args) => {
                    console.log('update themes', args.list)
                    modifyValues('themes', args.list)
                })

                globalValues.current.socket.on('quizz_update_phaseid', (args) => {
                    modifyValues('phaseId', args.phaseId)
                })

                globalValues.current.socket.on('quizz_new_question_current', (args) => {
                    modifyValues('resultSendAnswer', undefined)
                    modifyValues('resultAnswersPlayers', undefined)
                    modifyValues('questionCurrent', args.questionData)
                    modifyValues('answerCurrent', [])
                })

                globalValues.current.socket.on('quizz_update_timer', (args) => {
                    modifyValues('timerCurrent', args.timer)
                })

                globalValues.current.socket.on('quizz_answer_result', (args) => {
                    modifyValues('resultSendAnswer', args)
                })

                globalValues.current.socket.on('quizz_answer_result_players', (args) => {
                    modifyValues('resultAnswersPlayers', args)
                })

                globalValues.current.socket.on('quizz_update_data', (args) => {
                    modifyValues('data', args)
                })

                globalValues.current.socket.on('quizz_launching_game', (args) => {
                    modifyValues('launchingGame', true)
                })

                globalValues.current.socket.on('quizz_new_chat_message', (args) => {
                    let messages = [...globalValues.current.messages]
                    messages = [args, ...messages];
                    modifyValues('messages', messages)
                })

                globalValues.current.socket.on('quizz_send_maximum_questions', (args) => {
                    modifyValues('maximumQuestions', args)
                })

                globalValues.current.socket.on('quizz_new_player', (player) => {
                    toast.info(`${player.username} a rejoint la partie !`)
                })

                globalValues.current.socket.on('errorMessage', (args) => {
                    modifyValues('lastError', (args.message !== "reset_error" ? args : undefined))
                    const checkFilter = errorMessagesFilter.find(msg => msg == args.message)
                    if(checkFilter) return;
                    toast.error(args.message)
                })

                globalValues.current.socket.on('error', (data) => {
                });

                globalValues.current.socket.on("connect_error", (err) => {
                    if(!globalValues.current.connectionError) {
                        toast.error(`Connexion au serveur échoué`);
                        modifyValues('connectionError', true)
                    }
                });

                modifyValues('init', true);

                return () => {
                    globalValues.current.socket.off('connect', onConnect);
                    globalValues.current.socket.off('disconnect', onDisconnect);
                }
            }
        }

    }, []);

    return (
        <>
            <MainLayout showOverflow={true} className={"flex flex-col items-center mb-12 pb-12 gap-8"}>
                <Head title="QuizzMaster" />
                {globalValues.current.phaseId == -1 && <></>}
                {globalValues.current.phaseId == 0 && <QuizzLobby auth={props.auth} globalValues={globalValues} modifyValues={modifyValues} emit={emit} />}
                {globalValues.current.phaseId == 1 || globalValues.current.phaseId == 2 ? <QuizzQuestionShow auth={props.auth} ziggy={props.ziggy} globalValues={globalValues} modifyValues={modifyValues} emit={emit} /> : <></>}
                {globalValues.current.phaseId == 3 && <QuizzResult auth={props.auth} globalValues={globalValues} modifyValues={modifyValues} emit={emit} />}
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
                    left: 18px;
                    z-index: 99999;
                    transform: rotate(-20deg);
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
                    font-weight: 600;
                    text-align: center;
                    -webkit-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    transition: all 0.1s ease-in-out;
                    min-width: 150px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
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
                    padding: 6rem 10rem;


                    font-size: 26px;
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
                    min-width: 200px;
                    min-height: 200px;
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
            `}
            </style>
        </>
    )

}
