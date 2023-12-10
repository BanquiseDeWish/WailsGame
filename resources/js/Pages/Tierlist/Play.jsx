import MainLayout from "@/Layouts/MainLayout"
import { Head, router, usePage } from "@inertiajs/react"
import '../../../css/tierlist.css'
import { useState, useEffect, useRef } from "react";
import Settings from '@/Components/Icons/Settings';
import { toast } from "sonner";
import BDWSwitch from "@/Components/BDWSwitch";

/*WeilsMood*/
import BadWeils from '../../../assets/img/tierlist/WeilsMood/bad.png'
import BadLittleWeils from '../../../assets/img/tierlist/WeilsMood/bad_little.png'
import MehWeils from '../../../assets/img/tierlist/WeilsMood/meh.png'
import WhyNotWeils from '../../../assets/img/tierlist/WeilsMood/why_not.png'
import GoodWeils from '../../../assets/img/tierlist/WeilsMood/good.png'
import AmazingWeils from '../../../assets/img/tierlist/WeilsMood/amazing.png'
import PerfectWeils from '../../../assets/img/tierlist/WeilsMood/perfect.png'
import TooCrazyWeils from '../../../assets/img/tierlist/WeilsMood/toocrazy.png'
/**********/

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
    const [moodWeils, setMoodWeils] = useState(BadWeils)
    const [bgAverage, setBgAverage] = useState("default");
    const tlsID = useRef(props.tlShare?.id)

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


    }, [])

    useEffect(() => {
        console.log('Update', tlShare)
    }, [tlShare])

    useEffect(() => {
        updateWeils()
        changeActiveItem(itemActive)
    }, [items])

    useEffect(() => {
        updateWeils()
        if (hasUpdate == undefined) setHasUpdate(false);
        else if (hasUpdate) {
            setHasUpdate(false)
            autoSave().then((data) => {
                setTLShare(data)
                tlsID.current = data?.id
            })
        }

        console.log('Launch counter auto save')
        const interval = setInterval(() => {
            console.log('AutoSave!', tlsID)
            setHasUpdate(false)
            autoSave().then((data) => {
                setTLShare(data)
                tlsID.current = data?.id
            })
        }, 120000);
        return () => clearInterval(interval);
    }, [itemActive])

    const updateWeils = () => {
        if(items[itemActive]?.average >= 0 && items[itemActive]?.average <= 1.99) {
            setMoodWeils(BadWeils);
            setBgAverage('bad')
        }else if(items[itemActive]?.average >= 2 && items[itemActive]?.average <= 3.99) {
            setMoodWeils(BadLittleWeils);
            setBgAverage('badLittle')
        }else if(items[itemActive]?.average >= 4 && items[itemActive]?.average <= 4.99) {
            setMoodWeils(MehWeils);
            setBgAverage('meh')
        }else if(items[itemActive]?.average >= 5 && items[itemActive]?.average <= 5.99) {
            setMoodWeils(WhyNotWeils);
            setBgAverage('whyNot')
        }else if(items[itemActive]?.average >= 6 && items[itemActive]?.average <= 6.99) {
            setMoodWeils(GoodWeils);
            setBgAverage('good')
        }else if(items[itemActive]?.average >= 7 && items[itemActive]?.average <= 7.99) {
            setMoodWeils(AmazingWeils);
            setBgAverage('amazing')
        }else if(items[itemActive]?.average >= 8 && items[itemActive]?.average <= 8.99) {
            setMoodWeils(PerfectWeils);
            setBgAverage('perfect')
        }else if(items[itemActive]?.average >= 9 && items[itemActive]?.average <= 10) {
            setMoodWeils(TooCrazyWeils);
            setBgAverage('tooCrazy')
        }
    }

    const autoSave = (tls) =>{
        return new Promise((resolve, reject) => {
            //tls
            share(true).then((tls) => {
                console.log(tls)
                toast.success('Sauvegarde automatique terminée')
                return resolve(tls);
            }).catch((err) => {
                console.log(err)
                return reject();
            })
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
            console.log('TLShareID?', tlShare)
            const data = []
            items.forEach((item) => {
                data.push({ average: item.average, category_id: item.category_id, id: item.id, rating: item.rating })
            })
            axios.post(route('tierlist.share'), {
                category_id: props.idc,
                tls_id: tlsID.current,
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
                    window.history.replaceState({}, null, resp.data?.tls?.id)
                    return resolve(resp.data?.tls)
                }
            }).catch(() => {
                setShareLoad(false)
                toast.error("Une erreur est survenue lors de la sauvegarde :(")
                return reject()
            })
        })
    }

    /*useEffect(() => {

    }, []);*/

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
                    <div className="card hidden 2xl:flex p-4 flex-row w-full justify-between">
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
                    <div className={`rating_average ${bgAverage} flex-col lg:flex-row items-start card`} style={{ padding: 0 }}>
                        <div className="view flex flex-col p-[16px]">
                            <span className="text-2xl font-bold" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '170px' }}>Note Finale</span>
                            <span className={`${items[itemActive].average >= 9 ? "average gold" : "average"} text-xl`}>{items[itemActive].average}</span>
                        </div>
                        <div className="relative w-[6rem] h-[6rem] hidden lg:flex">
                            <img style={{ width: '60%' }} class="weilsMood" src={moodWeils} alt="mood_weils" />
                        </div>
                        <div className="flex gap-6 p-[16px]">
                            <input type="text" value={tierlistName} onChange={(e) => { setTierlistName(e.target.value) }} disabled={shareLoad} placeholder="Nom de la Tierlist" />
                            <button className="simple_button button_green" onClick={() => { share(false) }} disabled={shareLoad}>Sauvegarder</button>
                        </div>
                    </div>
                    <div className={`ratingList grid grid-cols-1 2xl:grid-cols-2 pb-24 lg:pb-0 gap-4 overflow-x-hidden w-full ${modeStreamer ? "pr-4" : ""} overflow-y-auto`}>
                        {categoriesRating.map((rating, index) => {
                            return (
                                <div key={index} className={`rating ${bgAverage}`} style={{ minHeight: '4rem', overflow: 'hidden' }}>
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
                    <div className="streamer hidden 2xl:flex">
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
