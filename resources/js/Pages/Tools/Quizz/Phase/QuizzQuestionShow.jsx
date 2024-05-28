import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'sonner';
import crown from '../../../../../assets/icons/crown.svg'
import UserCard from '@/Components/User/UserCard';
import { motion } from 'framer-motion'
import MusicIcon from '../../../../../assets/icons/music.svg'
import QuizzLogo from '../../../../../assets/img/QuizzMasterLogo.webp'

import { copyToClipboard } from '@/Game/utils';
import Audio from '@/Game/audio'
import MessageObject from '../Object/MessageObject';
import { useState } from 'react';
import GameSound from '@/Game/audio';
import { useEffect } from 'react';
import RefreshIcon from '@/Components/Icons/RefreshIcon';
import CogIcon from '@/Components/Icons/Cog';
import ReplayIcon from '@/Components/Icons/Replay';
import PlayersList from '@/Components/Games/QuizzMaster/PlayersList';
const QuizzQuestionShow = ({ auth, ziggy, sv, settings, globalValues, modifyValues, emit }) => {

    const [messageChat, setMessageChat] = useState("")
    const [audioPlaying, setAudioPlaying] = useState(null)
    const [audioVolume, setAudioVolume] = useState(sv.volumeState)

    let questionPicture = undefined;

    const [isAnimatingNewQuestion, setIsAnimatingNewQuestion] = useState(true)
    const timerCurrent = globalValues.current.timerCurrent;

    const percentageTimer = () => {
        return (timerCurrent / 15 * 100)
    }

    const selectAnswer = (e, propoId) => {
        let answers = globalValues.current.answerCurrent;
        if (globalValues.current.answerCurrent.length > 0 && globalValues.current.questionCurrent.typeAnswer == "simple") {
            if (answers[0] == propoId) return;
            answers = [];
            if (globalValues.current.questionCurrent.type == 'picture_multiple') {
                document.querySelectorAll('.quizz_question_show .picture_proposal').forEach((node) => {
                    node.classList.remove('focused')
                })
            } else {
                document.querySelectorAll('.quizz_question_show .propal_button').forEach((node) => {
                    node.classList.remove('focused')
                })
            }
        }
        e.currentTarget.classList.add('focused')
        new GameSound('quizz_aw_send').playSound(getVolumeAudio(), false)
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

    const getVolumeAudio = () => {
        return localStorage.getItem('volume') !== undefined && localStorage.getItem('volume') !== null ? (parseInt(localStorage.getItem('volume')) / 10) : 0.5
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

    useEffect(() => {
        const result = globalValues.current.resultSendAnswer;
        if (result !== undefined) {
            const volume = new GameSound(result.isBad || result.answerSend.length == 0 ? 'quizz_aw_bad' : 'quizz_aw_good').playSound(getVolumeAudio(), false)
        }
    }, [globalValues.current.resultSendAnswer])

    useEffect(() => {
        setAudioPlaying(null)
        if (globalValues.current.questionCurrent !== undefined) {
            setTimeout(() => {
                const questionCurrent = globalValues.current.questionCurrent;
                if (questionCurrent.type == 'sound') {
                    let urlSound = `${ziggy.url}/storage/quizz/${questionCurrent?.asset}.mp3`
                    if (questionCurrent?.sound_url !== undefined) {
                        urlSound = questionCurrent?.sound_url
                    }
                    if (audioPlaying == null) {
                        const percentVolume = questionCurrent?.volume ?? 1
                        const volumeCalcul = getVolumeAudio() * percentVolume;
                        setAudioPlaying(Audio.playSound(urlSound, volumeCalcul, false))
                    }
                }
            }, 1000)
        }
    }, [globalValues.current.questionCurrent])

    useEffect(() => {
        if (globalValues.current.phaseId == 2) {
            if (audioPlaying !== null) {
                audioPlaying.pause()
                audioPlaying.currentTime = 0
                setAudioPlaying(null)
            }
            if (globalValues.current.timerCurrent <= 2) {
                if (!isAnimatingNewQuestion) {
                    setIsAnimatingNewQuestion(true)
                }
                modifyValues('resultSendAnswer', undefined)
                modifyValues('resultAnswersPlayers', undefined)
                modifyValues('answerCurrent', [])
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
            const percentVolume = questionCurrent?.volume ?? 1
            const volumeCalcul = getVolumeAudio() * percentVolume;
            if (questionCurrent?.type == "picture" && questionCurrent?.sound_reveal_url !== undefined) {
                Audio.playSound(questionCurrent?.sound_reveal_url, volumeCalcul, false)
            } else if (questionCurrent?.type == "sound" && questionCurrent?.sound_reveal_url !== undefined) {
                Audio.playSound(questionCurrent?.sound_reveal_url, volumeCalcul, false)
            }
        }
    }, [globalValues.current.phaseId])

    const replaySound = () => {
        if (globalValues.current.questionCurrent.type !== "sound") return toast.error('Aucun son ne peut être joué dans une question de ce type.')
        if (audioPlaying !== null) {
            const percentVolume = globalValues.current.questionCurrent?.volume ?? 1
            const volumeCalcul = getVolumeAudio() * percentVolume;
            audioPlaying.volume = volumeCalcul;
            audioPlaying.pause()
            audioPlaying.currentTime = 0
            audioPlaying.play()
        }
    }

    const copyIdQuestion = () => {
        copyToClipboard(globalValues.current.questionCurrent?.asset);
        toast.success("ID de la partie copié avec succès !")
    }

    useEffect(() => {
        setAudioVolume(sv.volumeState)
    }, [sv])

    useEffect(() => {
        if (audioPlaying !== null) {
            const percentVolume = globalValues.current.questionCurrent?.volume ?? 1
            const volumeCalcul = getVolumeAudio() * percentVolume;
            audioPlaying.volume = (volumeCalcul) / 10
        }
    }, [audioVolume])

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
            <div className="flex flex-col lg:flex-row items-center w-full h-full gap-4 mt-8">
                <div className="quizz_question_show px-2 pb-12 relative flex flex-1 flex-col items-center gap-6 card w-full lg:w-auto h-fit lg:h-[740px]" style={{ paddingTop: '5.5rem' }}>
                    <div className="flex w-full justify-center absolute -top-[60px] lg:-top-[82px]">
                        <img src={QuizzLogo} className='w-[200px]' />
                    </div>
                    <div className='w-[60px] md:w-[90px]' style={{ position: 'absolute', top: '20px', left: '20px' }}>
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
                        <div className="idQuestion flex flex-col justify-end items-end absolute top-3 right-3 text-right text-[12px] select-none">
                            <div className='hidden lg:flex gap-1 justify-end items-end' onClick={copyIdQuestion}><b>ID:</b> {questionCurrent.asset}<br /></div>
                            <div className='hidden lg:flex gap-1 justify-end items-end'>
                                <b>Catégorie:</b> {questionCurrent.category}<br />
                            </div>
                            <div className='hidden lg:flex gap-1 justify-end items-end'>
                                <b>Thème:</b> {questionCurrent.theme}
                            </div>

                            <div className="flex flex-col items-end mt-10 gap-2">
                                <div onClick={replaySound} className={`buttonFast ${questionCurrent.type !== "sound" && "disabled"} gap-2 justify-end right-3 text-[20px] select-none`}>
                                    <span>Rejouer le son</span> <ReplayIcon width={24} height={24} />
                                </div>
                                <div onClick={() => { settings.set(true) }} className="buttonFast gap-2 justify-end right-3 text-[20px] select-none">
                                    <span>Paramètres</span> <CogIcon width={24} height={24} />
                                </div>
                            </div>

                        </div>
                        <div className="authoQuestion absolute bottom-3 right-3 text-[10px] md:text-[12px] select-none" onClick={() => { }}>
                            Proposée par <b>{questionCurrent.author !== undefined ? questionCurrent.author.name : 'le staff'}</b>
                        </div>

                        {questionCurrent.type == 'text' &&
                            <div className="relative rounded-[8px]" style={{ background: 'transparent' }}>
                                <div className="sentenceText select-none text-[20px] md:text-[26px] px-[0rem] py-[4rem] md:px-[6rem] md:py-[10rem]">
                                    {questionCurrent.sentence}
                                </div>
                            </div>
                        }
                        {questionCurrent.type == 'picture' &&
                            <>
                                {!isAnimatingNewQuestion && <img src={questionPicture !== undefined ?
                                    questionPicture :
                                    `${ziggy.url}/storage/quizz/${questionCurrent?.asset}.webp`} style={{
                                        objectFit: "fill",
                                    }} className="max-h-[200px] md:max-h-[380px] rounded-xl select-none" alt="" />}
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
                                                objectFit: "fill"
                                            }} className="min-w-[100px] max-w-[100px] md:min-w-[200px] md:max-w-[200px] rounded-xl select-none" alt="" />}
                                        </motion.div>
                                    )
                                })}
                            </div>
                        }
                        {questionCurrent.type == 'sound' &&
                            <>
                                <div onClick={replaySound} className="music flex justify-center">
                                    <img src={globalValues.current.phaseId == 1 ? MusicIcon : questionCurrent?.picture_reveal_url !== undefined ? questionCurrent?.picture_reveal_url : MusicIcon} style={{
                                        maxHeight: "380px",
                                        minHeight: "380px",
                                        objectFit: "fill",
                                        userSelect: "none"
                                    }} className='w-[280px] md:w-[380px]' alt="" />
                                </div>
                            </>

                        }
                        <div className="flex flex-col items-center gap-1">
                            <span className='text-[18px] md:text-[24px] font-extralight select-none'>Question {(globalValues.current?.data?.questionCursor + 1)}/{globalValues.current?.data?.maxQuestions}</span>
                            <h2 className="text-[18px] md:text-[24px] text-center font-bold select-none">
                                {questionCurrent.type !== 'text' ? questionCurrent.sentence : "Répondez à la question ci-dessus"}
                            </h2>
                            {questionCurrent.type == 'picture_multiple' &&
                                <span className='text-[14px] md:text-[18px]'><i>Cliquez sur l'image correspondante</i></span>
                            }
                        </div>
                        {/*Propal*/}
                        {questionCurrent.type !== 'picture_multiple' &&
                            <>
                                <div className="propal flex w-fit justify-center flex-wrap gap-4">
                                    {questionCurrent?.proposal?.map((propo) => {

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
                                            <motion.div style={{ flex: '1 0 calc(33.33% - 20px)', maxWidth: 'calc(33.33% - 20px)', boxSizing: 'border-box' }} dataAnswer={propo.id} whileHover={{ scale: '1.05', transition: { duration: 800 } }} className={`propal_button text-[14px] desktop md:text-[16px] ${isGood ? 'good' : isGoodNotGiven ? 'goodNotGiven' : answerGive !== undefined ? answerGive.isBad ? 'bad' : '' : ''}`} onClick={(e) => { selectAnswer(e, propo.id) }}>
                                                {propo.text}
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </>

                        }
                    </motion.div>

                </div>
                <div className="hidden md:flex flex-col gap-4 w-full lg:w-auto pb-8 lg:pb-0">
                    <PlayersList playersListScore={playersListScore} globalValues={globalValues} />
                    <div className="card gap-2 p-4 w-full">
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
