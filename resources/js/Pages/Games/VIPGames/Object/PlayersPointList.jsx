import UserCard from "@/Components/User/UserCard";
import UserCardBatch from "@/Components/User/UserCardBatch";


export default class PlayersPointList extends UserCardBatch {

    constructor(props) {
        super(props);
    }

    getItem(index, cosmetics) {

        let player = this.props.players[index];

        return (
            <UserCard
                key={index}
                propsCosmetics={cosmetics}
                data={{
                    username: player?.name ?? 'Unknown player',
                    points: player.points ?? 0,
                    stylePoints: 'default',
                    iconSize: 42,
                    labelPoints: {
                        singular: 'pt',
                        plural: 'pts'
                    }
                }}
                style={{
                    padding: '12px 16px'
                }}
            />
        )
    }
}