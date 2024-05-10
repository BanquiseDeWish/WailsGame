import StatContainer from "@/Components/Content/Containers/StatContainer";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import Cup from '../../../../../assets/icons/stats/cup.svg';

import ChevronDown from '@/Components/Icons/ChevronDown';
import ChevronUp from '@/Components/Icons/ChevronUp';
import { Disclosure } from "@headlessui/react";

export default function Stats(props) {

    const title = "Statistiques des parties - QuizzMaster"
    console.log(props)
    return (
        <AdminLayout title={title}>
            <Head title={title} />
            <div className="flex flex-wrap justify-center gap-4 pt-8">
                <div className="h-fit w-fit">
                    <div className="container flex-grow basis-[300px] flex-shrink relative flex-col p-[32px] pt-[48px] gap-[32px] font-bold">
                        <div className="flex flex-col gap-[16px] justify-center items-center">
                            <div className="text-center text-[32px]">
                                {props.history.length} Parties
                            </div>
                            <div className="text-[#adb7c9] font-light">
                                Nombre de parties jouées
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-fit w-fit">
                    <div className="container flex-grow basis-[300px] flex-shrink relative flex-col p-[32px] pt-[48px] gap-[32px] font-bold">
                        <div className="flex flex-col gap-[16px] justify-center items-center">
                            <div className="text-center text-[32px]">
                                {props.stats.playersDistinct} Leaders
                            </div>
                            <div className="text-[#adb7c9] font-light">
                                Nombre de leaders différents
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-fit w-fit">
                    <div className="container flex-grow basis-[300px] flex-shrink relative flex-col p-[32px] pt-[48px] gap-[32px] font-bold">
                        <div className="flex flex-col gap-[16px] justify-center items-center">
                            <div className="text-center text-[32px]">
                                {props.stats.questionsLength} Questions
                            </div>
                            <div className="text-[#adb7c9] font-light text-center">
                                Estimation du nombre de questions répondues
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-fit w-fit">
                    <div className="container flex-grow basis-[300px] flex-shrink relative flex-col p-[32px] pt-[48px] gap-[32px] font-bold">
                        <div className="flex flex-col gap-[16px] justify-center items-center">
                            <div className="text-center text-[32px]">
                                {props.stats.playerMostPlaying}
                            </div>
                            <div className="text-[#adb7c9] font-light text-center">
                                Joueur/Joueuse ayant le plus joué(e) en étant leader
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-fit w-fit">
                    <div className="container flex-grow basis-[300px] flex-shrink relative flex-col p-[32px] pt-[48px] gap-[32px] font-bold">
                        <div className="flex flex-col gap-[16px] justify-center items-center">
                            <div className="text-center text-[32px]">
                                {props.stats.averagePartiesByDay} Parties
                            </div>
                            <div className="text-[#adb7c9] font-light text-center">
                                Parties en moyenne sur 7 derniers jours
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-fit w-fit">
                    <div className="container flex-grow basis-[300px] flex-shrink relative flex-col p-[32px] pt-[48px] gap-[32px] font-bold">
                        <div className="flex flex-col gap-[16px] justify-center items-center">
                            <div className="text-center text-[32px]">
                                {props.stats.averagePartiesByWeek} Parties
                            </div>
                            <div className="text-[#adb7c9] font-light text-center">
                                Parties en moyenne sur 1 semaine
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-fit w-fit">
                    <div className="container flex-grow basis-[300px] flex-shrink relative flex-col p-[32px] pt-[48px] gap-[32px] font-bold">
                        <div className="flex flex-col gap-[16px] justify-center items-center">
                            <div className="text-center text-[32px]">
                                {props.stats.averageQuestions} Questions
                            </div>
                            <div className="text-[#adb7c9] font-light text-center">
                                Moyenne du nombre de questions par parties jouées
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-fit w-fit">
                    <div className="container flex-grow basis-[300px] flex-shrink relative flex-col p-[32px] pt-[48px] gap-[32px] font-bold">
                        <div className="flex flex-col gap-[16px] justify-center items-center">
                            <div className="text-center text-[32px]">
                                {props.stats.averagePlayers} Joueur(s)
                            </div>
                            <div className="text-[#adb7c9] font-light text-center">
                                Moyenne du nombre de joueur(s) par parties jouées
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
