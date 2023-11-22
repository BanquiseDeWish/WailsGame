import { useEffect, useState } from "react"
import { usePage, Link } from "@inertiajs/react"

export default function Sidebar({ children, className, left = true }) {

    const [show, setShow] = useState(false);
    const [values, setValues] = useState({
        opener: null,
        content: null
    });

    useEffect(() => {
        let opener = null;
        let content = null;

        children.forEach(child => {
            switch (child.type.name) {
                case "SidebarOpener":
                    opener = child;
                    break;
                case "SidebarContent":
                    content = child;
                    break;
            }
        });

        setValues({
            opener: opener,
            content: content
        });
    }, [children]);

    return (
        <>
        <div className="">
            <div className="sidebar_opener z-50" onClick={() => { setShow(true) }} >
                {values.opener}
            </div>
            <div className={`flex lg:hidden ${className}`} style={{width: '0px'}}>
                <div onClick={() => { setShow(false) }} className={`backdrop ${show ? "show" : "hide-" + (left ? "left" : "right")}`}></div>
                <aside className={`sidebar sidebar-${left ? "left" : "right"} ${show ? "show" : "hide-" + (left ? "left" : "right")}`}>
                    {values.content}
                </aside>
            </div>
        </div>
        </>
    )

}
