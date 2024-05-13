import '../../../css/profile.css'
import UserPenguin from './UserPenguin'
import Podium from './Podium'

export default function PodiumPenguin({ data, penguinData, noRequest }) {

    return (
        <>
            <div className="podium">
                <UserPenguin noRequest={noRequest} data={penguinData} className="penguin" width={172} user_id={data?.userID} />
                <Podium />
            </div>
        </>
    )

}
