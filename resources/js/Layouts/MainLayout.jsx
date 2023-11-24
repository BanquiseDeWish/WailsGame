import { Link, router, usePage } from '@inertiajs/react';
import GlobalLayout from "./GlobalLayout";
import EasterEggEars from '@/Components/Easter-Egg/EasterEggEars';

import Navbar from '@/Components/Navigation/Navbar';

export default function MainLayout({ children, showOverflow, className }) {

    const props = usePage().props;

    return (
        <>
            <GlobalLayout showOverflow={showOverflow}>
                <Navbar />
                <EasterEggEars />
                <div className={`w-[100dvw] p-[16px] lg:p-[32px] h-full relative z-[1] ${className}`} >
                    {children}
                </div>
            </GlobalLayout>
        </>
    );
}
