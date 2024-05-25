import { useEffect, useState } from "react"
import { useSwipeable } from 'react-swipeable';
import { usePage, Link } from "@inertiajs/react"

export default function Sidebar({ children, show, setShow, className, sidebarStyle = {}, left = true }) {

    const [internalShow, setInternalShow] = useState(false);
    const [values, setValues] = useState({
        opener: null,
        content: null
    });

    useEffect(() => {
        let opener = null;
        let content = null;

        children.forEach(child => {
            switch (child.type.className) {
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

    useEffect(() => {
        setInternalShow(show);
    }, [show]);

    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            let checkDirection = left ? "Right" : "Left"
            setInternalShow(eventData.dir == checkDirection)
        },
    });

    function openSidebar() {
        setInternalShow(true);
        if(setShow)
            setShow(true);
    }

    function closeSidebar() {
        setInternalShow(false);
        if(setShow)
            setShow(false);
    }

    return (
        <>
            <div {...handlers} className={`flex lg:hidden ${className} ${internalShow ? 'z-[2]' : 'z-[1]'}`}>

                <div className="sidebar_opener z-50" onClick={openSidebar} >
                    {values.opener}
                </div>
                <div  onClick={closeSidebar} className={`backdrop ${internalShow ? "show" : "hide-" + (left ? "left" : "right")}`}></div>
                <aside className={`sidebar sidebar-${left ? "left" : "right"} ${internalShow ? "show" : "hide-" + (left ? "left" : "right")}`}
                    style={sidebarStyle}
                >
                    {values.content}
                </aside>
            </div>
        </>
    )

}
