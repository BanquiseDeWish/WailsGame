import GreenButton from "@/Components/Navigation/Buttons/GreenButton"

import Slot from '@/Components/Games/VIPGames/Slot';

export default function GamePhaseHunt({socket, globalValues, ...otherProps}) {

    console.log(globalValues.players_list);

    return (
        <div className="flex flex-col gap-16 justify-center items-center">
            <div className="flex flex-row gap-8">
                <Slot
                    id={"player_wheel"}
                    type={"with_icon"}
                    winner={undefined}
                    onSpinEnd={() => {
                        console.log('spin player end');
                    }}
                    data={globalValues.players_list}
                    game_start={true}
                    noButton
                />
                <Slot
                    id={"map_wheel"}
                    type={"text"}
                    winner={undefined}
                    onSpinEnd={() => {
                        console.log('spin map end');
                    }}
                    data={globalValues.map_list}
                    game_start={true}
                    noButton
                />    
            </div>
            { globalValues?.isLeader && <GreenButton className="w-fit button_green outline-none" onClick={() => {
                globalValues?.socket?.emit('update_game_status', {type: 'map'});
            }}>Lancer le Tirage</GreenButton>}
            { globalValues?.isLeader && globalValues?.areMapsChosen && <GreenButton className="w-fit button_green outline-none" >Allons Shasser !</GreenButton>}
        </div>
    )

}