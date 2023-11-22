import '../../../css/profile.css'
import Penguin from './Penguin'
import Podium from './Podium'

export default function PodiumPenguin() {

    return (
        <>
            <div className="podium">
                <Penguin />
                <Podium />
            </div>
        </>
    )

}
