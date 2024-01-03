import { Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';


import MainLayout from '@/Layouts/MainLayout';

export default function ShinyRaceBattle() {

    const props = usePage().props;

    return (
        <MainLayout showOverflow={true}>
            <Head title="Shiny Race Battle" />

        </MainLayout>
    );
}