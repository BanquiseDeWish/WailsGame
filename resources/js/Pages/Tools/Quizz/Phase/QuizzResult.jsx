import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'sonner';
import crown from '../../../../../assets/icons/crown.svg'
import PenguinCard from '@/Components/User/PenguinCard';
import { motion } from 'framer-motion'
import MusicIcon from '../../../../../assets/icons/music.svg'

import Audio from '@/Game/audio'
import BlueButton from '@/Components/Navigation/Buttons/BlueButton';
const QuizzResult = ({ auth, globalValues, modifyValues, emit }) => {


    const playersListScore = globalValues.current.players;

    function compareScores(player1, player2) {
        return player2.score - player1.score;
    }

    playersListScore.sort(compareScores);

    return (
        <div className="flex flex-col w-fit h-full justify-center gap-8">
            <div className="card items-start p-4 justify-start flex-1 gap-4 min-w-[450px] overflow-y-auto">
                <h2 className='text-[24px] font-semibold py-2 text-center w-full'>Classement</h2>
                {playersListScore.map((player, i) => {

                    const position = (i + 1);
                    let displayPosition = `${position}e`
                    if(position == 1) displayPosition = `${position}er`

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
            <BlueButton onClick={() => { document.location.href = route('games.quizz.index') }}>Retour au lobby</BlueButton>
        </div>
    )

}

export default QuizzResult;
