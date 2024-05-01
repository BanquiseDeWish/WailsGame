import { Link, router, usePage } from '@inertiajs/react';
import GlobalLayout from "./GlobalLayout";
import EasterEggEars from '@/Components/Easter-Egg/EasterEggEars';
import EasterEggHizzle from '@/Components/Easter-Egg/EasterEggHizzle';

import Navbar from '@/Components/Navigation/Navbar';
import ProfileDropdown from '@/Components/Navigation/ProfileDropdown';
import AdminSidebar from '@/Components/Navigation/AdminSidebar';
import AppLogo from '@/Components/AppLogo';

export default function AdminLayout({ children, className, title }) {

    const props = usePage().props;
    const auth = props.auth.twitch;
    console.log(auth)

    return (
        <>
            <GlobalLayout>
                <div id='main-content' className={`w-[100dvw] p-[16px] lg:p-[32px] h-full z-[1] ${className}`} >
                    <div className="flex w-full h-full gap-8">
                        <div className="flex flex-col gap-2 h-full w-1/6 items-start">
                            <AppLogo className="z-0 absolute left-1/2 -translate-x-1/2 lg:flex lg:relative lg:left-auto lg:translate-x-0" />
                            <h3 className="text-[20px] text-center w-full">Panel Admin</h3>
                            <aside className="card justify-start p-4 w-full flex-1 items-start">
                                <AdminSidebar />
                            </aside>
                        </div>
                        <div className="content flex flex-col flex-1">
                            <div className="flex justify-between items-center">
                                <div className="title">
                                    <h2 className='text-[32px] font-semibold'>{title}</h2>
                                </div>
                                <div className="navUser">
                                    <ProfileDropdown />
                                </div>
                            </div>
                            <div className='flex-1'>
                                {children}
                            </div>
                        </div>
                    </div>
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
