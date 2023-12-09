import { Menu, Transition } from '@headlessui/react'
import { usePage, Link } from '@inertiajs/react'
import { Fragment  } from 'react'

export default function DropdownNav({ labelDropdown, menu }) {

    const props = usePage().props;


    return (
        <Menu as="div" className="relative inline-block text-left notifications">
            <Menu.Button style={{ background: 'transparent' }} className="link">
                {labelDropdown}
            </Menu.Button>

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
                        <div className="menu">
                            {menu.map((item, i) => {
                                return (
                                    <Link key={i} href={item.url} className="link">
                                        {item.label}
                                    </Link>
                                )
                            })}

                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
