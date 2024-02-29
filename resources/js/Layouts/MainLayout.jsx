import { Link, router, usePage } from '@inertiajs/react';
import GlobalLayout from "./GlobalLayout";
import EasterEggEars from '@/Components/Easter-Egg/EasterEggEars';
import EasterEggHizzle from '@/Components/Easter-Egg/EasterEggHizzle';

import Navbar from '@/Components/Navigation/Navbar';

export default function MainLayout({ children, showOverflow, className, disableEvent }) {

    const props = usePage().props;

    return (
        <>
            <GlobalLayout showOverflow={showOverflow} disableEvent={disableEvent}>
                <Navbar />
                <EasterEggEars />
                <EasterEggHizzle />
                <div id='main-content' className={`w-[100dvw] p-[16px] lg:p-[32px] h-full z-[1] ${className}`} >
                    {children}
                </div>
            </GlobalLayout>
            <style>{`
                #main-content {
                    min-height: calc(100vh - 93px);
                }
            `}
            </style>
        </>
    );
}
