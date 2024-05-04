import PenguinCard from "@/Components/User/PenguinCard";

import QuizzLogo from '../../../../../assets/img/QuizzMasterLogo.webp'
import crown from '../../../../../assets/icons/crown.svg'
import MessageObject from "../Object/MessageObject";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { motion } from 'framer-motion'

export default function QuizzScattegoriesShow({ auth, ziggy, sv, settings, globalValues, modifyValues, emit }) {

    const [isAnimatingNewQuestion, setIsAnimatingNewQuestion] = useState(false)
    const [messageChat, setMessageChat] = useState("")
    const gvc = globalValues.current;
    const playersListScore = gvc.players;
    const countAnswersAttemp = 6;
    const [answers, setAnswers] = useState(Array.from(Array(countAnswersAttemp)))

    const timerCurrent = gvc.timerCurrent;
    const percentageTimer = () => {
        return (timerCurrent / 45 * 100)
    }

    const sendChatMessage = (event) => {
        if (event.key === 'Enter') {
            if (messageChat == "") return;
            setMessageChat("");
            const val = localStorage.getItem('chatState')
            if (val !== undefined)
                if (val !== "false")
                    return toast.error('Vous avez désactivé le chat, impossible d\'envoyer un message !');
            emit('quizz_send_message_player', { message: messageChat })
        }
    }

    function compareScores(player1, player2) {
        return player2.score - player1.score;
    }

    playersListScore.sort(compareScores);

    useEffect(() => {
        if (globalValues.current.phaseId == 1.5) {
            if (!isAnimatingNewQuestion) setIsAnimatingNewQuestion(true)
        } else if (globalValues.current.phaseId == 1) {
            if (isAnimatingNewQuestion) setIsAnimatingNewQuestion(false)
        }
    }, [globalValues.current.timerCurrent])

    useEffect(() => {
        const phaseId = gvc?.phaseId;
        if(phaseId == 1.5) {
            //Send answers to server
            console.log(answers)
            emit('quizz_send_answer_player', answers)
        }else if(phaseId == 1) {
            /*document.querySelectorAll('input.answer_input').forEach((node) => {
                node.value = ""
            })
            setAnswers([])*/
        }
    }, [gvc?.phaseId])

    useEffect(() => {
        console.log(answers)
    }, [answers])

    const handleChangeAnswer = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        const answer = answers.find((ans) => ans.id == parseInt(name));
        if(!answer) {
            setAnswers([
                ...answers,
                {id: parseInt(name), val: val}
            ]);
        }else{
            const answersCopy = [...answers]
            let answer = answersCopy.find((ans) => ans.id == parseInt(name));
            answer.val = val;
            setAnswers(answersCopy)
        }
    }

    return (
        <div className="flex flex-row justify-center gap-9 w-full h-full">
            <div className="sg_gamemode w-2/6 relative">
                <div className="flex w-full justify-center" style={{ position: "absolute", top: "-58px" }}>
                    <img src={QuizzLogo} style={{ width: '200px' }} />
                </div>
                <div className="relative content gap-2 overflow-hidden">
                    {isAnimatingNewQuestion &&
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={isAnimatingNewQuestion ? { x: 0, opacity: 1 } : { x: '-100%', opacity: 0 }}
                            transition={{ duration: 0.4 }} className="loading w-full h-full absolute top-0 flex items-center">
                            <h2 className='italic font-bold text-[36px] text-center w-full select-none'>
                                Manche suivante !
                            </h2>
                        </motion.div>
                    }
                    <motion.div
                        initial={{ x: 0, opacity: 1 }}
                        animate={isAnimatingNewQuestion ? { x: '-100%', opacity: 0 } : { x: '0%', opacity: 1 }}
                        transition={{ duration: 0.4 }} className='flex justify-center items-center flex-col gap-4 h-full'>
                        <div className="flex flex-col items-center gap-1 px-4 pt-12 py-4">
                            <div style={{ position: 'absolute', top: '20px', left: '20px', width: 90, height: 90 }}>
                                <CircularProgressbar strokeWidth={10} value={percentageTimer()} text={`${gvc?.timerCurrent}`}
                                    styles={{
                                        path: {
                                            stroke: `${gvc?.phaseId == 2 ? 'rgba(61.34, 105.63, 173.19, 1)' : timerCurrent > 10 ? 'rgba(61.34, 105.63, 173.19, 1)' : timerCurrent > 5 ? 'yellow' : 'red'}`,
                                            strokeLinecap: 'butt',
                                            transition: 'stroke-dashoffset 0.5s ease 0s',
                                            transformOrigin: 'center center',
                                        },
                                        trail: {
                                            stroke: 'rgba(61.34, 105.63, 173.19, 0.20)',
                                            strokeLinecap: 'butt',
                                            transform: 'rotate(0.25turn)',
                                            transformOrigin: 'center center',
                                        },
                                        text: {
                                            fill: '#fff',
                                            fontWeight: 'bold',
                                            fontSize: '32px',
                                            userSelect: 'none'
                                        },
                                    }} />
                            </div>
                            <span className="">Theme Master</span>
                            <span className="font-bold text-[32px]">Current Letter</span>
                            <span>Petit Bac - X/XX</span>
                        </div>
                        <div className="flex flex-col items-center justify-start overflow-y-auto gap-4 px-8  w-full h-full py-9" style={{ boxShadow: 'inset 0 5px 5px -5px rgba(0, 0, 0, 0.5)', borderRadius: '53% 46% 10% 10% / 5% 5% 0% 0%', background: 'rgba(0, 0, 0, 0.30)' }}>
                            {Array.from(Array(countAnswersAttemp)).map((val, i) => {
                                return (
                                    <div key={i} className="input-group w-full">
                                        <label htmlFor="subtheme">Subtheme {i}</label>
                                        <input className="answer_input w-full" type="text" name={i} onChange={handleChangeAnswer} />
                                    </div>
                                )
                            })}
                        </div>
                    </motion.div>

                </div>
            </div>
            <div className="players gap-6 h-full min-w-[350px] flex flex-col">
                <div className="card items-start p-4 justify-start max-h-[340px] min-h-[340px] gap-4 min-w-[350px] overflow-y-auto">
                    {playersListScore.map((player, i) => {

                        let isBad = undefined;
                        if (globalValues.current?.resultAnswersPlayers !== undefined) {
                            const playerFind = globalValues.current?.resultAnswersPlayers?.list?.find((pl) => pl.id == player.userId)
                            if (playerFind) {
                                isBad = playerFind.isBad
                            }
                        }

                        return (
                            <div className={`player w-full ${player?.isConnected ? 'opacity-100' : 'opacity-40'}`} key={i}>
                                {player?.isLeader &&
                                    <div className="badgeLeader">
                                        <img src={crown} style={{ width: '24px', height: '24px' }} alt="" />
                                    </div>
                                }
                                <PenguinCard className="w-full h-[82px] transition-all" style={{ backgroundColor: 'var(--container_background) !important;' }} skeleton={player == undefined} key={i} data={{ username: (player !== undefined ? `${player?.username}` : ' - '), points: player.score, stylePoints: 'default', background_type: "color", background_data: { color: isBad !== undefined ? isBad ? 'linear-gradient(128deg, var(--container_background) 55%, rgba(107,32,24,1) 100%)' : 'linear-gradient(128deg, var(--container_background) 55%, rgba(32,112,25,1) 100%)' : 'var(--container_background)' } }} />
                            </div>
                        )

                    })}
                </div>
                <div className="card flex-1 gap-2 p-4">
                    <h2 className='text-[20px] font-semibold select-none'>Chat</h2>
                    <div className="messages w-full" style={{ height: '250px', overflowY: 'auto' }}>
                        {globalValues.current.messages.map((message) => {
                            return (
                                <MessageObject data={message} />
                            )
                        })}
                    </div>
                    <div className="form w-full">
                        <input type="text" className='w-full' placeholder='Saisissez un message' onChange={(e) => { setMessageChat(e.target.value) }} onKeyDown={sendChatMessage} value={messageChat} />
                    </div>
                </div>
            </div>
        </div>
    )

}
