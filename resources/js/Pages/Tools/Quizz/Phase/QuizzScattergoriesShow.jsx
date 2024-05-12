import PenguinCard from "@/Components/User/PenguinCard";

import QuizzLogo from '../../../../../assets/img/QuizzMasterLogo.webp'
import crown from '../../../../../assets/icons/crown.svg'
import MessageObject from "../Object/MessageObject";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { motion } from 'framer-motion'
import RedButton from "@/Components/Navigation/Buttons/RedButton";
import GreenButton from "@/Components/Navigation/Buttons/GreenButton";
import PlayersList from "@/Components/Games/QuizzMaster/PlayersList";

export default function QuizzScattegoriesShow({ auth, ziggy, sv, settings, globalValues, modifyValues, emit }) {

    const [isAnimatingNewQuestion, setIsAnimatingNewQuestion] = useState(false)
    const [messageChat, setMessageChat] = useState("")
    const gvc = globalValues.current;
    const playersListScore = gvc.players;
    const countAnswersAttemp = gvc?.questionCurrent?.themes?.length || 0;

    const [answers, setAnswers] = useState([])
    let sdd_playerAnswers = undefined;
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
        } else if (globalValues.current.phaseId == 1 || globalValues.current.phaseId == 2) {
            if (isAnimatingNewQuestion) setIsAnimatingNewQuestion(false)
        }
    }, [globalValues.current.timerCurrent])

    useEffect(() => {
        const phaseId = gvc?.phaseId;
        if (phaseId == 1.5) {
            //Send answers to server
            emit('quizz_send_answer_player', answers)
        } else if (phaseId == 1) {
            document.querySelectorAll('input.answer_input').forEach((node) => {
                node.value = ""
            })
            setAnswers([])
        }
    }, [gvc?.phaseId])

    useEffect(() => {
        console.log(gvc?.questionCurrent)
    }, [gvc?.questionCurrent])

    useEffect(() => {
        console.log('Update sdv', gvc?.scattergoriesDataValidator)
    }, [gvc?.scattergoriesDataValidator])

    const handleChangeAnswer = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        const answer = answers.find((ans) => ans.id == parseInt(name));
        if (!answer) {
            setAnswers(prevArray => {
                const newArray = [...prevArray];
                newArray.splice(parseInt(name), 0, { id: parseInt(name), val: val });
                return newArray;
            });
        } else {
            const answersCopy = [...answers]
            let answer = answersCopy.find((ans) => ans.id == parseInt(name));
            answer.val = val;
            setAnswers(answersCopy)
        }
    }

    const handleChangeAnswerState = (idAnswer, bool) => {
        if(!globalValues.current.isLeader) return;
        const sdd = gvc?.scattergoriesDataValidator;
        const answerData = sdd_playerAnswers.find((ans) => ans.id == gvc?.scattergoriesDataValidator?.roundData?.id);
        const answer = answerData?.data.find((ans) => ans.id == idAnswer);
        if(!answer) return;
        answer.isBad = bool;
        emit('quizz_scattergories_validator_update_data', sdd)
    }

    const nextDataValidator = () => {
        if(!globalValues.current.isLeader) return;
        emit('quizz_scattergories_validator_next_data', sdd)
    }

    const sdd = gvc?.scattergoriesDataValidator;
    if (sdd) {
        sdd_playerAnswers = sdd.playerData?.answers;
        if(sdd_playerAnswers !== undefined) {
            const answerData = sdd_playerAnswers.find((ans) => ans.id == gvc?.scattergoriesDataValidator?.roundData?.id);
            for (let i = 0; i < answerData?.data?.length; i++) {
                if(answerData.data[i].isBad == undefined) {
                    answerData.data[i].isBad = true;
                }
            }
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
                                {((gvc?.data?.questionCursor) + 1) == (gvc?.data?.maxQuestions) ? "Passons aux réponses !" : "Manche suivante !"}
                            </h2>
                        </motion.div>
                    }
                    <motion.div
                        initial={{ x: 0, opacity: 1 }}
                        animate={isAnimatingNewQuestion ? { x: '-100%', opacity: 0 } : { x: '0%', opacity: 1 }}
                        transition={{ duration: 0.4 }} className='flex justify-center items-center flex-col gap-4 w-full h-full'>
                        <div className="flex flex-col w-full items-center gap-1 px-4 pt-12 py-4">
                            {gvc?.phaseId == 1 &&
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
                            }
                            {gvc.phaseId == 1 || gvc.phaseId == 1.5 ? <span className="text-[32px]">Lettre <b>{gvc?.questionCurrent?.letter}</b></span> : <></>}
                            {gvc.phaseId == 2 && <span className="text-[32px]">Lettre <b>{gvc?.scattergoriesDataValidator?.roundData?.letter}</b></span>}
                            <span className="">Thème: <b>{gvc?.questionCurrent?.themeMaster?.dname}</b></span>
                            {gvc.phaseId == 1 || gvc.phaseId == 1.5 ? <span>Petit Bac - Manche {(gvc?.data?.questionCursor) + 1}/{gvc?.data?.maxQuestions}</span> : <></>}
                            {gvc.phaseId == 2 && <span>Validation des réponses <br /> de <b>{gvc?.scattergoriesDataValidator?.playerData?.username}</b></span>}
                        </div>
                        {gvc.phaseId !== 2 ?
                            <div className="flex flex-col items-center justify-start overflow-y-auto gap-4 px-8  w-full h-full py-9" style={{ boxShadow: 'inset 0 5px 5px -5px rgba(0, 0, 0, 0.5)', borderRadius: '53% 46% 10% 10% / 5% 5% 0% 0%', background: 'rgba(0, 0, 0, 0.30)' }}>
                                {Array.from(Array(countAnswersAttemp)).map((val, i) => {
                                    return (
                                        <div key={i} className="input-group w-full">
                                            <label htmlFor="subtheme">{gvc?.questionCurrent?.themes?.[i]?.dname}</label>
                                            <input className="answer_input w-full" type="text" name={i} onChange={handleChangeAnswer} />
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            <div className="flex flex-col items-center justify-start overflow-y-auto gap-4 px-8  w-full h-full py-9" style={{ boxShadow: 'inset 0 5px 5px -5px rgba(0, 0, 0, 0.5)', borderRadius: '53% 46% 10% 10% / 5% 5% 0% 0%', background: 'rgba(0, 0, 0, 0.30)' }}>
                                {Array.from(Array(gvc?.scattergoriesDataValidator?.roundData?.themes?.length)).map((val, i) => {
                                    let isBad = false;
                                    console.log('Before crash', sdd_playerAnswers)
                                    if(sdd_playerAnswers !== undefined) {
                                        const answer = sdd_playerAnswers.find((ans) => ans.id == gvc?.scattergoriesDataValidator?.roundData?.id)?.data?.find((ans) => ans.id == i)
                                        isBad = answer?.isBad;
                                        return (
                                            <div key={i} className="flex w-full gap-2 items-end">
                                                <div className="flex flex-col gap-2 flex-1">
                                                    <span>{gvc?.scattergoriesDataValidator?.roundData?.themes?.[i]?.dname}</span>
                                                    <div className="card w-full p-4 justify-start items-start">
                                                        {answer?.val == undefined ? "Sans réponse" : answer?.val}
                                                    </div>
                                                </div>
                                                <div className="flex gap-1">
                                                    <div className="inline-flex rounded-lg ">
                                                        <div onClick={() => { handleChangeAnswerState(answer?.id, false) }} className={`select-none py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10  ${!isBad ? "bg-green-500 text-gray-800" : "bg-[#121A25] text-white"}  shadow-sm`}>
                                                            Correcte
                                                        </div>
                                                        <div onClick={() => { handleChangeAnswerState(answer?.id, true) }} className={`select-none  py-3 px-4 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10  ${isBad ? "bg-red-500 text-gray-800" : "bg-[#121A25] text-white"}  shadow-sm`}>
                                                            Incorrecte
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                })}
                                <div className="flex justify-center w-full">
                                    <GreenButton onClick={nextDataValidator}>Suivant</GreenButton>
                                </div>
                            </div>
                        }
                    </motion.div>

                </div>
            </div>
            <div className="players gap-6 h-full min-w-[350px] flex flex-col">
                <PlayersList globalValues={globalValues} playersListScore={playersListScore} />
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
