import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import '../../../css/overlay.css'
import BDWSocket from "@/Game/socket";
import logo from '../../../assets/img/pg_logo.png'
import Confetti from 'react-confetti'

export default class PrediGivrees extends React.Component {

    constructor(props) {
        super(props);
        this.socket = new BDWSocket('predigivre');
        this.state = {
            test: props?.test !== undefined ? props.test : false,
            show: false,
            result: false,
            winPosition: 0,
            pingOmni: 0,
            isConnected: this.socket?.connected,
        }
    }

    componentDidMount() {
        this.socket.on('connect', this.onConnect);
        this.socket.on('disconnect', this.onDisconnect);

        this.socket.socket.on('error', function(err) {
            throw new Error(err);
        });

        this.socket.socket.on('pronoKart__start', (args) => {
            const enabled = args.enabled
            this.setState((prevState) => ({ ...prevState, show: enabled }));
            this.setState((prevState) => ({ ...prevState, result: args.showResultAr }));
            this.setState((prevState) => ({ ...prevState, winPosition: 0 }));
            this.setState((prevState) => ({ ...prevState, pingOmni: 0 }));
            if(!enabled) {
                document.querySelector('.pronoKart').style.opacity = 0;
                document.querySelector('.pronoKart .list').childNodes.forEach((node) => {
                    node.querySelector('.pronoItem .state').innerText = "(0)";
                    node.querySelector('.pronoItem .progress .after').style.width = `0%`
                })
                document.querySelector('.pronoKart .statistics #voteCount').textContent = " - ";
                document.querySelector('.pronoKart .statistics #timeOutLeft').textContent = " - ";
            }
        })

        this.socket.on('pronoKart__update', (args) => {
            const mapData = new Map(args.data);
            let countTotal = 0;
            mapData.forEach((val) => countTotal += val.length);


            mapData.forEach((val, index) => {
                const percentage = (val.length * 100) / countTotal;
                document.querySelector('.pronoKart .pronoItem[id="prono__' + index + '"] .state')
                    .textContent = `(${val.length})`
                document.querySelector('.pronoKart .pronoItem[id="prono__' + index + '"] .progress .after')
                    .style.width = `${percentage}%`
            })

            document.querySelector('.pronoKart .statistics #voteCount').textContent = countTotal;
        })
        this.socket.on('pronoKart__timeout', (args) => {
            let timeOut = args.timeOut;
            let percentage = (timeOut * 100) / args.timeOutMax;
            if (percentage <= 0) {
                document.querySelector('.pronoKart').style.opacity = 0;
            }
            document.querySelector('.pronoKart .timeOutBar')
                .style.width = `${percentage}%`

            document.querySelector('.pronoKart .statistics #timeOutLeft').textContent = `${timeOut}s`;
        })
        this.socket.on('pronoKart__show', (args) => {
            this.setState((prevState) => ({ ...prevState, show: true }));
        })
        this.socket.on('pronoKart__showResult', (args) => {
            const pronoKart = args.data;
            console.log('Show result!')
            this.setState((prevState) => ({ ...prevState, result: true }));
            this.setState((prevState) => ({ ...prevState, winPosition: index }));
            this.setState((prevState) => ({ ...prevState, pingOmni: args.pingOmni }));
            this.setState((prevState) => ({ ...prevState, show: true }));
            document.querySelector('.overlay .pronoKart').style.opacity = 1;
            const index = args.posWin
        })
    }

    componentWillUnmount() {
        this.socket.off('connect', this.onConnect);
        this.socket.off('disconnect', this.onDisconnect);
    }

    onConnect = () => {
        this.setState((prevState) => ({ ...prevState, isConnected: true }));
    }

    onDisconnect = () => {
        this.setState((prevState) => ({ ...prevState, isConnected: false }));
    }

    CompPos = (pos) => {
        return (
            <div key={pos} className="pronoItem" id={`prono__${pos}`}>
                <div className="title">{pos == 1 ? `${pos}er` : `${pos}ème`}</div>
                <div className='progress'><div className='after'></div></div>
                <div className='state'>(0)</div>
            </div>
        )
    }

    pols = () => {
        const rows = [];
        for (let i = 1; i <= 12; i++) {
            rows.push(this.CompPos(i))
        }
        return rows;
    }

    render() {

        return (
            <div className="overlay">
                <Confetti
                    className={`display: ${this.state.result ? "opacity-1" : "opacity-0"}`}
                    style={{ zIndex: 100 }}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    />
                <Head title="PrediGivrees Overlay" />
                <div className="pronoKart" style={{ opacity: this.state.test ? 1 : this.state.show ? 1 : 0 }}>
                    <div className="flex flex-col justify-center items-center">
                        <img src={logo} alt="logo" />
                        <div className="subtitle">!pg [position]</div>
                    </div>
                    <div className={`result`} style={{ display: this.state.result ? "flex" : "none" }}>
                        <h2 className="text-white text-[4rem] font-extrabold">Résultat</h2>
                        <div className="stats flex flex-wrap gap-6 my-4 w-full justify-center py-10 rounded-2xl">
                            <div className="flex flex-col justify-center items-center">
                                <span className="text-white text-7xl font-extrabold">{this.state.winPosition == 1 ? `${this.state.winPosition}er` : `${this.state.winPosition}ème`}</span>
                                <h4 className="text-white text-center text-4xl font-extrabold">Position <br /> gagnante</h4>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <span className="text-white text-7xl font-extrabold">{this.state.pingOmni}</span>
                                <h4 className="text-white text-center text-4xl font-bold">Pingouin(s) <br /> omniscient</h4>
                            </div>
                        </div>
                        <h2 className="text-white text-4xl text-center font-extrabold italic">Les personnes ayant votés une place au dessus et en dessous gagnent 1 point</h2>
                    </div>
                    <div className={`list`} style={{ display: this.state.result ? "none" : "grid" }}>
                        {this.pols()}
                    </div>
                    <div className={`statistics`} style={{ display: this.state.result ? "none" : "flex" }}>
                        <div className="timeOut text-white">
                            <span id="timeOutLeft" className="text-[4rem]">N/A</span>
                            <span className="text-[2rem] font-semibold ">Temps restant</span>
                        </div>
                        <div className="voteCount text-white">
                            <span id="voteCount" className="text-[4rem]">0</span>
                            <span className="text-[2rem] font-semibold ">Votes totaux</span>
                        </div>
                    </div>
                    <div className="timeOutBar" style={{ width: "100%" }}></div>
                </div>
            </div>
        )
    }

}
