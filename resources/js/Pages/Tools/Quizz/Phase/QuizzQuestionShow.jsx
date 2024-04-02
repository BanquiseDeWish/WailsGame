import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'sonner';
import crown from '../../../../../assets/icons/crown.svg'
import PenguinCard from '@/Components/User/PenguinCard';
import { motion } from 'framer-motion'
import MusicIcon from '../../../../../assets/icons/music.svg'
import QuizzLogo from '../../../../../assets/img/QuizzMasterLogo.webp'

import Audio from '@/Game/audio'
import MessageObject from '../Object/MessageObject';
import { useState } from 'react';
import GameSound from '@/Game/audio';
import { useEffect } from 'react';
const QuizzQuestionShow = ({ auth, globalValues, modifyValues, emit }) => {

    const [messageChat, setMessageChat] = useState("")
    let audioPlaying = null;

    const timerCurrent = globalValues.current.timerCurrent;

    const percentageTimer = () => {
        return (timerCurrent / 15 * 100)
    }

    const selectAnswer = (propoId) => {
        document.querySelector('.quizz_question_show .propal_button[dataanswer="' + propoId + '"]').classList.add('focused')
        if(globalValues.current.answerCurrent == undefined) {
            new GameSound('quizz_aw_send').playSound(0.5, false)
        }
        modifyValues('answerCurrent', propoId)
        emit('quizz_send_answer_player', { answer: propoId, gameId: globalValues.current.gameId, auth: auth.twitch.id })
    }

    const playersListScore = globalValues.current.players;

    function compareScores(player1, player2) {
        return player2.score - player1.score;
    }

    playersListScore.sort(compareScores);

    if (globalValues.current.resultSendAnswer !== undefined) {
        document.querySelectorAll('.quizz_question_show .propal_button').forEach((node) => {
            node.classList.remove('focused')
        })
    }

    const sendChatMessage = (event) => {
        if (event.key === 'Enter') {
            if(messageChat == "") return;
            setMessageChat("");
            emit('quizz_send_message_player', { message: messageChat })
        }
    }

    useEffect(() => {
        if(globalValues.current.resultSendAnswer !== undefined) {
            if(globalValues.current.resultSendAnswer?.answerGood == globalValues.current.resultSendAnswer?.answerSend) {
                new GameSound('quizz_aw_good').playSound(0.5, false)
            }else{
                new GameSound('quizz_aw_bad').playSound(0.5, false)
            }
        }
    }, [globalValues.current.resultSendAnswer])

    useEffect(() => {
        if(globalValues.current.questionCurrent !== null) {
            const questionCurrent = globalValues.current.questionCurrent;
            if (questionCurrent.type == 'sound') {
                let urlSound = `http://weilsgames.test/storage/quizz/${questionCurrent?.asset}.mp3`
                if(questionCurrent?.sound_url !== undefined) {
                    urlSound = questionCurrent?.sound_url
                }
                audioPlaying = Audio.playSound(urlSound, 0.4, false)
            }
        }
    }, [globalValues.current.questionCurrent])

    if (globalValues.current.questionCurrent !== undefined) {

        const questionCurrent = globalValues.current.questionCurrent;
        //play audio
        let questionPicture = undefined;

        if (questionPicture == undefined && questionCurrent?.picture_url !== undefined) {
            questionPicture = questionCurrent?.picture_url;
            if (questionCurrent?.picture_reveal_url !== undefined && globalValues.current?.phaseId == 2) {
                questionPicture = questionCurrent?.picture_reveal_url;
            }
        }

        if (questionCurrent?.picture_reveal_url !== undefined && globalValues.current?.phaseId == 2) {
            if (questionPicture !== questionCurrent?.picture_reveal_url) {
                questionPicture = questionCurrent?.picture_reveal_url;
            }
        }

        return (
            <div className="flex w-full gap-4 mt-8">
                <div className="quizz_question_show relative flex flex-1 flex-col items-center gap-6 card" style={{ paddingTop: '5.5rem' }}>
                    <div className="flex w-full justify-center" style={{ position: "absolute", top: "-82px" }}>
                        <img src={QuizzLogo} style={{ width: '20%' }} />
                    </div>
                    <div style={{ position: 'absolute', top: '20px', left: '20px', width: 90, height: 90 }}>
                        <CircularProgressbar strokeWidth={10} value={percentageTimer()} text={`${globalValues.current.timerCurrent}`}
                            styles={{
                                path: {
                                    stroke: `${globalValues.current?.phaseId == 2 ? 'rgba(61.34, 105.63, 173.19, 1)' : timerCurrent > 10 ? 'rgba(61.34, 105.63, 173.19, 1)' : timerCurrent > 5 ? 'yellow' : 'red'}`,
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
                                },
                            }} />
                    </div>
                    {questionCurrent.type == 'text' &&
                        <div className="relative rounded-[8px]" style={{ background: 'transparent' }}>
                            <div className="sentenceText">
                                {questionCurrent.sentence}
                            </div>
                        </div>
                    }
                    {questionCurrent.type == 'picture' &&
                        <img src={questionPicture !== undefined ?
                            questionPicture :
                            `http://weilsgames.test/storage/quizz/${questionCurrent?.asset}.webp`} style={{
                                maxHeight: "380px",
                                minHeight: "380px",
                                objectFit: "fill"
                            }} className="rounded-xl" alt="" />
                    }
                    {questionCurrent.type == 'sound' &&
                        <div className="music">
                            <img src={MusicIcon} style={{
                                maxHeight: "380px",
                                minHeight: "380px",
                                objectFit: "fill"
                            }} alt="" />
                        </div>
                    }
                    {questionCurrent.type == 'video' &&
                        <div className="video">
                            <video width="450" height="580">
                                <source src={`http://weilsgames.test/storage/quizz/${questionCurrent?.asset}.mp4`} type="video/mp4" />
                            </video>
                        </div>
                    }
                    <div className="flex flex-col items-center gap-1">
                        <span className='text-[24px] font-semibold'>Question {(globalValues.current?.data?.questionCursor + 1)}/{globalValues.current?.data?.maxQuestions}</span>
                        <h2 className="text-[24px] font-bold">
                            {questionCurrent.type !== 'text' ? questionCurrent.sentence : "Répondez à la question ci-dessus"}
                        </h2>
                    </div>
                    {/*Propal*/}
                    <div className="propal grid grid-cols-3 gap-4">
                        {questionCurrent.proposal.map((propo) => {
                            return (
                                <motion.div dataAnswer={propo.text} whileHover={{ scale: '1.05', transition: { duration: 800 } }} className={`propal_button ${globalValues.current.resultSendAnswer?.answerGood == propo.text ? 'good' : ''} ${globalValues.current.resultSendAnswer?.answerSend == propo.text ? globalValues.current.resultSendAnswer?.answerGood == propo.text ? 'good' : 'bad' : ''}`} onClick={() => { selectAnswer(propo.text) }}>
                                    {propo.text}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="players h-full">
                        <div className="card items-start p-4 justify-start h-full gap-4 min-w-[350px] overflow-y-auto">
                            {playersListScore.map((player, i) => {
                                return (
                                    <div className={`player w-full ${player?.isConnected ? 'opacity-100' : 'opacity-40'}`} key={i}>
                                        {player?.isLeader &&
                                            <div className="badgeLeader">
                                                <img src={crown} style={{ width: '24px', height: '24px' }} alt="" />
                                            </div>
                                        }
                                        <PenguinCard className="w-full h-[82px]" style={{ backgroundColor: 'var(--container_background) !important;' }} skeleton={player == undefined} key={i} data={{ username: (player !== undefined ? `${player?.username}` : ' - '), points: player.score, stylePoints: 'default', background_type: "color", background_data: { color: 'var(--container_background)' } }} />
                                    </div>
                                )

                            })}
                        </div>
                    </div>
                    <div className="card gap-2">
                        <h2 className='text-[20px] font-semibold'>Chat</h2>
                        <div className="messages w-full" style={{ height: '250px', overflowY: 'auto' }}>
                            {globalValues.current.messages.map((message) => {
                                return (
                                    <MessageObject data={message} />
                                )
                            })}
                        </div>
                        <div className="form w-full">
                            <input type="text" className='w-full' onChange={(e) => { setMessageChat(e.target.value) }} onKeyDown={sendChatMessage} value={messageChat} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default QuizzQuestionShow;
