import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import BDWSocket from '../../Game/socket';
import { useEffect, useState } from 'react';
import GreenButton from '@/Components/Navigation/Buttons/GreenButton';
import crypto from 'node:crypto'
let socket = null;
import { toast } from 'sonner'
import PenguinCard from '@/Components/User/PenguinCard';
import '../../../css/kartChance.css'
import KCBuild from '@/Components/KCBuild';
import BinIcon from '@/Components/Icons/BinIcon';
import RefreshIcon from '@/Components/Icons/RefreshIcon'
export default function KartChanceIndex(props) {


    const [isConnected, setIsConnected] = useState(socket?.connected);
    const [players, setPlayers] = useState([]);
    const [nameNewPlayer, setNameNewPlayer] = useState('')
    const isWeils = props.auth && props.auth.twitch && props.auth.twitch.id == props.weils_id;

    useEffect(() => {
        if (players.length > 0) setPlayers([]);
        socket = new BDWSocket("kartchance", { isWeils: isWeils !== null ? isWeils : false})
        if (socket !== null) {
            function onConnect() {
                setPlayers([]);
                setIsConnected(true);
            }

            function onDisconnect() {
                setPlayers([]);
                setIsConnected(false);
            }

            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);
            socket.on('kc_update_add_player', (newPlayer) => {
                toast.success(`Ajout de ${newPlayer.uname} efféctué avec succès`)
                setPlayers(players => [...players, newPlayer]);
            })
            socket.on('kc_update_list_player', (newPlayersList) => {
                setPlayers(newPlayersList);
            })
            socket.on('kc_players_limit', () => {
                toast.error("Limite de joueurs atteint")
            })
            socket.on('kc_players_randomize_finish', (players) => {
                setPlayers(players)
            })

            return () => {
                socket.off('connect', onConnect);
                socket.off('disconnect', onDisconnect);
            };
        }
    }, []);

    useEffect(() => {
    }, [players])

    const addPlayerRandom = () => {
        const id = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        const name = nameNewPlayer;
        if(nameNewPlayer == "") return toast.error('Vous devez entrez un pseudo valide.')
        setNameNewPlayer("")
        socket.emit('kc_new_player', { uid: id, uname: name })
    }

    const randomize = () => {
        socket.emit('kc_randomize_start', {})
    }

    const reRandomAll = (uid, type) => {
        socket.emit('kc_randomize_rerandom_all_player', { uid: uid })
    }

    const reRandomElement = (uid, type) => {
        socket.emit('kc_randomize_rerandom_type_player', { uid: uid, type: type })
    }

    const removeAllPlayers = () => {
        socket.emit('kc_remove_all_players', {})
    }

    const removePlayer = (uid) => {
        const player = players.find((player) => player.uid === uid)
        if(player == undefined) return;

        toast.success(`Suppression de ${player.uname} efféctué avec succès`)
        socket.emit('kc_remove_player', { uid: uid })
    }

    return (
        <MainLayout>
            <Head title="Kart Chance" />

            <div className="kartChance w-full px-16 flex gap-4">
                <div className="card h-fit gap-4 items-start">
                    <input type="text" value={nameNewPlayer} onChange={(e) => { setNameNewPlayer(e.target.value) }} placeholder='Pseudo du joueur' />
                    <GreenButton onClick={addPlayerRandom}>Ajouter un joueur</GreenButton>
                    <GreenButton onClick={removeAllPlayers}>Supprimer les joueurs</GreenButton>
                </div>
                <div className="card gap-10 flex-1 justify-start items-center" style={{ maxHeight: 'calc(100vh - 20%)', minheight: 'fit-content'  }}>
                    {players.length <= 0 &&
                        (
                            <div class="flex justify-center items-center h-full w-full">
                                <span className="text-2xl">Aucun joueurs</span>
                            </div>
                        )
                    }
                    {players.length > 0 &&
                        (
                            <>
                                <div className="flex flex-wrap gap-6 overflow-y-auto items-center justify-center" style={{ height: 'fit-content' }}>
                                    {players.map((val, index) => {
                                        return (
                                            <div key={index} className="player" style={{ height: 'fit-content' }}>
                                                <div className='reRandomAll' onClick={() => { reRandomAll(val.uid) }}><RefreshIcon width={18} height={18} /></div>
                                                <div className='delete' onClick={() => { removePlayer(val.uid) }}><BinIcon width={18} height={18}/></div>
                                                <PenguinCard data={{ username: val.uname }} />
                                                <KCBuild reRandomElement={reRandomElement} uid={val.uid} character={val?.build?.character} vehicle={val?.build?.vehicle} glider={val?.build?.glider} tire={val?.build?.tire} />
                                            </div>
                                        )
                                    })}
                                </div>
                                <GreenButton onClick={randomize}>Randomizer !</GreenButton>
                            </>
                        )
                    }

                </div>
            </div>


        </MainLayout>
    )

}
