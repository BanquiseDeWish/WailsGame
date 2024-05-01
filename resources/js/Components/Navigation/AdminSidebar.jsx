import { Link } from "@inertiajs/react"

export default function AdminSidebar() {

    const navs = [
        {
            name: 'QuizzMaster',
            links: [
                {
                    dname: 'Historique des parties',
                    href: route('admin.qm.history')
                },
                {
                    dname: 'Questions proposées',
                    href: '#'
                },
            ]
        }
    ]

    return (
        <div className="flex flex-col gap-1 w-full">
            <Link href={route('admin.index')} className={`px-4 py-2 rounded-md ${route('admin.index') == document.location.href && "bg-[#3d6aad40]"} hover:bg-[#3d6aad40]`}>
                Tableau de bord
            </Link>
            {navs.map((nav, i) => {
                return (
                    <div key={i} className="flex flex-col">
                        <span className="font-bold text-[20px] mb-2">{nav.name}</span>
                        <div className="flex flex-col gap-2">
                            {nav.links.map((link, i2) => {
                                return (
                                    <Link href={link.href} key={i2} className={`px-4 py-2 rounded-md ${link.href == document.location.href && "bg-[#3d6aad40]"} hover:bg-[#3d6aad40]`}>
                                        {link.dname}
                                    </Link>
                                )
                            })}
                        </div>

                    </div>
                )
            })}
        </div >
    )

}
