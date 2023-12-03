import MainLayout from "@/Layouts/MainLayout"
import { Head } from "@inertiajs/react"

export default function TierListIndex(props) {

    const tierlist = props.tierlist;
    const tlShare = props.tlShare;
    const twitch = props.auth.twitch;

    return (
        <MainLayout showOverflow={true}>
            <Head title="Tierlist" />
            <div className="flex flex-col gap-6">
                <div className='flex h-full flex-col gap-[16px]'>
                    <h2 className="text-2xl">Séléctionnez une catégorie</h2>
                    {tierlist.map((val, index) => {
                        return (
                            <a href={route('tierlist.play', {id: val?.id, tls_id: 'new'})} key={index} className="card w-fit gap-[32px] flex flex-col">
                                <img width={180} src={`/storage/tierlist/${val.id}/category.png`} alt="category_logo" />
                                <span>{val?.name}</span>
                            </a>
                        )
                    })}
                </div>
                <div className='flex h-full flex-col gap-[16px]'>
                    <h2 className="text-2xl">Tierlist sauvegardées</h2>
                    <div className="flex flex-wrap gap-6 pb-6">
                        {tlShare.map((val, index) => {
                            return (
                                <a href={route('tierlist.view', {userid: twitch.id, id: val?.id})} key={index} className="card w-fit gap-[32px] flex flex-col">
                                    <img width={180} src={`/storage/tierlist/${val.category.id}/category.png`} alt="category_logo" />
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-2xl font-bold">{val?.name == undefined ? "Sans titre" : val?.name}</span>
                                        <span>{val?.category.name}</span>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </MainLayout>
    )


}
