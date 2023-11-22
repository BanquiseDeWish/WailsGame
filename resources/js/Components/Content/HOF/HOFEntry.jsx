import PenguinCard from "../../User/PenguinCard";

export default function HOFEntry({ position, data, labelPoints }) {

    return (
        <div className="entry">
            <div className="position card">{ position }</div>
            <PenguinCard data={{ username: data?.userName, points: data?.points, labelPoints: labelPoints, stylePoints: "default" }} />
        </div>
    )

}
