import MainLayout from "@/Layouts/MainLayout"
import { Head } from "@inertiajs/react"
import '../../../css/tierlist.css'
import React, { useState, useEffect } from "react";
import env from '../../../../env.json';
import UserCard from "@/Components/User/UserCard";
import { Tooltip } from 'flowbite-react';


export default class TierListView extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            items: props.items,
            itemActive: undefined,
            user: props.user,
            sortFinish: JSON.parse(props.tlShare?.data)
        }
        this.twitch = props.auth.twitch
        this.itemCurrent = undefined;
        this.tierlist = props.tierlist;
        this.categoriesRating = props.categoriesRating;
        this.dataTierlist = JSON.parse(props.tlShare?.data)
    }

    componentDidMount() {
        this.state.items.forEach((item, index) => {
            const itemFind = this.dataTierlist.find((itm, idx) => item.id == itm.id);
            item.average = parseFloat(this.calcAverage(itemFind.rating))
        })
        const newSortItem = this.state.items.sort((a, b) => {
            return b.average - a.average;
        });
        this.setState(values => ({ ...values, ["items"]: newSortItem}))
        const idActiveDefault = newSortItem.length > 0 ? newSortItem[0].id : undefined
        this.setState(values => ({ ...values, ["itemActive"]: this.state.items.length > 0 ? this.state.items[0].id : undefined }))
        this.itemCurrent =  this.dataTierlist.find((item, idx) => item.id == idActiveDefault);
    }

    changeActiveItem = (id) => {
        if(id == this.state.itemActive) return;
        this.setState(values => ({ ...values, ["itemActive"]: id }))
        this.itemCurrent =  this.dataTierlist.find((item, idx) => item.id == id);
    }

    calcAverage = (ratingList) => {
        let totalRate = 0.0;
        ratingList?.forEach((val) => {
            totalRate += val.rate;
        })
        return parseFloat(totalRate / this.categoriesRating.length).toFixed(2)
    }


    render() {
        return (
            <MainLayout showOverflow={true}>
                <Head title={`${this.tierlist.name} - TierList`} />
                {this.state.sortFinish ?
                    <div className='tierlist flex h-full flex-col xl:flex-row gap-[24px] pb-[24px]'>
                        <div className="flex flex-col h-full gap-6">
                            <h2 className="text-2xl">TierList - {this.tierlist.name}</h2>
                            <div className="items">
                                {this.state.items.map((val, index) => {
                                    return (
                                        <div key={index} onClick={() => { this.changeActiveItem(val.id) }} className={`item ${this.state.itemActive == val?.id ? "active" : ""}`}
                                            style={{ background: `${this.state.itemActive == val?.id ? `url('/storage/tierlist/${this.props.idc}/items/${val.id}.webp')` : "var(--container_background)"}` }} >
                                            <span className="name">{val?.name}</span>
                                            <span className="average">{val.average}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-6 w-full h-full justify-start items-start">
                            <div className="rating_average flex-col lg:flex-row items-start card">
                                <div className="view flex flex-col">
                                    <span className="text-2xl font-bold">Note Finale</span>
                                    <span className={`${this.calcAverage(this.itemCurrent?.rating) >= 9 ? "average gold" : "average"} text-xl`}>{this.calcAverage(this.itemCurrent?.rating)}</span>
                                </div>
                                <div className="flex items-center gap-6">
                                    {this.twitch.id == this.props.user.twitch_id && <a className="simple_button button_green" href={route('tierlist.play', { id: this.tierlist.id, tls_id: this.props.tlShare?.id })}>Éditer ma Tierlist</a>}
                                    <UserCard twitchId={this.state.user?.twitch_id} data={{ username: this.state.user?.twitch_username == undefined ? " - " : this.state.user?.twitch_username }} />
                                </div>
                            </div>
                            <div className={`ratingList grid grid-cols-1 lg:grid-cols-2 pb-24 lg:pb-0 gap-4 overflow-x-hidden w-full oerflow-y-auto`}>
                                {this.state.itemActive !== undefined &&
                                    <>
                                        {this.categoriesRating.map((item, index) => {
                                            const itemCurrent =  this.dataTierlist.find((item, index) => item.id ==  this.state.itemActive);
                                            const rate = itemCurrent.rating.find((rating, idx) => idx == index);
                                            return (
                                                <div key={index} className="rating" style={{
                                                    textOverflow: 'ellipsis', overflow: 'hidden', alignItems: 'center', minHeight: '4rem',
                                                }}>
                                                    <div className="flex items-center gap-3 py-[8px] px-[16px]">
                                                        <img className="min-w-[28px] w-[28px] h-[28px]" src={`/storage/tierlist/${this.tierlist.id}/subcategory/${item.id}.svg`} alt="" />
                                                        <span className="defil text-xl">
                                                            {item?.name}
                                                        </span>
                                                    </div>
                                                    <span className="card px-[8px] py-[4px] text-lg container_background">{rate?.rate} / 10</span>
                                                </div>
                                            )
                                        })}
                                    </>
                                }

                            </div>
                        </div>
                    </div>

                    :

                    <div className="flex justify-center gap-6 items-center w-full h-full text-4xl">
                        <span className="loader-spin" /> Chargement de la Tierlist..
                    </div>
                }

            </MainLayout>
        )
    }


}
