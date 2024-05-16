import { usePage } from '@inertiajs/react';
import { useValues } from './VIPGamesContext';
import VictoryLogo from '@assets/games/vipgames_victory.svg'
import UserPenguin from '@/Components/User/UserPenguin';
import { useEffect } from 'react';
import { useState } from 'react';

import BinIcon from '@/Components/Icons/BinIcon';
import PlayersPointList from './Object/PlayersPointList';

export default function VIP_RightContent() {

    const props = usePage().props;
    const values = useValues().values;
    const modifyValue = useValues().modifyValue;
    const [winner, setWinner] = useState(undefined)
    console.log(values.players);

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

                    <UserPenguin
                        userId={winner?.id}
                        width={240}
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
                            <PlayersPointList
                                className="flex flex-grow w-full flex-col gap-[8px] overflow-y-scroll pr-2"
                                users_ids={values.players.map(player => player.id)}
                                players={values.players}  
                            />
                            <div className='flex flex-grow w-full flex-col gap-[8px] overflow-y-scroll pr-2'>
                                {
                                    values.players.map((player) => {
                                        return (
                                            <div key={randomId()} className='player_points_item relative'>
                                            <div className='flex justify-center items-center gap-[16px] w-full'>
                                                <img className='w-[32px] h-[32px] rounded-full' src={props.ziggy.url + '/api/user/' + player.id + '/icon'} alt="" width={32} />
                                                <div className='username_points'>{player.name}</div>
                                            </div>
                                            <div className='points'>
                                                <div className='points_number'>{player.points}</div>
                                                <div className='points_txt'>pts</div>
                                            </div>
                                            <div className='points_bin' onClick={() => { values.game.removePlayer(player.id) }}>
                                                <BinIcon width={32} height={32} />
                                            </div>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};