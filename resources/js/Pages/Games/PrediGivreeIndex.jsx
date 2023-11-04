import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';
import Paginate from '@/Components/Paginate';
import HOFTable from '@/Components/HOFTable';
import '../../../css/predigivre.css'
import '../../../css/hof.css'
import PGLogo from '../../../assets/games/pg_classement.svg'
import axios from 'axios';

export default function PrediGivreeIndex(props) {

    const [filter, setFilter] = useState(props.filter)
    const [pgData, setPGData] = useState(props.hallOfFame)
    const [load, setLoad] = useState(false)

    const changeFilter = (filter) => {
        if(load) return;
        setLoad(true)
        setFilter(filter)
        axios.get(route('predigivre.filter', { filter: filter })).then((response) => {
            setTimeout(() => {
                setLoad(false)
                const newDataPG = response.data;
                setPGData(newDataPG)
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
        <MainLayout>
            <Head title="Prédictions Givrées" />
            <div className="prediGivre hof" style={{ paddingBottom: "30px" }}>
                <div className="flex justify-between gap-4 w-full h-full">
                    <div className="filterMenu">
                        <span className='text-white text-[20px] font-[700]'>Filtrer par</span>
                        {filterButton("today", "Aujourd'hui")}
                        {filterButton("week", "Cette semaine")}
                        {filterButton("month", "Ce mois-ci")}
                        {filterButton("year", "Cette année")}
                        {filterButton("all", "Toujours")}
                    </div>
                    <div className="ranking">
                        <HOFTable load={load} logo={PGLogo} data={pgData} labelPoints={"Points"} />
                    </div>
                    <div className="stats">
                        Statistiques
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
