import MainLayout from "@/Layouts/MainLayout"
import { Head, router } from "@inertiajs/react"
import '../../../css/tierlist.css'
import { useState, useEffect } from "react";
import Settings from '@/Components/Icons/Settings';
import { toast } from "sonner";
import BDWSwitch from "@/Components/BDWSwitch";

export default function TierListIndex(props) {

    const tierlist = props.tierlist;
    const [tlShare, setTLShare] = useState(props.tlShare);
    const twitch = props.auth.twitch;
    const [hasUpdate, setHasUpdate] = useState(undefined)
    const [shareLoad, setShareLoad] = useState(false)
    const [items, setItems] = useState(props.items)
    const [modeStreamer, setModeStreamer] = useState(false)
    const [modeStreamerSet, setModeStreamerSet] = useState(false)
    const [camState, setCamState] = useState(true)
    const [chatState, setChatState] = useState(true)
    const [averageViewState, setAverageViewState] = useState(false)
    const categoriesRating = props.categoriesRating;
    const [itemActive, setItemActive] = useState(0)
    const dataTierlist = tlShare == null ? undefined : typeof tlShare?.data == "object" ? tlShare?.dataTierlist : JSON.parse(tlShare?.data)
    const [tierlistName, setTierlistName] = useState(tlShare?.name)
    const DEFAULT_INTERVAL_AUTOSAVE = 120;
    let counterAutoSave = DEFAULT_INTERVAL_AUTOSAVE;
    let intervalAutoSave = null;

    clearInterval(intervalAutoSave);

    useEffect(() => {
        items.forEach((item, iidx) => {
            categoriesRating.forEach((val, index) => {
                if (item.rating == undefined) item.rating = [];
                if (item.average == undefined) item.average = parseFloat(0.00).toFixed(2);
                if (item.rating[index] == undefined) item.rating[index] = { rate: 0.0 };
            })

            if (dataTierlist !== undefined) {
                const itemFind = dataTierlist.find((itm, idx) => idx == iidx);
                item.average = parseFloat(calcAverage(itemFind?.rating))
                item.rating = itemFind?.rating
            }
        })
        setItems(items);

        console.log('Launch counter auto save')
        intervalAutoSave = setInterval(() => {
            console.log('AutoSave!')
            autoSave()
        }, 120000)
    }, [])

    useEffect(() => {
        changeActiveItem(itemActive)
    }, [items])

    useEffect(() => {
        if (hasUpdate == undefined) setHasUpdate(false);
        else if (hasUpdate) {
            setHasUpdate(false)
            autoSave()
        }
    }, [itemActive])

    const autoSave = () =>{
        share(true).then(() => {
            toast.success('Sauvegarde automatique terminée')
        }).catch((err) => {
            console.log(err)
        })
    }

    const changeActiveItem = (index) => {
        const item = items.find((val, idx) => idx == index)
        categoriesRating.forEach((val, index) => {
            if (item.rating == undefined) item.rating = [];
            if (item.average == undefined) item.average = parseFloat(0.00).toFixed(2);
            if (item.rating[index] == undefined) item.rating[index] = { rate: 0.0 };
        })
        setItems(items);
        setItemActive(index)
    }

    const handleChangeRating = (e) => {
        const idRating = e.target.getAttribute('data-id-rating');
        const newItems = items;
        const item = newItems.find((val, idx) => idx == itemActive)
        const rating = categoriesRating.find((val, idx) => idx == idRating)
        const rate = parseFloat(e.target.value);
        if (rate > 10) return;
        if (rate.toString() == "NaN") return;
        if (rate < 0) return;

        item.rating[idRating] = { rate: rate };
        let totalRate = 0.0;
        item.rating.forEach((val) => {
            totalRate += val.rate;
        })
        item.average = parseFloat(totalRate / categoriesRating.length).toFixed(2);
        setItems([...newItems]);
        setHasUpdate(true)
    }

    const calcAverage = (ratingList) => {
        let totalRate = 0.0;
        ratingList?.forEach((val) => {
            totalRate += val.rate;
        })
        return parseFloat(totalRate / categoriesRating.length).toFixed(2)
    }

    const share = (autoSave) => {
        return new Promise((resolve, reject) => {
            setShareLoad(true)
            const data = []
            items.forEach((item) => {
                data.push({ average: item.average, category_id: item.category_id, id: item.id, rating: item.rating })
            })
            axios.post(route('tierlist.share'), {
                category_id: props.idc,
                tls_id: tlShare?.id,
                name: tierlistName,
                data: data
            }).then((resp) => {
                setShareLoad(false)
                if (resp.data?.status == "error") {
                    toast.error(resp.data?.message)
                    return reject()
                } else {
                    if (!autoSave) {
                        toast(
                            <div>
                                {resp.data?.message} <br /><button className="font-bold" onClick={() => router.get(route('tierlist.view', { userid: twitch?.id, id: resp.data?.tls?.id }))}>Voir la Tierlist</button>
                            </div>
                        );
                    }
                    setTLShare(resp.data?.tls)
                    setTierlistName(resp.data?.tls?.name)
                    window.history.replaceState({}, null, resp.data?.tls?.id)
                    return resolve()
                }
            }).catch(() => {
                setShareLoad(false)
                toast.error("Une erreur est survenue lors de la sauvegarde :(")
                return reject()
                //setShareLoad(true)
            })
        })

    }

    return (
        <MainLayout showOverflow={true}>
            <Head title={`${tierlist.name} - TierList`} />
            <div className='tierlist flex h-full flex-col xl:flex-row gap-[24px] pb-[24px]'>
                <div className="flex flex-col h-full gap-6">
                    <h2 className="text-2xl">TierList - {tierlist.name}</h2>
                    <div className="items" onLoad={() => { alert('Oué') }}>
                        {items.map((val, index) => {
                            return (
                                <div key={index} onClick={() => { changeActiveItem(index) }} className={`item ${itemActive == index ? "active" : ""}`}
                                    style={{ background: `${itemActive == index ? `url('/storage/tierlist/${props.idc}/items/${val.id}.webp')` : "var(--content_background)"}` }} >
                                    <span className="name">{val?.name}</span>
                                    {modeStreamer && !averageViewState || !modeStreamer ? <span className="average">{val?.average == undefined ? " - " : val?.average}</span> : <></>}
                                </div>
                            )
                        })}
                    </div>
                    <div className={`${modeStreamerSet ? "flex" : "hidden"} card p-4 gap-4 items-start modeStreamerSettings`}>
                        <h2 className="text-xl font-semibold">Paramètres du Mode Streamer</h2>
                        <div className="flex w-full items-center justify-between">
                            <label>Afficher le segment Cam</label>
                            <BDWSwitch bool={camState} setBool={setCamState} />
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <label>Afficher le segment T'Chat</label>
                            <BDWSwitch bool={chatState} setBool={setChatState} />
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <label>Cacher les notes finales</label>
                            <BDWSwitch bool={averageViewState} setBool={setAverageViewState} />
                        </div>
                    </div>
                    <div className="card flex p-4 flex-row w-full justify-between">
                        <span className="text-md font-semibold">Mode streamer</span>
                        <div className="flex items-center gap-2">
                            <BDWSwitch bool={modeStreamer} setBool={setModeStreamer} />
                            <div onClick={() => { setModeStreamerSet(!modeStreamerSet) }}>
                                <Settings w={28} h={28} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-6 w-full h-full justify-center items-center">
                    <div className="rating_average items-start card">
                        <div className="view flex flex-col">
                            <span className="text-2xl font-bold">Note Finale</span>
                            <span className={`${items[itemActive].average >= 9 ? "average gold" : "average"} text-xl`}>{items[itemActive].average}</span>
                        </div>
                        <div className="flex gap-6">
                            <input type="text" value={tierlistName} onChange={(e) => { setTierlistName(e.target.value) }} disabled={shareLoad} placeholder="Nom de la Tierlist" />
                            <button className="simple_button button_green" onClick={() => { share(false) }} disabled={shareLoad}>Sauvegarder ma Tierlist</button>
                        </div>
                    </div>
                    <div className={`ratingList grid grid-cols-2 gap-4 overflow-x-hidden w-full ${modeStreamer ? "pr-4" : ""} overflow-y-auto`}>
                        {categoriesRating.map((rating, index) => {
                            return (
                                <div key={index} className="rating" style={{ overflow: 'hidden' }}>
                                    <div className="flex items-center gap-3 py-[8px] px-[16px]">
                                        <img className="min-w-[28px] w-[28px] h-[28px]" src={`/storage/tierlist/${props.idc}/subcategory/${rating.id}.svg`} alt="" />
                                        <span className="defil text-xl" style={{ animation: rating?.name?.length > 24 ? 'scroll 6s linear infinite' : '' }}>
                                            {rating?.name}
                                        </span>
                                    </div>
                                    <div className="input">
                                        <input type="number" disabled={shareLoad} className="w-[6rem]" min="0" max="10" step="0.50" data-id-rating={index} onChange={handleChangeRating} value={items[itemActive]?.rating?.[index].rate} />
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
                {modeStreamer &&
                    <div className="streamer">
                        <div className={`cam card ${camState ? "flex" : "hidden"}`}>
                            Mets ta cam ici
                        </div>
                        <div className={`chat justify-start card ${chatState ? "flex" : "hidden"}`}>
                            <span className="text-2xl">Le T'Chat</span>
                        </div>
                    </div>
                }
            </div>
        </MainLayout>
    )


}
