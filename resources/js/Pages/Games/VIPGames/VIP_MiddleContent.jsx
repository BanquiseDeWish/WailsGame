import { usePage } from '@inertiajs/react';
import { useValues } from './VIPGamesContext';

import Slot from '@/Components/Games/VIPGames/Slot';

export default function VIP_MiddleContent() {

    const props = usePage().props;
    const values = useValues().values;
    const modifyValue = useValues().modifyValue;

    return (
        <>
            <div className='flex flex-col gap-[24px] h-full w-[980px] relative'>
                <div id='game_news' className='h-[80px] w-full flex-shrink-0'>
                    {values.news_list}
                </div>

                <div className='flex-1 flex-shrink-0 w-full'>
                    <div className='container p-[16px] max-h-full h-full flex-shrink-0 w-full snow_cap_center'>
                        <div id='user-list-container' className='w-full overflow-hidden'>
                            <div id='user-list' className='w-full max-h-full flex flex-row flex-wrap gap-[8px] overflow-auto'>
                                {values.waiting_users}
                            </div>
                        </div>

                        <div id='tickets_pack' className='transition-back absolute my-hidden'>
                            {values.tickets}
                        </div>

                        <div id="wheels" className='transition-back absolute my-hidden'>
                            <Slot
                                id={'wheel_slot_1'}
                                type={'with_icon'}
                                onClick={() => { values.game.askRandomPlayer() }}
                                data={values.roll_players}
                                winner={values.choosen_player}
                                spin={values.spin_1}
                                link={props.ziggy.url + '/api/user/{id}/icon'}
                                onSpinEnd={() => {
                                    modifyValue('current_player', values.game.getPlayer(values.choosen_player));
                                    modifyValue('avatar', values.choosen_player);
                                }}
                                game_start={values.game_start}
                            />

                            <Slot
                                id={'wheel_slot_2'}
                                type={'text'}
                                onClick={() => { values.game.askRandomPlayCount() }}
                                data={values.roll_playCount}
                                winner={values.choosen_playCount}
                                spin={values.spin_2}
                                onSpinEnd={() => {
                                    modifyValue('playCount', values.choosen_playCount);
                                }}
                                game_start={values.game_start}
                            />
                        </div>
                    </div>
                </div>

                {/* Winning Menu */}
                <div id='winning_menu' className='container w-full h-full flex absolute my-hidden'>

                </div>

            </div>
        </>
    );
};