import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import HOFTable from '@/Components/Content/HOF/HOFTable';
import '../../../css/predigivre.css'
import PGLogo from '../../../assets/games/pg_classement.svg'
import axios from 'axios';
import StatContainer from '@/Components/Content/Containers/StatContainer';
import Cup from '../../../assets/icons/stats/cup.svg';
import Podium from '../../../assets/icons/stats/podium.svg';
import BlueButton from '@/Components/Navigation/Buttons/BlueButton';

export default function PrediGivreeIndex(props) {

    const listFilter = [
        {
            key: "last",
            type: "query",
            displayName: "Dernier classement",
            subcategory: false
        },
        {
            key: "week",
            type: "query",
            displayName: "Cette semaine",
            subcategory: false
        },
        {
            key: "month",
            type: "category",
            displayName: "Par mois",
            subcategory: false
        },
        {
            key: "year",
            type: "category",
            displayName: "Par année",
            subcategory: false
        },
        {
            key: "all",
            type: "query",
            displayName: "Depuis toujours",
            subcategory: false
        },
    ];
    const monthStart = "november";
    const yearStart = 2023;
    const [filter, setFilter] = useState(props.filter)
    const [pgData, setPGData] = useState(props.hallOfFame?.hof)
    const [statsData, setStatsData] = useState(props.hallOfFame?.stats)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const nfilter = listFilter.find(ft => ft.key.startsWith(filter.key == undefined ? filter : filter?.key))
        console.log(nfilter)
        if(nfilter == null) return;
        if(nfilter.type == 'query')
            setFilter(nfilter)
        else if(nfilter.type == 'category')
            showCategory(nfilter)
    }, [])

    const changeFilter = (nfilter) => {
        if (load) return;
        if (filter?.key == nfilter?.key) return;
        queryFilter(nfilter)
    }

    const queryFilter = (nfilter, data) => {
        setLoad(true)
        setFilter(nfilter)
        setPGData(null)
        setStatsData(null)
        window.history.pushState({}, null, nfilter.key)
        axios.get(route('predigivre.filter', { filter: nfilter.key })).then((response) => {
            setTimeout(() => {
                setLoad(false)
                const newDataPG = response.data;
                setPGData(newDataPG.hof)
                setStatsData(newDataPG.stats)
            }, 500)
        });
    }

    const showCategory = (fb) => {
        setFilter(fb)
    }

    const filterButton = (fb, index) => {

        let callback = () => {};
        switch(fb.type) {
            case 'query':
                callback = () => { changeFilter(fb) };
                break;
            case 'category':
                callback = () => { showCategory(fb) };
                break;
            default:
                break;
        }

        return (
            <div onClick={callback} key={index} className={`filterButton ${filter?.key == fb.key ? "active" : ""}`}>
                <span className="relative z-20 select-none">{fb.displayName}</span>
                <div className="hover z-[10]"></div>
            </div>
        )
    }

    function generateCombinedMonthList(startMonth, startYear) {
        const monthsEnglish = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const monthsFrench = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];

        const startIndex = monthsEnglish.indexOf(startMonth.charAt(0).toUpperCase() + startMonth.slice(1).toLowerCase());
        if (startIndex === -1) {
            return 'Invalid month';
        }

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const combinedMonthList = [];

        for (let year = startYear; year <= currentYear; year++) {
            const start = (year === startYear) ? startIndex : 0;
            const end = (year === currentYear) ? currentMonth + 1 : monthsEnglish.length;

            for (let i = start; i < end; i++) {
                const monthObj = {
                    key: monthsEnglish[i].toLowerCase(),
                    display_name: `${monthsFrench[i]} ${year}`,
                    year: year,
                };
                combinedMonthList.push(monthObj);
            }
        }

        return combinedMonthList;
    }

    function generateYearsStartingFrom(startYear) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        let yearList = [];

        for (let year = startYear; year <= currentYear; year++) {
            yearList.push(year);
        }

        return yearList;
    }

    return (
        <MainLayout showOverflow={true}>
            <Head title="Prédictions Givrées" />
            <div className="prediGivre flex h-full flex-col xl:flex-row gap-[16px] pb-[16px] lg:pb-0">
                <div className="filterMenu flex flex-col gap-[16px]">
                    <span className='text-white text-[20px] font-[700]'>Filtrer par</span>
                    <div className={`${filter?.key?.startsWith("month") || filter?.key?.startsWith("year") ? "hidden" : "flex xl:flex"} flex-row pb-4 overflow-x-auto xl:py-[6px] xl:overflow-x-hidden xl:flex-col gap-[16px] `}>
                        {listFilter.filter((val) => !val.subcategory).map((filter, index) => {
                            return filterButton(filter, index)
                        })}
                    </div>
                    <div className={`monthCategory ${filter?.key?.startsWith("month")  ? "flex" : "hidden"} flex-row pb-4 overflow-x-auto xl:py-[6px] xl:overflow-x-hidden xl:flex-col gap-[16px] `}>
                        <div onClick={() => { setFilter(undefined) }} className={`filterButton active`}>
                            <span className="relative z-20 select-none">Retour</span>
                            <div className="hover z-[10]"></div>
                        </div>
                        {generateCombinedMonthList(monthStart, yearStart).map((month, index) => {

                            const filterObj = { key: `month_${month.key}_${month.year}`, type: "query", subcategory: true, displayName: `${month.display_name}` }

                            return (
                                filterButton(filterObj)
                            )
                        })}
                    </div>
                    <div className={`yearCategory ${filter?.key?.startsWith("year") ? "flex" : "hidden"} flex-row pb-4 overflow-x-auto xl:py-[6px] xl:overflow-x-hidden xl:flex-col gap-[16px] `}>
                        <div onClick={() => { setFilter(undefined) }} className={`filterButton active`}>
                            <span className="relative z-20 select-none">Retour</span>
                            <div className="hover z-[10]"></div>
                        </div>
                        {generateYearsStartingFrom(yearStart).map((year, index) => {

                            const filterObj = { key: `year_${year}`, type: "query", displayName: `${year}` }

                            return (
                                filterButton(filterObj)
                            )
                        })}
                    </div>
                </div>

                <div className="pg_hof shrink-0 w-full xl:max-w-[800px]">
                    <HOFTable className={"shrink-0 w-full xl:max-w-[800px]"} logoPos={-14} filter={filter} load={load} logo={PGLogo} data={pgData} labelPoints={{ singular: "pt", plural: "pts" }} />
                </div>

                <div className="flex w-full flex-col h-full gap-[16px] pb-[74px] lg:pb-0">
                    <div className='flex flex-wrap gap-[16px] gap-y-[48px] pt-[32px]'>
                        {statsData !== undefined && statsData !== null &&
                            <>
                                <StatContainer
                                    iconUrl={Cup}
                                    statName={"Position la plus gagnante"}
                                    statData={statsData?.mostWin == undefined ? " - " : statsData?.mostWin?.win_position}
                                />
                                <StatContainer
                                    iconUrl={Podium}
                                    statName={"Top des positions les plus choisis"}
                                    statData={Object.keys(statsData?.mostChoice).length == 0 ? " - " : Object.keys(statsData?.mostChoice).join(', ')}
                                />
                            </>
                        }

                    </div>
                </div>

            </div>
        </MainLayout>
    );
}
