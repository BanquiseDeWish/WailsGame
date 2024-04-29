import { useValues } from './VIPGamesContext';

import VictoryLogo from '@assets/games/vipgames_victory.svg'
import Penguin from '@/Components/User/Penguin';
import { useEffect } from 'react';
import { useState } from 'react';

export default function VIP_RightContent() {

    const values = useValues().values;
    const modifyValue = useValues().modifyValue;
    const [winner, setWinner] = useState(undefined)

    useEffect(() => {
        setWinner(values.game_stats?.players?.find(p => p.id == values.game_stats?.tickets?.find(t => t.ticket == values.game_stats?.winning_tickets[0]).player));
    }, [values.game_end]);

    return (
        <>
            {values.game_end ? (

                <div className='flex flex-col h-full w-[440px] container justify-around'>
                    <div className='flex flex-col items-center gap-2 victory_icon_animation'>
                        <img src={VictoryLogo} alt="Victoire Icon" width={300}/>
                        <span className='font-light text-xl'>En {winner?.totalAttempt} tentative{winner?.totalAttempt > 1 && 's'} !</span>
                    </div>
                    
                    <div className='sub_container h-[80px] justify-between p-[16px] relative current_player snow_cap_player'>
                        <div className='flex justify-center items-center gap-[16px] p-[0px]'>
                            <img src={values.avatar} alt="" className='rounded-full h-[48px]' width={48} />
                            <div className='flex flex-col gap-[0px]'>
                                <div className='item_username'>{winner?.name}</div>
                                <div className='item_subtext'>Le Grand Pingouin Gagnant !</div>
                            </div>
                        </div>
                    </div>

                    <Penguin
                        userId={winner?.id}
                        size={{width: 240}}
                        className='drop-shadow-2xl scale-x-[-1]'
                    />

                </div>

            )
            :
            (

                <div className='flex flex-col gap-[24px] h-full w-[440px]'>
                    {/* Current Player */}
                    <div className='container h-[80px] justify-between p-[16px] relative current_player snow_cap_player'>
                        <div className='flex justify-center items-center gap-[16px] p-[0px]'>
                            <img src={values.avatar} alt="" className='rounded-full h-[48px]' width={48} />
                            <div className='flex flex-col gap-[0px]'>
                                <div className='item_username'>{values.current_player.name}</div>
                                <div className='item_subtext'>Un Pingouin Content de Jouer</div>
                            </div>
                        </div>
                        <div className='play_count_text'>
                            {values.playCount}
                        </div>

                        <div id='current_player_prio' className='transition-back my-hidden'>
                            PRIO
                        </div>
                    </div>

                    {/* Penguin and Points List */}
                    <div className='le-tchat container flex-grow relative snow_cap_points'>
                        <div id='penguin' className='flex justify-center items-center w-full h-full absolute my-hidden'>
                            Coming Soon
                        </div>

                        <div id='player_points' className='flex flex-col w-full h-full absolute p-[32px] gap-[16px] overflow-hidden'>
                            <div className='flex justify-center items-center w-full le-tchat'>
                                Les Joueurs & leurs points
                            </div>
                            <div className='flex flex-grow w-full flex-col gap-[8px] overflow-y-scroll pr-2'>
                                {values.players_points}
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};