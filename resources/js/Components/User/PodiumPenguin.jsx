import '../../../css/profile.css'
import Penguin from './Penguin'
import Podium from './Podium'

export default function PodiumPenguin({ data, penguinData, noRequest }) {

    return (
        <>
            <div className="podium">
                <Penguin noRequest={noRequest} data={penguinData} className="penguin" size={{ width: "172", height: "234" }} user_id={data?.userID} />
                <Podium />
            </div>
        </>
    )

}
