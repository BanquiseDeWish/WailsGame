import MainLayout from "@/Layouts/MainLayout"
import { Head } from "@inertiajs/react"
import '../../../css/tierlist.css'
import BinIcon from "@/Components/Icons/BinIcon";
import { toast } from "sonner";
import { useState } from "react";

export default function TierListIndex(props) {

    const tierlist = props.tierlist;
    const [tlShare, setTLShare] = useState(props.tlShare);
    const twitch = props.auth.twitch;

    const deleteTLS = (e) => {
        console.log(e.currentTarget)
        const tlsid = e.currentTarget.getAttribute('data-id-tls');
        axios.post(route('tierlist.delete'), { tlsid: tlsid })
            .then((resp) => {
                if(resp.data?.status == "error") toast.error(resp.data?.message)
                else {
                    setTLShare(resp.data?.tlShare)
                    toast.success(resp.data?.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <MainLayout showOverflow={true}>
            <Head title="Tierlist" />
            <div className="tierlist flex flex-col gap-6 h-full">
                <div className='flex flex-col gap-[16px]'>
                    <h2 className="text-2xl">Séléctionnez une catégorie</h2>
                    {tierlist.map((val, index) => {
                        return (
                            <a href={route('tierlist.play', { id: val?.id, tls_id: 'new' })} key={index} className="card tlink w-fit gap-[32px] flex flex-col">
                                <img width={180} src={`/storage/tierlist/${val.id}/category.png`} alt="category_logo" />
                                <span>{val?.name}</span>
                            </a>
                        )
                    })}
                </div>
                <div className='flex h-full flex-col gap-[16px]'>
                    <h2 className="text-2xl">Tierlist sauvegardées</h2>
                    <div className="flex flex-wrap gap-6 pb-6 h-full">
                        {tlShare.length == 0 &&
                            <div className="flex justify-center items-center w-full h-full">
                                <h2 className="text-4xl">Aucune Tierlist</h2>
                            </div>
                        }
                        {tlShare.map((val, index) => {
                            return (
                                <div key={index} className="relative">
                                    <div onClick={deleteTLS} data-id-tls={val?.id} className="delete absolute right-[8px] top-2 p-2 bg-red-500 w-fit rounded-md">
                                        <BinIcon width={18} height={18} />
                                    </div>

                                    <a href={route('tierlist.view', { userid: twitch.id, id: val?.id })} className="card tlink w-fit gap-[32px] flex flex-col">

                                        <img width={180} src={`/storage/tierlist/${val.category.id}/category.png`} alt="category_logo" />
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="nameTlShare text-2xl font-bold">{val?.name == undefined ? "Sans titre" : val?.name}</span>
                                            <span>{val?.category.name}</span>
                                        </div>
                                    </a>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
        </MainLayout >
    )


}
