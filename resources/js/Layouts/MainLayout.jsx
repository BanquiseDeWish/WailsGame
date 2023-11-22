import { Link, router, usePage } from '@inertiajs/react';
import GlobalLayout from "./GlobalLayout";
import EasterEggEars from '@/Components/Easter-Egg/EasterEggEars';
import AppLogo from '@/Components/AppLogo';

import Navbar from '@/Components/Navigation/Navbar';

export default function MainLayout({ children }) {

    const props = usePage().props;

    return (
        <>
            <GlobalLayout>
                <div className="relative flex flex-row w-full items-center justify-between p-8">
                    <AppLogo />
                    <Navbar />
                </div>
                <EasterEggEars />
                <div className="p-[64px] h-full relative z-[1]">
                    {children}
                </div>
            </GlobalLayout>
        </>
    );
}
