import UserCardBatch from "@/Components/User/UserCardBatch";
import UserCard from "@/Components/User/UserCard";

export default class ResultList extends UserCardBatch {

    constructor(props) {
        super(props);
    }

    getItem(index, cosmetics) {
        let player = this.props.playersListScore[index];
        const position = (index + 1);
        let displayPosition = `${position}e`
        if (position == 1) displayPosition = `${position}er`

        return (
            <div className="flex w-full items-center gap-4">
                <h2 className='text-[38px] font-semibold min-w-[70px] text-center'>{displayPosition}</h2>
                <div className={`player w-full ${player?.isConnected ? 'opacity-100' : 'opacity-40'}`} key={index}>
                    <UserCard
                        propsCosmetics={cosmetics}
                        className="w-full h-[82px]"
                        style={{ backgroundColor: 'var(--container_background) !important;' }}
                        key={index}
                        data={{ username: (player !== undefined ? `${player?.username}` : ' - '), points: player.score, stylePoints: 'default', background_style: "var(--container_background)" }} />
                </div>
            </div>
        )
    }

}