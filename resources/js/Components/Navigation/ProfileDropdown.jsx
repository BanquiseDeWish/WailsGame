import { Menu, Transition } from '@headlessui/react'
import { usePage, Link } from '@inertiajs/react'
import { Fragment, useEffect, useRef, useState } from 'react'

export default function ProfileDropdown() {

    const props = usePage().props;
    const auth = props.auth.twitch;
    const isWeils = auth && auth.id == props.weils_id;

    /*
    <Link href={route('profile.appearance')} className="link">
        Apparence
    </Link>
    */

    return (
        <Menu as="div" className="relative inline-block text-left notifications">
            <div className='flex justify-start items-center'>
                <Menu.Button style={{ background: 'transparent' }} className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md text-sm font-semibold shadow-sm">
                    <img width={56} height={56} style={{ borderRadius: 50 }} src={auth?.profile_image_url} alt="avatar_twitch" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items style={{ background: "var(--container_background)" }} className="absolute dropdown right-0 z-[100] mt-2 w-56 origin-top-right rounded-[4px] bg-[] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-[16px] flex flex-col gap-4">
                        <div className="user flex gap-4 items-center text-white text-[14px] font-[500]">
                            <img width={40} height={40} style={{ borderRadius: 50 }} src={auth?.profile_image_url} alt="avatar_twitch" />
                            <span>{auth?.display_name}</span>
                        </div>
                        <div className="separator w-full"></div>
                        <div className="menu">
                            <Link href={route('profile.index')} className="link">
                                Profil
                            </Link>
                            {isWeils &&
                                <Link href={"/dashboard"} className="link">
                                    Espace privé
                                </Link>
                            }
                        </div>
                        <div className="separator w-full"></div>
                        <div className="menu">
                            <Link href={route('twitch.logout')} className="link">
                                Déconnexion
                            </Link>
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
