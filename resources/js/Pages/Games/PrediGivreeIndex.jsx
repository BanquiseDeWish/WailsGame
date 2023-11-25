import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HOFTable from '@/Components/Content/HOF/HOFTable';
import '../../../css/predigivre.css'
import PGLogo from '../../../assets/games/pg_classement.svg'
import axios from 'axios';
import StatContainer from '@/Components/Content/Containers/StatContainer';
import Cup from '../../../assets/icons/stats/cup.svg';
import Podium from '../../../assets/icons/stats/podium.svg';

export default function PrediGivreeIndex(props) {

    const [filter, setFilter] = useState(props.filter)
    const [pgData, setPGData] = useState(props.hallOfFame.hof)
    const [statsData, setStatsData] = useState(props.hallOfFame.stats)
    const [load, setLoad] = useState(false)

    const changeFilter = (nfilter) => {
        if (load) return;
        if (filter == nfilter) return;
        setLoad(true)
        setFilter(nfilter)
        window.history.pushState({}, null, nfilter)
        axios.get(route('predigivre.filter', { filter: nfilter })).then((response) => {
            setTimeout(() => {
                setLoad(false)
                const newDataPG = response.data;
                setPGData(newDataPG.hof)
                setStatsData(newDataPG.stats)
            }, 500)
        });
    }

    const filterButton = (fb, label) => {
        return (
            <div onClick={() => { changeFilter(fb) }} className={`filterButton ${filter == fb ? "active" : ""}`}>
                <span className="relative z-20 select-none">{label}</span>
                <div className="hover z-[10]"></div>
            </div>
        )
    }

    return (
        <MainLayout showOverflow={true}>
            <Head title="Prédictions Givrées" />
            <div className="prediGivre flex h-full flex-col xl:flex-row gap-[16px] pb-[16px] lg:pb-0">
                <div className="filterMenu flex flex-col gap-[16px]">
                    <span className='text-white text-[20px] font-[700]'>Filtrer par</span>
                    <div className={`flex flex-row py-[16px] px-[6px] overflow-x-auto xl:py-[6px] xl:overflow-x-hidden xl:flex-col gap-[16px] xl:flex`}>
                        {filterButton("today", "Aujourd'hui")}
                        {filterButton("week", "Cette semaine")}
                        {filterButton("month", "Ce mois-ci")}
                        {filterButton("year", "Cette année")}
                        {filterButton("all", "Toujours")}
                    </div>
                </div>

                <HOFTable className={"shrink-0 w-full xl:max-w-[800px]"} logoPos={-14} load={load} logo={PGLogo} data={pgData} labelPoints={{ singular: "pt", plural: "pts" }} />

                <div className="flex w-full flex-col h-full gap-[16px] pb-[48px] lg:pb-0">
                    <div className='flex flex-wrap gap-[16px] gap-y-[48px] pt-[32px]'>
                        <StatContainer
                            iconUrl={Cup}
                            statName={"Position la plus gagnante"}
                            statData={statsData?.mostWin == undefined ? " - " : statsData?.mostWin?.win_position}
                        />
                        <StatContainer
                            iconUrl={Podium}
                            statName={"Top des positions les plus choisis"}
                            statData={Object.keys(statsData.mostChoice).length == 0 ? " - " : Object.keys(statsData.mostChoice).join(', ')}
                        />
                    </div>
                </div>

            </div>
        </MainLayout>
    );
}
