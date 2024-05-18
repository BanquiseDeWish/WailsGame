import { usePage } from '@inertiajs/react';
import { useValues } from './VIPGamesContext';
import VictoryLogo from '@assets/games/vipgames_victory.svg'
import UserPenguin from '@/Components/User/UserPenguin';
import { useEffect } from 'react';
import { useState } from 'react';

import BinIcon from '@/Components/Icons/BinIcon';
import PlayersPointList from './Object/PlayersPointList';
import UserCard from '@/Components/User/UserCard';
import { randomId } from '@/Game/random';

export default function VIP_RightContent() {

    const props = usePage().props;
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

                    <UserPenguin
                        twitchId={winner?.id}
                        width={240}
                        className='drop-shadow-2xl scale-x-[-1]'
                    />

                </div>

            )
            :
            (

                <div className='flex flex-col gap-[24px] h-full w-[440px]'>
                    {/* Current Player */}
                    <UserCard 
                        className='relative h-[80px] w-full p-[16px] current_player container'
                        data={{
                            username: values.current_player.name,
                            points: values.playCount,
                            stylePoints: 'circle',
                            iconSize: 48,
                            background_style: 'none',
                        }}
                        components={[
                            <div id='current_player_prio' className='transition-back my-hidden'>
                                PRIO
                            </div>
                        ]}
                    />

                    {/* Penguin and Points List */}
                    <div className='le-tchat container flex-grow relative snow_cap_points'>
                        <div id='right_menu_penguin' className='flex justify-center items-center w-full h-full absolute my-hidden'>
                            <UserPenguin
                                twitchId={values.current_player.id}
                                width={320}
                                className='drop-shadow-2xl scale-x-[-1]'
                            />
                        </div>

                        <div id='player_points' className='flex flex-col w-full h-full absolute p-[32px] gap-[16px] overflow-hidden'>
                            <div className='flex justify-center items-center w-full le-tchat'>
                                Les Joueurs & leurs points
                            </div >
                            <div className='flex flex-grow w-full flex-col gap-[8px] overflow-y-auto pr-2'>
                            {
                                values.players.map((player, index) => {
                                    return (
                                        <UserCard
                                            className='relative'
                                            key={index}
                                            twitchId={player.id}
                                            data={{
                                                username: player?.name ?? 'Unknown player',
                                                points: player.points ?? 0,
                                                stylePoints: 'default',
                                                iconSize: 42,
                                                labelPoints: {
                                                    singular: 'pt',
                                                    plural: 'pts'
                                                }
                                            }}
                                            style={{
                                                padding: '12px 16px'
                                            }}
                                            components={[
                                                <div className='points_bin' onClick={() => { values.game.removePlayer(player.id) }}>
                                                    <BinIcon width={32} height={32} />
                                                </div>
                                            ]}
                                        />
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