import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';
import Paginate from '@/Components/Paginate';
import HOFTable from '@/Components/HOFTable';
import '../../../css/predigivre.css'
import '../../../css/hof.css'
import MKTitle from '../../../assets/games/mario_kart_title.png'

export default function PrediGivreeIndex(props) {

    const [filter, setFilter] = useState(props.filter)
    const [predigivre, setPredigivre] = useState(props.hallOfFame.data)
    const [pgPaginate, setPGPaginate] = useState(props.hallOfFame)
    const [top, setTop] = useState([])
    const [asTop, setASTop] = useState(false)

    useEffect(() => {
        if(!asTop){
            {pgPaginate?.data?.map((val, index) => {
                const position = pgPaginate.current_page * pgPaginate.per_page - pgPaginate.per_page + 1 + index;
                if(position <= 3) {
                    top.push({ position: position, data: val })
                }
            })}
            setTop(top)
            setASTop(true)
        }
        console.log(top)
    }, [pgPaginate])

    return (
        <MainLayout>
            <Head title="Prédictions Givrées" />
            <div className="prediGivre hof" style={{ paddingBottom: "30px" }}>
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

                <div className="flex gap-4">
                Podium
                    {top.map((val, index) => {
                        console.log(val)
                        return (
                            <div className="col">
                                #{val.position} {val.data.userName}
                            </div>
                        )
                    })}
                </div>
                <HOFTable pagination={pgPaginate} />
                <Paginate layout="bottom" labelType="Predigivre" routeName={"predigivre.paginate"} routeArgs={{ filter: filter }} pagination={pgPaginate} setList={setPredigivre} setPagination={setPGPaginate} method="get" />
            </div>
        </MainLayout>
    );
}
