import '../../css/cards.css';
import { Link } from '@inertiajs/react';

export default function GameCard({ titleImg, coverImg, characterImg, routeName }) {

    return (
        <>
            <Link href={route(routeName)}>
            <div className="gameCard">
                <div className="wrapper">
                    <img src={coverImg} className="cover-image pointer-events-none select-none" />
                </div>
                <img src={titleImg} className="title pointer-events-none select-none" />
                <img src={characterImg} className="character pointer-events-none select-none" />
            </div>
            </Link>
        </>
    );

}
