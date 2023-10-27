import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';
import PredigivrePaginatedTable from '@/Components/PredigivrePaginatedTable';
import style from '../../../css/predigivre.css'
import MKTitle from '../../../assets/games/mario_kart_title.png'

export default function PrediGivreeIndex(props) {

    const [hof, setHOF] = useState(props.hallOfFame)
    const [filter, setFilter] = useState(props.filter) // Today is filter by default

    return (
        <MainLayout>
            <Head title="Prédictions Givrées" />
            <div className="prediGivre hof">
                <img width="400px" src={MKTitle} alt="MKTitle" />
                <h2 className='text-3xl font-bold text-white uppercase'>Classement des prédictions</h2>
                <div className="flex items-center gap-4">
                    <span className='text-white bg-slate-800 rounded-md py-2 px-3'>Trier par:</span>
                    <div className="btn_sort">
                        <Link href={route('predigivre.halloffame', { filter: 'today' })}  className={`${filter == "today" ? "active" : ""}`}>Aujourd'hui</Link>
                        <Link href={route('predigivre.halloffame', { filter: 'week' })}  className={`${filter == "week" ? "active" : ""}`}>Cette semaine</Link>
                        <Link href={route('predigivre.halloffame', { filter: 'month' })}  className={`${filter == "month" ? "active" : ""}`}>Ce mois-ci</Link>
                        <Link href={route('predigivre.halloffame', { filter: 'year' })}  className={`${filter == "year" ? "active" : ""}`}>Cette année</Link>
                        <Link href={route('predigivre.halloffame', { filter: 'all' })}  className={`${filter == "all" ? "active" : ""}`}>Depuis toujours</Link>
                    </div>
                </div>
                <PredigivrePaginatedTable data={hof} itemsPerPage={10} />
            </div>
        </MainLayout>
    );
}
