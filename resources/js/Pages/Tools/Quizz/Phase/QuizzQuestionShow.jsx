import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'sonner';
import crown from '../../../../../assets/icons/crown.svg'
import PenguinCard from '@/Components/User/PenguinCard';
import { motion } from 'framer-motion'
import MusicIcon from '../../../../../assets/icons/music.svg'

import Audio from '@/Game/audio'
const QuizzQuestionShow = ({ auth, globalValues, modifyValues, emit }) => {

    const questionCurrent = globalValues.current.questionCurrent;
    let audioPlaying = null;

    const percentageTimer = () => {
        return (globalValues.current.timerCurrent / 15 * 100)
    }

    const selectAnswer = (propoId) => {
        if (globalValues.current.phaseId !== 1) {
            toast.error('Pas la phase de réponse :)')
            return;
        }
        if (globalValues.current.answerCurrent !== undefined) {
            toast.error('Déjà rep :)')
            return;
        }
        document.querySelector('.quizz_question_show .propal_button[dataanswer="' + propoId + '"]').classList.add('focused')
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

    if (questionCurrent !== undefined) {

        //play audio
        if (questionCurrent.type == 'sound' && !globalValues.current.alreadyPlaySound) {
            /*if(audioPlaying !== undefined) {
                audioPlaying.pause()
                audioPlaying = undefined;
            }*/
            modifyValues('alreadyPlaySound', true)
            audioPlaying = Audio.playSound(`http://weilsgames.test/storage/quizz/${questionCurrent?.asset}.mp3`, 0.4, false)
        }

        let questionPicture = questionCurrent?.picture_url;
        if(questionCurrent?.picture_reveal_url !== undefined && globalValues.current?.phaseId == 2) {
            questionPicture = questionCurrent?.picture_reveal_url;
        }

        return (
            <div className="flex w-full gap-8">
                <div className="quizz_question_show relative flex flex-1 flex-col items-center gap-6 card">
                    <div style={{ position: 'absolute', top: '20px', left: '20px', width: 90, height: 90 }}>
                        <CircularProgressbar strokeWidth={10} value={percentageTimer()} text={`${globalValues.current.timerCurrent}`}
                            styles={{
                                path: {
                                    // Path color
                                    stroke: `rgba(61.34, 105.63, 173.19, 1)`,
                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',
                                    // Customize transition animation
                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                    transformOrigin: 'center center',
                                },
                                trail: {
                                    // Trail color
                                    stroke: 'rgba(61.34, 105.63, 173.19, 0.20)',
                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'butt',
                                    // Rotate the trail
                                    transform: 'rotate(0.25turn)',
                                    transformOrigin: 'center center',
                                },
                                text: {
                                    fill: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '32px',
                                },
                            }}/>
                    </div>
                    <div className="flex w-full justify-center">
                        <span className='text-[24px] font-semibold'>Question {(globalValues.current?.data?.questionCursor + 1)}/{globalValues.current?.data?.maxQuestions}</span>
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
                    <div className="flex items-center gap-4">
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
            </div>
        )
    }

}

export default QuizzQuestionShow;
