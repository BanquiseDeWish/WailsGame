import { usePage } from '@inertiajs/react';
import { useValues } from './VIPGamesContext';

import HourGlass from '@assets/icons/stats/hourglass.svg';
import Star from '@assets/icons/stats/star.svg';
import Users from '@assets/icons/stats/users.svg';
import TicketColor from '@assets/icons/stats/tickets_color.svg';
import { useEffect, useState } from 'react';

import { formatTime } from '@/Game/utils';
import UserCard from '@/Components/User/UserCard';
import { randomId } from '@/Game/random';

import UserIcon from '@assets/img/vipgames/user_icon.png';
import SlotComponent from '@/Components/Games/VIPGames/Slot';

export default function VIP_MiddleContent() {

    const props = usePage().props;
    const values = useValues().values;
    const modifyValue = useValues().modifyValue;
    const [mostUseBonus, setMostUseBonus] = useState(undefined);
    const [gameDuration, setGameDuration] = useState(undefined);

    useEffect(() => {
        if(values.game_stats == undefined)
            return;
        let bonus = [];
        values.game_stats?.bonus?.forEach(b => {
            if(bonus[b.bonus] == undefined)
                bonus[b.bonus] = 0;
            bonus[b.bonus]++;
        });
        setMostUseBonus(Object.keys(bonus).reduce((a, b) => bonus[a] > bonus[b] ? a : b));
        setGameDuration(values.game_stats?.gameTime);
    }, [values.game_end]);

    return (
        <>
        { values.game_end ? (
            <div className='flex flex-col justify-between h-full w-[980px] relative container p-6'>
                <span className='text-3xl font-bold'>RÉCAPITULATIF</span>

                <div className='grid grid-cols-2 grid-rows-[repeat(4,_minmax(132px,_132px))] gap-6 w-full'>
                    <div className='sub_container p-6 flex flex-col h-full w-full relative overflow-hidden gap-2 justify-between'>
                        <span className='text-lg'>Numéro Gagnant</span>
                        <span className='ticket ticket_win absolute right-0 top-0 bottom-0 m-auto scale-150 -rotate-12'>{values.game_stats?.winning_tickets[0]}</span>
                    </div>

                    <div className='sub_container p-6 flex flex-col h-full w-full relative overflow-hidden gap-2 justify-between'>
                        <span className='text-lg'>Numéro Explosif</span>
                        <span className='ticket ticket_dead absolute right-0 top-0 bottom-0 m-auto scale-150 -rotate-12'>{values.game_stats?.dead_tickets[0]}</span>
                    </div>

                    <div className='sub_container p-6 flex flex-col h-full w-full relative overflow-hidden gap-2 justify-between'>
                        <span className='text-lg'>Durée du VIPGames</span>
                        <span className='text-4xl font-light'>{formatTime(gameDuration)}</span>
                        <img className="absolute right-0 bottom-0 translate-x-8 translate-y-8" src={HourGlass} width={156} alt={'Durée du VIPGames'} />
                    </div>

                    <div className='row-span-3 sub_container p-6 flex flex-col w-full relative overflow-hidden gap-2 justify-between'>
                        <span className='text-lg'>Les Participants + Tentatives</span>
                        <div className='flex flex-grow w-3/4 flex-col gap-[8px] overflow-y-scroll pr-2'>
                            {values.game_stats?.players?.sort((a, b) => b.totalAttempt - a.totalAttempt).map((player, index) => (
                                <div key={index} className='sub_container flex justify-between items-center p-2'>
                                    <span className='font-semibold'>{player.name}</span>
                                    <span className='font-normal'>{player.totalAttempt}</span>
                                </div>
                            ))}
                        </div>
                        <img className="absolute right-0 bottom-0 translate-x-8 translate-y-8" src={Users} width={156} alt={'Les Participants'} />
                    </div>

                    <div className='sub_container p-6 flex flex-col h-full w-full relative overflow-hidden gap-2 justify-between'>
                        <span className='text-lg'>Nombre de ticket retourné</span>
                        <span className='text-6xl font-light'>{values.game_stats?.tickets?.length}</span>
                        <img className="absolute right-0 bottom-0 translate-x-8 translate-y-8" src={TicketColor} width={156} alt={'Nombre de ticket retourné'} />
                    </div>

                    <div className='sub_container p-6 flex flex-col h-full w-full relative overflow-hidden gap-2 justify-between'>
                        <span className='text-lg'>Bonus le plus utilisé</span>
                        <span className='text-4xl font-light'>{mostUseBonus ?? 'Aucun'}</span>
                        <img className="absolute right-0 bottom-0 translate-x-8 translate-y-8" src={Star} width={156} alt={'Bonus le plus utilisé'} />
                    </div>
                </div>
            </div>
        )
        :
        (
            <>
                <div className='flex flex-col gap-[24px] h-full w-[980px] relative'>
                    <div id='game_news' className='h-[80px] w-full flex-shrink-0'>
                        {values.news_list}
                    </div>

                    <div className='flex-1 flex-shrink-0 w-full overflow-hidden'>
                        <div className='container p-[16px] max-h-full h-full flex-shrink-0 w-full snow_cap_center'>
                            <div id='user-list-container' className='w-full overflow-hidden'>
                                <div id='user-list' className='w-full max-h-full grid grid-cols-3 gap-[8px] overflow-y-auto pr-[8px]'>
                                    {
                                        !values.game_start && values.players.map((player, _) => {
                                            return (
                                                <UserCard data={{ username: player.name }} twitchId={player.id} key={randomId()}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div id='tickets_pack' className='transition-back absolute my-hidden'>
                                {values.tickets}
                            </div>

                            <div id="wheels" className='transition-back absolute my-hidden'>
                                <div className='flex flex-col justify-center items-center gap-6 le-tchat'>
                                    <span>Joueurs</span>
                                    <SlotComponent
                                        id={'wheel_slot_1'}
                                        type={'card'}
                                        onClick={() => { values.game.askRandomPlayer() }}
                                        data={values.roll_players}
                                        winner={values.choosen_player}
                                        spin={values.spin_1}
                                        link={UserIcon}
                                        onSpinEnd={() => {
                                            modifyValue('current_player', values.game.getPlayer(values.choosen_player));
                                            modifyValue('avatar', values.choosen_player);
                                        }}
                                        game_start={values.game_start}
                                    />
                                </div>

                                <div className='flex flex-col justify-center items-center gap-6 le-tchat'>
                                    <span>Nombre de Choix</span>
                                    <SlotComponent
                                        id={'wheel_slot_2'}
                                        type={'text'}
                                        onClick={() => { values.game.askRandomPlayCount() }}
                                        data={values.roll_playCount}
                                        winner={values.choosen_playCount}
                                        spin={values.spin_2}
                                        onSpinEnd={() => {
                                            modifyValue('playCount', values.choosen_playCount);
                                        }}
                                        game_start={values.game_start}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Winning Menu */}
                    <div id='winning_menu' className='container w-full h-full flex absolute my-hidden'>

                    </div>

                </div>
            </>            
        )}
        </>
    );
};