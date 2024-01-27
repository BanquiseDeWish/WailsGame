import GreenButton from "@/Components/Navigation/Buttons/GreenButton"

import Slot from '@/Components/Games/VIPGames/Slot';

export default function GamePhaseHunt({socket, globalValues, ...otherProps}) {

    return (
        <>
            <Slot
                id={'player_wheel'}
                type={'player'}
                data={globalValues.players_list}
                winner={undefined}
                spin={undefined}
                game={undefined}
                game_start={true}
                modifyValueParent={undefined}
            />
            { globalValues?.isLeader && <GreenButton className="w-fit button_green outline-none" onClick={() => {
                globalValues?.socket?.emit('update_game_status', {type: 'map'});
            }}>Lancer le Tirage</GreenButton>}
            { globalValues?.isLeader && globalValues?.areMapsChosen && <GreenButton className="w-fit button_green outline-none" >Allons Shasser !</GreenButton>}
        </>
    )

}