import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

import HOFTable from '@/Components/Content/HOF/HOFTable';

import MainLayout from '@/Layouts/MainLayout';
import VictoryLogo from '@assets/games/vipgames_victory.svg'

import UserPenguin from '@/Components/User/UserPenguin';
import UserCard from '@/Components/User/UserCard';

import StatContainer from '@/Components/Content/Containers/StatContainer';
import HourGlass from '@assets/icons/stats/hourglass.svg';
import TicketMany from '@assets/icons/stats/many_tickets.svg';
import TicketColor from '@assets/icons/stats/tickets_color.svg';
import Clover from '@assets/icons/stats/clover.svg';
import Star from '@assets/icons/stats/star.svg';
import Users from '@assets/icons/stats/users.svg';

import Crown from '@assets/icons/crown.svg';


export default function VipGamesIndex() {

    const props = usePage().props;

    return (
        <MainLayout showOverflow={true}>
            <Head title="VIP Games" />
            <div className='flex h-full flex-col xl:flex-row gap-[16px]'>
                <HOFTable
                    logoPos={-29}
                    load={false}
                    logo={VictoryLogo}
                    data={props.ranking}
                    labelPoints={{ singular: "Victoire", plural: "Victoires" }}
                    className={"shrink-0 w-full xl:max-w-[800px]"}
                />

                <div className='flex flex-col h-full gap-[16px]'>
                    <div className='flex container_background items-center rounded-[8px] justify-around p-[16px]'>
                        <div className='flex flex-col gap-[16px]'>
                            <h1 className='title'>Gagnant en titre</h1>
                            <UserCard
                                twitchId={props.lastWinner?.twitch_id}
                                data={{ 
                                    username: props.lastWinner?.twitch_username,
                                    background_type: "color",
                                    background_data: {
                                        color: "transparent",
                                    },
                                }}
                            />
                        </div>
                        <UserPenguin
                            width={120}
                            twitchId={props.lastWinner?.twitch_id}
                        />
                    </div>

                    <div className='flex flex-wrap gap-[16px] gap-y-[48px] pt-[32px] pb-[74px] lg:pb-0'>
                        <StatContainer
                            iconUrl={TicketMany}
                            statName={"Nombre Total de Numéro Retourné"}
                            statData={props.stats.total_attempt.stat_value}
                        />
                        <StatContainer
                            iconUrl={TicketColor}
                            statName={"Numéro le plus souvent retourné"}
                            statData={props.stats.most_ticket_played.stat_value}
                        />
                        <StatContainer
                            iconUrl={HourGlass}
                            statName={"Durée Moyenne d'un VIPGames"}
                            statData={props.stats.average_game_time.stat_value}
                        />
                        <StatContainer
                            iconUrl={Users}
                            statName={"Nombre Moyen de Joueur"}
                            statData={props.stats.average_player.stat_value}
                        />
                        <StatContainer
                            iconUrl={Star}
                            statName={"Bonus le plus utilisé"}
                            statData={props.stats.most_bonus_used.stat_value}
                        />
                        <StatContainer
                            iconUrl={Clover}
                            statName={"Les Joueurs avec le plus de tentatives"}
                            statData={
                            <>
                                <div className='flex flex-col justify-center items-center'>
                                    {props.stats.players_with_most_attempt.stat_value.map((player, index) => {
                                        return (
                                            <span key={index}>
                                                {player.username} ({player.totalAttempt})
                                            </span>
                                        )})
                                    }
                                </div>
                            </>
                            }
                        />
                    </div>
                </div>
            </div>
            <style>{`
                .hof .label_points {
                    display: none;
                }
                .hof .points_data {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                }
                .hof .points_data::after {
                    content: '';
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                    background: url(${Crown}) no-repeat center center;
                    background-size: contain;
                }
            `}
            </style>
        </MainLayout>
    );
}
