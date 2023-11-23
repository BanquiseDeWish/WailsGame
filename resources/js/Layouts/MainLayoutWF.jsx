import { Link, router, usePage } from '@inertiajs/react';
import GlobalLayout from "./GlobalLayout";
import EasterEggEars from '@/Components/Easter-Egg/EasterEggEars';
import Footer from '@/Components/Content/Footer';

import Navbar from '@/Components/Navigation/Navbar';

export default function MainLayoutWF({ children }) {

    const props = usePage().props;

    return (
        <>
            <GlobalLayout>
                <Navbar />
                <EasterEggEars />
                <div className="p-[64px] w-full h-full relative z-[1]">
                    {children}
                </div>
                <Footer />
            </GlobalLayout>
            <style>
                {`
                    html, body {
                        overflow-y: auto !important;
                        overflow-x: hidden !important;
                    }
                `}
            </style>
        </>
    );
}
