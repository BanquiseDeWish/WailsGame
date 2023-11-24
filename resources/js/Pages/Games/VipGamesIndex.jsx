import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

import HOFTable from '@/Components/Content/HoF/HoFTable';

import MainLayout from '@/Layouts/MainLayout';
import VictoryLogo from '../../../assets/games/vipgames_victory.svg'

import Penguin from '@/Components/User/Penguin';
import PenguinCard from '@/Components/User/PenguinCard';

import StatContainer from '@/Components/Content/Containers/StatContainer';
import HourGlass from '../../../assets/icons/stats/hourglass.svg';
import TicketMany from '../../../assets/icons/stats/many_tickets.svg';
import TicketColor from '../../../assets/icons/stats/tickets_color.svg';
import Clover from '../../../assets/icons/stats/clover.svg';
import Star from '../../../assets/icons/stats/star.svg';
import Users from '../../../assets/icons/stats/users.svg';

export default function VipGamesIndex() {

    const props = usePage().props;
    console.log(props);

    return (
        <MainLayout showOverflow={true}>
            <Head title="VIP Games" />
            <div className='flex h-full flex-col xl:flex-row gap-[16px] pb-[16px] lg:pb-0'>
                <HOFTable
                    logoPos={-29}
                    load={false}
                    logo={VictoryLogo}
                    data={props.ranking}
                    labelPoints={{ singular: "Victoire", plural: "Victoires" }}
                />

                <div className='flex flex-col h-full gap-[16px]'>
                    <div className='flex bg-[#18212E] items-center rounded-[8px] justify-around'>
                        <div className='flex flex-col gap-[16px]'>
                            <h1 className='title'>Gagnant en titre</h1>
                            <PenguinCard data={{ username: props.lastWinner.twitch_username }}/>
                        </div>
                        <Penguin
                            userId={props.lastWinner}
                            size={{width: 120, height: 220}}
                        />
                    </div>

                    <div className='flex flex-wrap gap-[16px] gap-y-[48px] pt-[32px]'>
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
                            statName={"Le Joueur avec le plus de tentatives"}
                            statData={props.stats.player_with_most_attempt.stat_value}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
