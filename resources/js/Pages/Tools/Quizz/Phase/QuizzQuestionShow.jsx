import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'sonner';
import crown from '../../../../../assets/icons/crown.svg'
import PenguinCard from '@/Components/User/PenguinCard';
import { motion } from 'framer-motion'
import MusicIcon from '../../../../../assets/icons/music.svg'
import QuizzLogo from '../../../../../assets/img/QuizzMasterLogo.webp'

import { copyToClipboard } from '@/Game/utils';
import Audio from '@/Game/audio'
import MessageObject from '../Object/MessageObject';
import { useState } from 'react';
import GameSound from '@/Game/audio';
import { useEffect } from 'react';
const QuizzQuestionShow = ({ auth, ziggy, globalValues, modifyValues, emit }) => {

    const [messageChat, setMessageChat] = useState("")
    let audioPlaying = null;
    let questionPicture = undefined;
    const [isAnimatingNewQuestion, setIsAnimatingNewQuestion] = useState(true)
    const timerCurrent = globalValues.current.timerCurrent;

    const percentageTimer = () => {
        return (timerCurrent / 15 * 100)
    }

    const selectAnswer = (e, propoId) => {
        const answers = globalValues.current.answerCurrent;
        if (globalValues.current.answerCurrent.length > 0 && globalValues.current.questionCurrent.typeAnswer == "simple") return;
        e.currentTarget.classList.add('focused')
        new GameSound('quizz_aw_send').playSound(0.5, false)
        answers.push(propoId);
        modifyValues('answerCurrent', answers)
        emit('quizz_send_answer_player', { answer: answers, gameId: globalValues.current.gameId, auth: auth.twitch.id })
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
            if (messageChat == "") return;
            setMessageChat("");
            emit('quizz_send_message_player', { message: messageChat })
        }
    }

    useEffect(() => {
        const result = globalValues.current.resultSendAnswer;
        if (result !== undefined) {
            new GameSound(result.isBad || result.answerSend.length == 0 ? 'quizz_aw_bad' : 'quizz_aw_good').playSound(0.5, false)
        }
    }, [globalValues.current.resultSendAnswer])

    useEffect(() => {
        if (globalValues.current.questionCurrent !== undefined) {
            setTimeout(() => {
                const questionCurrent = globalValues.current.questionCurrent;
                if (questionCurrent.type == 'sound') {
                    let urlSound = `${ziggy.url}/storage/quizz/${questionCurrent?.asset}.mp3`
                    if (questionCurrent?.sound_url !== undefined) {
                        urlSound = questionCurrent?.sound_url
                    }
                    audioPlaying = Audio.playSound(urlSound, 0.4, false)
                }
            }, 1000)
        }
    }, [globalValues.current.questionCurrent])

    useEffect(() => {
        if (globalValues.current.phaseId == 2) {
            if (globalValues.current.timerCurrent <= 2) {
                if (!isAnimatingNewQuestion) {
                    setIsAnimatingNewQuestion(true)
                }
                questionPicture = undefined;
            }
        } else if (globalValues.current.phaseId == 1) {
            if (isAnimatingNewQuestion) {
                setIsAnimatingNewQuestion(false)
            }
        }
    }, [globalValues.current.timerCurrent])

    useEffect(() => {
        const phaseId = globalValues.current.phaseId;
        const questionCurrent = globalValues.current.questionCurrent;
        if (phaseId == 2) {
            if (questionCurrent?.type == "picture" && questionCurrent?.sound_reveal_url !== undefined) {
                Audio.playSound(questionCurrent?.sound_reveal_url, 0.4, false)
            } else if (questionCurrent?.type == "sound" && questionCurrent?.sound_reveal_url !== undefined) {
                Audio.playSound(questionCurrent?.sound_reveal_url, 0.4, false)
            }
        }
    }, [globalValues.current.phaseId])

    const copyIdQuestion = () => {
        copyToClipboard(globalValues.current.questionCurrent?.asset);
        toast.success("ID de la partie copié avec succès !")
    }

    if (globalValues.current.questionCurrent !== undefined) {

        const questionCurrent = globalValues.current.questionCurrent;
        //play audio

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
                <div className="quizz_question_show relative flex flex-1 flex-col items-center gap-6 card" style={{ paddingTop: '5.5rem', minHeight: '740px', maxHeight: '740px' }}>
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
                                    userSelect: 'none'
                                },
                            }} />
                    </div>

                    {isAnimatingNewQuestion &&
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={isAnimatingNewQuestion ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                            transition={{ duration: 0.1 }} className="loading w-full h-full absolute top-0 flex items-center">
                            <h2 className='italic font-bold text-[36px] text-center w-full select-none'>
                                {(globalValues.current?.data?.questionCursor + 1) == (globalValues.current?.data?.maxQuestions) ? "Partie terminée !" : "Question suivante !"}
                            </h2>
                        </motion.div>
                    }
                    <motion.div
                        initial={{ x: 0, opacity: 1 }}
                        animate={isAnimatingNewQuestion ? { x: -100, opacity: 0 } : { x: 0, opacity: 1 }}
                        transition={{ duration: 0.1 }} className='flex justify-center items-center flex-col gap-4'>
                        <div className="idQuestion absolute top-3 right-3 text-right text-[12px] select-none" onClick={copyIdQuestion}>
                            <b>ID:</b> {questionCurrent.asset}<br />
                            <b>Catégorie:</b> {questionCurrent.category}<br />
                            <b>Thème:</b> {questionCurrent.theme}
                        </div>
                        <div className="authoQuestion absolute bottom-3 right-3 text-[12px] select-none" onClick={() => { }}>
                            Proposée par <b>{questionCurrent.author !== undefined ? questionCurrent.author.name : 'le staff'}</b>
                        </div>
                        {questionCurrent.type == 'text' &&
                            <div className="relative rounded-[8px]" style={{ background: 'transparent' }}>
                                <div className="sentenceText select-none">
                                    {questionCurrent.sentence}
                                </div>
                            </div>
                        }
                        {questionCurrent.type == 'picture' &&
                            <>
                                {!isAnimatingNewQuestion && <img src={questionPicture !== undefined ?
                                    questionPicture :
                                    `${ziggy.url}/storage/quizz/${questionCurrent?.asset}.webp`} style={{
                                        maxHeight: "380px",
                                        minHeight: "380px",
                                        objectFit: "fill",
                                    }} className="rounded-xl select-none" alt="" />}
                            </>
                        }
                        {questionCurrent.type == 'picture_multiple' &&
                            <div className="grid grid-cols-2 gap-4">
                                {questionCurrent.pictures?.map((picture, index) => {

                                    let isGood = undefined;
                                    let answerGive = undefined;
                                    const result = globalValues.current.resultSendAnswer;
                                    if (result !== undefined && result.answerSend !== undefined) {
                                        answerGive = result.answerSend?.find((answer) => answer.id == picture.id);
                                        isGood = false;
                                        for (let i = 0; i < result.answerGood.length; i++) {
                                            const answer = result.answerGood[i];
                                            if (answer == picture.id) {
                                                isGood = result.answerGood.includes(picture.id) && result.answerSend.find((ans) => ans.id == answer) !== undefined
                                            }
                                        }
                                    }

                                    return (
                                        <motion.div whileHover={{ scale: '1.05', transition: { duration: 800 } }} className={`picture_proposal ${isGood !== undefined ? result.answerGood[0] == picture.id ? 'good' : 'bad' : 'test'}`} onClick={(e) => { selectAnswer(e, picture.id) }}>
                                            {!isAnimatingNewQuestion && <img src={picture.url} style={{
                                                maxHeight: "200px",
                                                minHeight: "200px",
                                                objectFit: "fill"
                                            }} className="rounded-xl select-none" alt="" />}
                                        </motion.div>
                                    )
                                })}
                            </div>
                        }
                        {questionCurrent.type == 'sound' &&
                            <div className="music flex justify-center">
                                <img src={globalValues.current.phaseId == 1 ? MusicIcon : questionCurrent?.picture_reveal_url !== undefined ? questionCurrent?.picture_reveal_url : MusicIcon} style={{
                                    maxHeight: "380px",
                                    minHeight: "380px",
                                    objectFit: "fill",
                                    userSelect: "none"
                                }} alt="" />
                            </div>
                        }
                        <div className="flex flex-col items-center gap-1">
                            <span className='text-[24px] font-extralight select-none'>Question {(globalValues.current?.data?.questionCursor + 1)}/{globalValues.current?.data?.maxQuestions}</span>
                            <h2 className="text-[24px] font-bold select-none">
                                {questionCurrent.type !== 'text' ? questionCurrent.sentence : "Répondez à la question ci-dessus"}
                            </h2>
                            {questionCurrent.type == 'picture_multiple' &&
                                <span><i>Cliquez sur l'image correspondante</i></span>
                            }
                        </div>
                        {/*Propal*/}
                        {questionCurrent.type !== 'picture_multiple' &&
                            <div className="propal w-fit grid grid-cols-3 gap-4">
                                {questionCurrent.proposal.map((propo) => {

                                    let isBad = undefined;
                                    let isGood = undefined;
                                    let isGoodNotGiven = undefined;
                                    let answerGive = undefined;
                                    const result = globalValues.current.resultSendAnswer;
                                    if (result !== undefined && result.answerSend !== undefined) {
                                        answerGive = result.answerSend?.find((answer) => answer.id == propo.id);
                                        for (let i = 0; i < result.answerGood.length; i++) {
                                            const answer = result.answerGood[i];
                                            if (answer == propo.id) {
                                                isGood = result.answerGood.includes(propo.id) && result.answerSend.find((ans) => ans.id == answer) !== undefined
                                                isGoodNotGiven = result.answerGood.includes(propo.id) && result.answerSend.find((ans) => ans.id == answer) == undefined
                                            }
                                        }
                                    }

                                    return (
                                        <motion.div dataAnswer={propo.id} whileHover={{ scale: '1.05', transition: { duration: 800 } }} className={`propal_button ${isGood ? 'good' : isGoodNotGiven ? 'goodNotGiven' : answerGive !== undefined ? answerGive.isBad ? 'bad' : '' : ''}`} onClick={(e) => { selectAnswer(e, propo.id) }}>
                                            {propo.text}
                                        </motion.div>
                                    )
                                })}
                            </div>
                        }
                    </motion.div>

                </div>
                <div className="flex flex-col gap-4">
                    <div className="players h-full">
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
                    </div>
                    <div className="card gap-2 gap-2 p-4">
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

}

export default QuizzQuestionShow;
