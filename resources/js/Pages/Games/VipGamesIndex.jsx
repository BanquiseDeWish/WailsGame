import { Head, usePage} from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

import GreenButton from '@/Components/Buttons/GreenButton';
import BlueButton from '@/Components/Buttons/BlueButton';

import HOFTable from '@/Components/HOFTable';

import MainLayout from '@/Layouts/MainLayout';
import VictoryLogo from '../../../assets/games/vipgames_victory.svg'

export default function VipGamesIndex() {

    const props = usePage().props;

    return (
        <MainLayout>
            <Head title="VIP Games" />
            <div className="hof">
                <HOFTable logoPos={-70} load={false} logo={VictoryLogo} data={props.ranking} labelPoints={{ singular: "Victoire", plural: "Victoires" }} />
            </div>


        </MainLayout>
    );
}
