import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'sonner';
import crown from '../../../../../assets/icons/crown.svg'
import PenguinCard from '@/Components/User/PenguinCard';
import BlueButton from '@/Components/Navigation/Buttons/BlueButton';
import TickValidIcon from '../../../../../assets/icons/tick.svg'
import TimesValidIcon from '../../../../../assets/icons/times.svg'
import ReplayIcon from '@/Components/Icons/Replay';

import { copyToClipboard } from '@/Game/utils';
import Audio from '@/Game/audio';
import { useState } from 'react';
import Confetti from 'react-confetti';
import { useEffect } from 'react';
import Warn from '@/Components/Icons/Warn';
import SimpleButton from '@/Components/Navigation/Buttons/SimpleButton';

const QuizzResult = ({ auth, globalValues, modifyValues, report, emit }) => {

    const playersListScore = globalValues.current.players;
    const [audioPlaying, setAudioPlaying] = useState(null)

    function compareScores(player1, player2) {
        return player2.score - player1.score;
    }

    function compareIDPropos(propos1, propos2) {
        return propos1.id - propos2.id;
    }

    const returnLobby = () => {
        if (audioPlaying !== null) {
            audioPlaying.pause()
            audioPlaying.currentTime = 0
        }
        if (!globalValues.current.isLeader) return;
        emit('quizz_return_lobby', {})
    }

    const replaySound = (url) => {
        if (audioPlaying !== null) {
            audioPlaying.pause()
            audioPlaying.currentTime = 0
        }
        setAudioPlaying(Audio.playSound(url, 0.4, false))
    }

    useEffect(() => {
        if(globalValues.current.phaseId == 0) {
            //Force stop audio
            if (audioPlaying !== null) {
                audioPlaying.pause()
                audioPlaying.currentTime = 0
            }
        }
    }, [globalValues.current.phaseId])

    playersListScore.sort(compareScores);

    const firstPlayer = playersListScore[0];

    const yourAnswers = playersListScore.find((player) => player.userId == auth?.twitch?.id)

    return (
        <div className="flex w-full h-full gap-4">
            {firstPlayer.userId == auth?.twitch?.id &&
                <Confetti
                    className='confetti_index'
                    width={window.innerWidth}
                    height={window.innerHeight}
                    />
            }
            <div className="flex flex-col w-fit h-full justify-center gap-4">
                <div className="card items-start p-4 justify-start flex-1 gap-4 min-w-[450px] overflow-y-auto">
                    <h2 className='text-[24px] font-semibold py-2 text-center w-full'>Classement</h2>
                    {playersListScore.map((player, i) => {

                        const position = (i + 1);
                        let displayPosition = `${position}e`
                        if (position == 1) displayPosition = `${position}er`

                        return (
                            <div className="flex w-full items-center gap-4">
                                <h2 className='text-[38px] font-semibold min-w-[70px] text-center'>{displayPosition}</h2>
                                <div className={`player w-full ${player?.isConnected ? 'opacity-100' : 'opacity-40'}`} key={i}>
                                    {player?.isLeader &&
                                        <div className="badgeLeader">
                                            <img src={crown} style={{ width: '24px', height: '24px' }} alt="" />
                                        </div>
                                    }
                                    <PenguinCard className="w-full h-[82px]" style={{ backgroundColor: 'var(--container_background) !important;' }} skeleton={player == undefined} key={i} data={{ username: (player !== undefined ? `${player?.username}` : ' - '), points: player.score, stylePoints: 'default', background_type: "color", background_data: { color: 'var(--container_background)' } }} />
                                </div>
                            </div>
                        )

                    })}
                </div>
                {globalValues.current.isLeader ?
                    <BlueButton onClick={returnLobby}>Retour au lobby</BlueButton>
                    :
                    <div className="message">En attente du leader de la partie..</div>
                }

            </div>
            <div className="card justify-start flex-1 gap-4">
                {firstPlayer.userId == auth?.twitch?.id ?
                    <div className="flex justify-center rebondissement">
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 1 }}>V</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 2 }}>I</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 3 }}>C</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 4 }}>T</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 5 }}>O</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 6 }}>I</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 7 }}>R</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 8 }}>E</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 9 }}>!</span>
                    </div>
                    :
                    <div className="flex justify-center defall">
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 2 }}>D</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 3 }}>É</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 4 }}>F</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 5 }}>A</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 6 }}>I</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 7 }}>T</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 8 }}>E</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 9 }}>.</span>
                        <span className='rb-item font-bold text-[64px]' style={{ "--delay": 10 }}>.</span>
                    </div>
                }

                <h2 className='text-[24px] font-ligth'>Récap. des questions</h2>
                <div className="flex flex-1 flex-col gap-4 w-full overflow-y-auto pr-4">
                    {globalValues.current.questionsFinal.map((question, index) => {

                        const pa = question.proposal.find((pro) => pro.isAnswer)
                        const paPicture = question?.pictures?.find((pro) => pro.isAnswer)
                        const isBad = yourAnswers?.answers[index]?.data?.[0]?.isBad

                        const pictures = question?.pictures;

                        return (
                            <div key={question.asset} className="question_item card px-6 py-4 text-left justify-between flex-row w-full" style={{ background: isBad !== undefined ? isBad ? 'linear-gradient(128deg, var(--container_background) 55%, rgba(107,32,24,1) 100%)' : 'linear-gradient(128deg, var(--container_background) 55%, rgba(32,112,25,1) 100%)' : 'var(--container_background)' }}>
                                <div className="flex flex-col select-none">
                                    <span className='font-bold text-[20px]'>{question.sentence}</span>
                                    {question.type !== "picture_multiple" ?
                                        <span>{pa.text}</span>
                                        :
                                        <div className="flex">
                                            {pictures?.map((picture) => {
                                                return (
                                                    <img width={64} className={!picture.isAnswer && "grayscale"} src={picture?.url} alt="" />
                                                )
                                            })}
                                        </div>
                                    }
                                    <span onClick={() => {
                                        copyToClipboard(question.asset); toast.success('ID de la question copiée');
                                    }} className='text-[12px] mt-2'><b>ID:</b> {question.asset}</span>
                                </div>
                                <div className="flex select-none">
                                    <div className="warn" title='Signaler cette question' onClick={() => {
                                        report.set(true);
                                        setTimeout(() => {
                                            document.querySelector('.modal_qm_report #question_id').value = question.asset
                                            document.querySelector('.modal_qm_report #description').focus()
                                        }, 100)
                                    }}>
                                        <Warn width={48} height={48} />
                                    </div>
                                    {question.type == "sound" &&
                                        <div className="replay" onClick={() => { replaySound(question?.sound_url) }}>
                                            <ReplayIcon width={48} height={48} />
                                        </div>
                                    }
                                    <span><img width={48} src={!isBad ? TickValidIcon : TimesValidIcon} /></span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-end w-full">
                    <BlueButton href={route('games.quizz.form')} target="_blank">Proposer une nouvelle question</BlueButton>
                </div>
            </div>
            <style>
                {`
                    .rebondissement span.rb-item {
                        display: inline-block;
                        animation: rebondir 0.2s ease-in-out infinite alternate;
                        animation-delay: calc(0.1s * var(--delay));
                    }
                    .defall span.rb-item {
                        display: inline-block;
                        animation: rool 2s ease-in-out infinite alternate;
                    }

                    .question_item .warn {
                        display: none;
                    }
                    .question_item:hover .warn {
                        display: flex;
                    }

                    @keyframes rool {
                        0% {
                            transform: rotate(deg);
                        }
                        50% {
                            transform: rotate(-45deg);
                        }
                        100% {
                            transform: rotate(45deg);
                        }
                    }

                    @keyframes rebondir {
                        0% {
                          transform: translateY(0);
                        }
                        100% {
                          transform: translateY(-15px);
                        }
                    }
                `}
            </style>
        </div>
    )

}

export default QuizzResult;
