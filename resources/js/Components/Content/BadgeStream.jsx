export default function BadgeStream({ onLive, counter }) {

    return (
        <div className="flex justify-center">
            <a href="https://twitch.tv/weilsttv" target="_blank" className={`badge_state_live ${onLive ? "on" : "off"}`}>
                <div className="flex gap-[16px] items-center">
                    <span className="state" />
                    <span className='flex items-center gap-4'>
                        {onLive ? "En Stream" : "Hors Stream"}
                        {onLive && (<div className="flex items-center gap-2"><Eye /> {counter}</div>)}
                    </span>
                </div>
            </a>
        </div>
    )

}
