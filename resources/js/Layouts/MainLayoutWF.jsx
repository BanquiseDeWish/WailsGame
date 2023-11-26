import { Link, router, usePage } from '@inertiajs/react';
import GlobalLayout from "./GlobalLayout";
import EasterEggEars from '@/Components/Easter-Egg/EasterEggEars';
import Footer from '@/Components/Content/Footer';

import Navbar from '@/Components/Navigation/Navbar';

export default function MainLayoutWF({ children }) {

    const props = usePage().props;

    return (
        <>
            <GlobalLayout showOverflow={true}>
                <Navbar />
                <EasterEggEars />
                <div id='main-content' className="w-full h-full relative z-[1]">
                    {children}
                    <Footer />
                </div>
            </GlobalLayout>
            <style>
                {`
                    #main-content {
                        min-height: calc(100vh - 93px);
                    }
                    html, body {
                        overflow-y: auto !important;
                        overflow-x: hidden !important;
                    }
                `}
            </style>
        </>
    );
}
