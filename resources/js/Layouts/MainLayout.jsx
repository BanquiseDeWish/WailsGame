import { Link, router, usePage } from '@inertiajs/react';
import GlobalLayout from "./GlobalLayout";
import EasterEggEars from '@/Components/Easter-Egg/EasterEggEars';

import Navbar from '@/Components/Navigation/Navbar';

export default function MainLayout({ children }) {

    const props = usePage().props;

    return (
        <>
            <GlobalLayout>
                <Navbar />
                <EasterEggEars />
                <div className="p-[64px] h-full relative z-[1]">
                    {children}
                </div>
            </GlobalLayout>
        </>
    );
}
