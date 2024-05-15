import UserCard from "@/Components/User/UserCard";
import UserCardBatch from "@/Components/User/UserCardBatch";

export default class PlayerList extends UserCardBatch {

    /**
     * 
     * @param {} props 
     * playersListScore: Array of players
     * resultAnswersPlayers: Object
     */

    constructor(props) {
        super(props);
    }

    getItem(index, cosmetics) {

        let player = this.props.playersListScore[index];

        let isBad = undefined;
        if (this.props.resultAnswersPlayers !== undefined) {
            const playerFind = this.props.resultAnswersPlayers?.list?.find((pl) => pl.id == player.userId)
            if (playerFind) {
                isBad = playerFind.isBad
            }
        }

        const position = (index + 1);
        let displayPosition = `${position}e`
        if (position == 1) displayPosition = `${position}er`

        return (
            <div className={`player flex gap-0 items-center flex-row w-full ${player?.isConnected ? 'opacity-100' : 'opacity-40'}`} key={index}>
                <h2 className='text-[28px] font-semibold min-w-[70px] text-center'>{displayPosition}</h2>
                <UserCard
                    propsCosmetics={cosmetics}
                    className="w-full h-[82px] transition-all"
                    key={index}
                    data={
                        {
                            username: (player !== undefined ? `${player?.username}` : ' - '),
                            points: player.score,
                            stylePoints: 'default',
                            background_style: isBad !== undefined ? isBad ? 'linear-gradient(128deg, var(--container_background) 55%, rgba(107,32,24,1) 100%)' : 'linear-gradient(128deg, var(--container_background) 55%, rgba(32,112,25,1) 100%)' : 'var(--container_background)'
                        }
                    }
                />
            </div>
        )
    }

    render() {
        return (
            <div className="players h-full">
                {super.render()}
            </div>
        )
    }

}