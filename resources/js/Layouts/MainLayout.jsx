import { Link, router, usePage } from '@inertiajs/react';
import GlobalLayout from "./GlobalLayout";
import EasterEggEars from '@/Components/Easter-Egg/EasterEggEars';

import Navbar from '@/Components/Navigation/Navbar';

export default function MainLayout({ children, showOverflow }) {

    const props = usePage().props;

    return (
        <>
            <GlobalLayout showOverflow={showOverflow}>
                <Navbar />
                <EasterEggEars />
                <div className="w-[100dvw] xl:w-auto p-[16px] xl:p-[64px] xl:h-full relative z-[1]">
                    {children}
                </div>
            </GlobalLayout>
        </>
    );
}
