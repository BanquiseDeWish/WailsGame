

import UserCard from '@/Components/User/UserCard';

export default function PlayersList({ playersListScore, globalValues }) {

    return (
        <div className="players w-full h-full">
            <div className="card items-start p-4 justify-start max-h-[340px] min-h-[340px] gap-4 w-full lg:w-[400px] lg:min-w-[400px] overflow-y-auto">
                {playersListScore.map((player, i) => {

                    let isBad = undefined;
                    if (globalValues.current?.resultAnswersPlayers !== undefined) {
                        const playerFind = globalValues.current?.resultAnswersPlayers?.list?.find((pl) => pl.id == player.userId)
                        if (playerFind) {
                            isBad = playerFind.isBad
                        }
                    }

                    const position = (i + 1);
                    let displayPosition = `${position}e`
                    if (position == 1) displayPosition = `${position}er`

                    return (
                        <div className={`player overflow-x-hidden flex gap-2 items-center flex-row w-full ${player?.isConnected ? 'opacity-100' : 'opacity-40'}`} key={i}>
                            <h2 className='hidden md:flex text-[28px] font-semibold w-full text-center'>{displayPosition}</h2>
                            <UserCard
                                className="w-full h-[82px] transition-all"
                                style={{ backgroundColor: 'var(--container_background) !important;' }}
                                skeleton={player == undefined}
                                key={i}
                                twitchId={player?.userId}
                                data={
                                    {
                                        username: (player !== undefined ? `${player?.username}` : ' - '),
                                        points: player.score + "10",
                                        stylePoints: 'default',
                                        background_style: isBad !== undefined ? isBad ? 'linear-gradient(128deg, var(--container_background) 55%, rgba(107,32,24,1) 100%)' : 'linear-gradient(128deg, var(--container_background) 55%, rgba(32,112,25,1) 100%)' : 'var(--container_background)'
                                    }
                                }
                            />
                        </div>
                    )

                })}
            </div>
        </div>
    )
}
