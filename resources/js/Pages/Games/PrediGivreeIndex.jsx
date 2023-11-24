import { Head, Link, router, usePage, useRemember } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HOFTable from '@/Components/Content/HOF/HOFTable';
import '../../../css/predigivre.css'
import PGLogo from '../../../assets/games/pg_classement.svg'
import axios from 'axios';
import BarMenuMobile from '@/Components/Icons/BarMenuMobile';

export default function PrediGivreeIndex(props) {

    const [showMenuFilterMB, setShowMenuFilterMB] = useState(true)
    const [filter, setFilter] = useState(props.filter)
    const [pgData, setPGData] = useState(props.hallOfFame.hof)
    const [statsData, setStatsData] = useState(props.hallOfFame.stats)
    const [load, setLoad] = useState(false)

    const changeFilter = (nfilter) => {
        if(load) return;
        if(filter == nfilter) return;
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
            <div className="prediGivre hof xl:px-[10rem]" style={{ paddingBottom: "0px" }}>
                <div className="flex w-full flex-col xl:flex-row justify-around gap-8 xl:gap-4 xl:px-8 xl:h-full">
                    <div className="filterMenu flex flex-col gap-[16px]">
                        <div className="flex justify-between">
                            <span className='text-white text-[20px] font-[700]'>Filtrer par</span>
                            <div className='block xl:hidden' onClick={() => { setShowMenuFilterMB(!showMenuFilterMB) }}>
                                <BarMenuMobile fill={"white"} width={32} height={32} />
                            </div>
                        </div>
                        <div className={`${showMenuFilterMB ? "flex" : "hidden"} flex-col gap-[16px] xl:flex`}>
                            {filterButton("today", "Aujourd'hui")}
                            {filterButton("week", "Cette semaine")}
                            {filterButton("month", "Ce mois-ci")}
                            {filterButton("year", "Cette année")}
                            {filterButton("all", "Toujours")}
                        </div>
                    </div>
                    <HOFTable className="xl:flex-1" logoPos={-50} load={load} logo={PGLogo} data={pgData} labelPoints={{singular: "pt", plural: "pts"}} />
                    <div className="stats xl:w-[16rem]">
                        <span className='text-white text-[20px] font-[700]'>Statistiques</span>
                        <div className="flex flex-col w-full gap-4">
                            <div className="card w-full">
                                <span className='key'>Position la plus gagnante</span>
                                <span className='value'>{load ? " - " : statsData?.mostWin == undefined ? "N/A" : statsData?.mostWin?.win_position}</span>
                            </div>
                            <div className="card w-full">
                                <span className='key'>Top des positions les plus choisis</span>
                                <span className='value'>{load ? " - " : statsData?.mostChoice == undefined ? "N/A" : Object.keys(statsData.mostChoice).join(', ')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
