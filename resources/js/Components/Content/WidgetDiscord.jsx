import Discord from '@/Components/Icons/Discord';

export default function WidgetDiscord({ discordData }) {

    return (
        <div className="discord hidden lg:flex">
            <div className="head">
                <Discord width={32} height={32} />
                <span className="title">Rejoignez la communauté sur Discord !</span>
            </div>
            <div className="list">
                {discordData !== undefined &&
                    discordData?.members?.map((member, index) => {
                        return (
                            <div key={index} className="user">
                                <div className="avatar"><img src={member?.avatar_url} alt="avatar_discord" /></div>
                                <div className="infos">
                                    <div className="username">{member?.username}</div>
                                    <div className="state">{member?.status}{member?.game !== undefined ? ` - ${member?.game?.name}` : ""}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="actions">
                <a className='join' href="https://dcord.banquisedeweils.fr">Rejoindre le discord</a>
            </div>
        </div>
    )


}
