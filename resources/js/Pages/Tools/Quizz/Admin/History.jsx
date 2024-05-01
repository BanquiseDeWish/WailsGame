import StatContainer from "@/Components/Content/Containers/StatContainer";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import Cup from '../../../../../assets/icons/stats/cup.svg';

import ChevronDown from '@/Components/Icons/ChevronDown';
import ChevronUp from '@/Components/Icons/ChevronUp';
import { Disclosure } from "@headlessui/react";

export default function History(props) {

    const title = "Historique des parties - QuizzMaster"

    return (
        <AdminLayout title={title}>
            <Head title={title} />
            <div className="flex h-full gap-8">
                <div className="card items-start justify-start p-4 w-full h-full">
                    {props.history.map((history) => {

                        const data = history.data_party;
                        console.log(data)

                        return (
                            <Disclosure key={history.id} defaultOpen={true}>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className={`flex w-full items-center justify-between ${open ? 'rounded-t-[4px]' : 'rounded-[4px]'} bg-[#4c6fab] px-4 py-2 text-left text-sm font-medium w-full`}>
                                            <span>Partie #{history.uuid}</span>
                                            <div className="flex items-center">
                                                {open ?
                                                    <ChevronUp />
                                                    :
                                                    <ChevronDown />
                                                }
                                            </div>
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="flex flex-col gap-0 p-4 text-sm w-full rounded-b-[4px] bg-[#334b75]">
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="col">
                                                    <h5 className="font-bold">Leader de la partie</h5>
                                                    <span>{history.leader.twitch_username}</span>
                                                </div>
                                                <div className="col">
                                                    <h5 className="font-bold">Nb de joueur(s)</h5>
                                                    <span>{data.players.length} joueur(s)</span>
                                                </div>
                                                <div className="col">
                                                    <h5 className="font-bold">Nb de questions</h5>
                                                    <span>{data.questionsPayload.length} questions</span>
                                                </div>
                                                <div className="col">
                                                    <h5 className="font-bold">Liste des joueur(s)</h5>
                                                    <ul>
                                                        {data.players.map((player) => {
                                                            return <li key={player.id}>{player.user.twitch_username}</li>
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                            <Disclosure key={history.id} defaultOpen={true}>
                                                {({ subOpen }) => (
                                                    <>
                                                        <Disclosure.Button className={`flex w-full mt-4 items-center justify-between ${subOpen ? 'rounded-t-[4px]' : 'rounded-[4px]'} bg-[#4c6fab] px-4 py-2 text-left text-sm font-medium w-full`}>
                                                            <span>Liste des questions</span>
                                                            <div className="flex items-center">
                                                                {subOpen ?
                                                                    <ChevronUp />
                                                                    :
                                                                    <ChevronDown />
                                                                }
                                                            </div>
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="flex flex-col gap-0 p-4 text-sm w-full rounded-b-[4px] bg-[#1f2e49]">
                                                            <ul>
                                                                {data.questionsPayload.map((question) => {
                                                                    return <li key={question.id}>{question.id}</li>
                                                                })}
                                                            </ul>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        )
                    })}
                </div>
                <div className="grid grid-cols-2">
                    <div className="h-fit">
                        <StatContainer
                            iconUrl={Cup}
                            statName={"Nombres de parties jouées"}
                            statData={props.history.length + " parties"}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )

}
