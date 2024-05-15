import UserCard from "@/Components/User/UserCard";
import UserCardBatch from "@/Components/User/UserCardBatch";

export default class WaitingList extends UserCardBatch {
    
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
        }
    }

    getItem(index, cosmetics) {
        let player = this.props.data.players[index];
        return (
            <UserCard className="h-[82px]" propsCosmetics={cosmetics} key={index} data={{ username: (player !== undefined ? `${player?.username}` : ' - ') }}/>
        );
    }
} 