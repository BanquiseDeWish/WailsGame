import InputSwitch from "@/Components/Forms/InputSwitch";
import { usePage } from "@inertiajs/react"
import moment from "moment";
import { useEffect, useState } from "react";

export default function PurchaseTab() {

    const paymentsInit = usePage().props.payments;
    const [payments, setPayments] = useState(paymentsInit);
    const [hideFree, setHideFree] = useState(false)

    useEffect(() => {
        (hideFree ? setPayments(paymentsInit.filter((payment) => payment?.amount !== 0)) : setPayments(paymentsInit))
    }, [hideFree])

    return (
        <div className="tab_content overflow-x-hidden flex flex-col xl:p-12">
            <div className="flex gap-4 flex-col w-full">
                <div className="flex flex-col xl:flex-row xl:justify-between gap-2 xl:items-end">
                    <div className="flex flex-col">
                        <h2 className="text-[24px] font-bold">Historique des achats</h2>
                        <h2 className="text-[14px] font-light">Vous pouvez consulter les commandes passées sur le marché des cosmétiques</h2>
                    </div>
                    <div className="input-group">
                        <InputSwitch label={"Cacher les paiements gratuit"} state={hideFree} onChange={(e)=>{ console.log(e); setHideFree(e) }} />
                    </div>
                </div>
                <div className="flex-1 overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table className="min-w-full divide-y divide-container table-fixed">
                                <thead className="bg-container">
                                    <tr>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Numéro de commande
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Montant total
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Articles présent dans le panier
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Commande passée le
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-container divide-y divide-container">
                                    {payments?.map((item) => {

                                        const articlesNames = item.articles.map((article) => article.name)
                                        const articlesSpan = articlesNames.join(', ');

                                        return (
                                            <tr key={`${item?.id}`} className="hover:bg-container ">
                                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    #{item?.id}
                                                </td>
                                                <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                                    {item?.amount} €
                                                </td>
                                                <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                                    <div className="flex gap-2">
                                                        <span className="font-light" style={{  width: '500px', whiteSpace: 'nowrap',overflow: 'hidden', textOverflow: 'ellipsis' }}>{articlesSpan}</span>
                                                        <span>({item.articles.length} article(s))</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {moment(item?.created_at).format('DD/MM/YYYY [à] HH:mm')}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
