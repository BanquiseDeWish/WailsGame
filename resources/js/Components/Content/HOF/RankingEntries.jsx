import UserCardBatch from "@/Components/User/UserCardBatch";
import HoFEntry from "./HOFEntry";

export default class RankingEntries extends UserCardBatch {

    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            labelPoints: this.props.labelPoints,
            data: this.props.data,
            type: this.props.type
        }
    }

    getItem(index, cosmetics) {
        let position = index + 1;
        if(this.state.type != "mobile" && position <= 3) {
            return;
        }
        return <HoFEntry cosmetics={cosmetics} key={index} position={position} data={this.props.data[index]} labelPoints={this.state.labelPoints} />
    }
}