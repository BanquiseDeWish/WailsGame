import '../../../../css/vipgames.css';

export default function GameNewsItem({userId, userName, subText, ...props}) {
    return (
        <>
            <div className="game_news_item container" {...props}>
                <img src="" alt="" className='rounded-full h-[48px]' width={48}/>
                <div className='flex flex-col gap-[0px]'>
                    <div className='item_username'>{userName}</div>
                    <div className='item_subtext'>{subText}</div>
                </div>
            </div>
        </>
    );
}