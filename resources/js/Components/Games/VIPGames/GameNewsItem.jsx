import '../../../../css/vipgames.css';
import { usePage } from '@inertiajs/react';

export default function GameNewsItem({userId, userName, subText, ...otherProps}) {
    const props = usePage().props;
    return (
        <>
            <div className="game_news_item container">
                <img src={props.ziggy.url + '/api/user/' + userId + '/icon'} alt="" className='rounded-full h-[48px]' width={48}/>
                <div className='flex flex-col gap-[0px] w-full overflow-hidden'>
                    <div className='item_username'>{userName}</div>
                    <div className='item_subtext'>{subText}</div>
                </div>
            </div>
        </>
    );
}