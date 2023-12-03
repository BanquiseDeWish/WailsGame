import MainLayout from "@/Layouts/MainLayout"
import { Head, router } from "@inertiajs/react"
import '../../../css/tierlist.css'
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import Settings from '@/Components/Icons/Settings';
import GreenButton from "@/Components/Navigation/Buttons/GreenButton";
import { toast } from "sonner";
import { Tooltip } from 'flowbite-react';

export default function TierListIndex(props) {

    const tierlist = props.tierlist;
    const tlShare = props.tlShare;
    const twitch = props.auth.twitch;
    const [shareLoad, setShareLoad] = useState(false)
    const [items, setItems] = useState(props.items)
    const [modeStreamer, setModeStreamer] = useState(false)
    const [modeStreamerSet, setModeStreamerSet] = useState(false)
    const [camState, setCamState] = useState(true)
    const [chatState, setChatState] = useState(true)
    const categoriesRating = props.categoriesRating;
    const [itemActive, setItemActive] = useState(0)
    const dataTierlist = tlShare == null ? undefined : JSON.parse(tlShare?.data)
    const [tierlistName, setTierlistName] = useState(tlShare?.name)

    useEffect(() => {
        items.forEach((item, iidx) => {
            categoriesRating.forEach((val, index) => {
                if (item.rating == undefined) item.rating = [];
                if (item.average == undefined) item.average = parseFloat(0.00).toFixed(2);
                if (item.rating[index] == undefined) item.rating[index] = { rate: 0.0 };
            })

            if(dataTierlist !== undefined) {
                const itemFind = dataTierlist.find((itm, idx) => idx == iidx);
                item.average = parseFloat(calcAverage(itemFind?.rating))
                item.rating = itemFind?.rating
            }
        })
        setItems(items);
    }, [])

    useEffect(() => {
        changeActiveItem(itemActive)
    }, [items])

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
    }

    const calcAverage = (ratingList) => {
        let totalRate = 0.0;
        ratingList?.forEach((val) => {
            totalRate += val.rate;
        })
        return parseFloat(totalRate / categoriesRating.length).toFixed(2)
    }

    const share = () => {
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
            if(resp.data?.status == "error") toast.error(resp.data?.message)
            else {
                toast(
                    <div>
                      {resp.data?.message} <br /><button className="font-bold" onClick={() => router.get(route('tierlist.view', { userid: twitch?.id, id: resp.data?.tls?.id }))}>Voir la Tierlist</button>
                    </div>
                );
            }
        }).catch(() => {
            toast.error("Une erreur est survenue lors de la sauvegarde :(")
            //setShareLoad(true)
        })
    }

    const handleClickStreamer = () => setModeStreamer(!modeStreamer)

    return (
        <MainLayout showOverflow={true} onLoad={() => alert('cc')}>
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
                                    <span className="average">{val?.average == undefined ? " - " : val?.average}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className={`${modeStreamerSet ? "flex" : "hidden"} card p-4 gap-4 items-start modeStreamerSettings`}>
                        <h2 className="text-xl font-semibold">Paramètres du Mode Streamer</h2>
                        <div className="flex w-full items-center justify-between">
                            <label>Afficher le segment Cam</label>
                            <Switch
                                checked={camState}
                                onChange={() => { setCamState(!camState) }}
                                style={{ background: camState ? '#1956B1' : 'var(--light_background)' }}
                                className={` relative inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                            >
                                <span className="sr-only"></span>
                                <span
                                    aria-hidden="true"
                                    className={`${camState ? 'translate-x-[1.6rem]' : 'translate-x-0'} pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <label>Afficher le segment T'Chat</label>
                            <Switch
                                checked={chatState}
                                onChange={() => { setChatState(!chatState) }}
                                style={{ background: chatState ? '#1956B1' : 'var(--light_background)' }}
                                className={` relative inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                            >
                                <span className="sr-only"></span>
                                <span
                                    aria-hidden="true"
                                    className={`${chatState ? 'translate-x-[1.6rem]' : 'translate-x-0'} pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                        </div>
                    </div>
                    <div className="card flex p-4 flex-row w-full justify-between">
                        <span className="text-md font-semibold">Mode streamer</span>
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={modeStreamer}
                                onChange={handleClickStreamer}
                                style={{ background: modeStreamer ? '#8B5ABB' : 'var(--light_background)' }}
                                className={` relative inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                            >
                                <span className="sr-only"></span>
                                <span
                                    aria-hidden="true"
                                    className={`${modeStreamer ? 'translate-x-[1.6rem]' : 'translate-x-0'} pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                            <div onClick={() => { setModeStreamerSet(!modeStreamerSet) }}>
                                <Settings w={28} h={28} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-6 w-full h-full justify-center items-center">
                    <div className="rating_average items-start card">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">Note Finale</span>
                            <span className="text-xl">{items[itemActive].average}</span>
                        </div>
                        <div className="flex gap-6">
                            <input type="text" value={tierlistName} onChange={(e) => { setTierlistName(e.target.value) }} placeholder="Nom de la Tierlist" />
                            <button className="simple_button button_green" onClick={share} disabled={shareLoad}>Sauvegarder ma Tierlist</button>
                        </div>
                    </div>
                    <div className={`ratingList grid grid-cols-2 gap-4 overflow-x-hidden w-full ${modeStreamer ? "pr-4" : ""} overflow-y-auto`}>
                        {categoriesRating.map((rating, index) => {
                            return (
                                <div key={index} className="rating" style={{ overflow: 'hidden' }}>
                                    <span className="defil text-xl" style={{ animation: rating?.name?.length > 24 ? 'scroll 6s linear infinite' : '' }}>
                                        {rating?.name}
                                    </span>
                                    <div className="input">
                                        <input type="number" className="w-[6rem]" min="0" max="10" step="0.50" data-id-rating={index} onChange={handleChangeRating}  value={items[itemActive]?.rating?.[index].rate} />
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
