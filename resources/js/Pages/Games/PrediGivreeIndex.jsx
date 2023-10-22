import { Head } from '@inertiajs/react';
import GlobalLayout from '@/Layouts/GlobalLayout';

import MKTitle from '../../../assets/games/mario_kart_title.png'

export default function PrediGivreeIndex(props) {

    console.log(props)

    return (
        <GlobalLayout>
            <Head title="Prédictions Givrées" />
            <div className="prediGivre hof">
                <img width="650px" src={MKTitle} alt="MKTitle" />
            </div>
        </GlobalLayout>
    );
}
