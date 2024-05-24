import { useEffect, useState } from "react"
import { useSwipeable } from 'react-swipeable';
import { usePage, Link } from "@inertiajs/react"

export default function Sidebar({ children, show2, className, sidebarStyle = {}, left = true }) {

    const [show, setShow] = useState(false);
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
    }, []);

    useEffect(() => {
        console.log(show2)
        setShow(show2)
    }, [show2]);

    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            let checkDirection = left ? "Right" : "Left"
            setShow(eventData.dir == checkDirection)
        },
    });

    return (
        <>
            <div {...handlers} className={`flex lg:hidden ${className} ${show ? 'z-[2]' : 'z-[1]'}`}>

                <div className="sidebar_opener z-50" onClick={() => { setShow(true) }} >
                    {values.opener}
                </div>
                <div  onClick={() => { setShow(false) }} className={`backdrop ${show ? "show" : "hide-" + (left ? "left" : "right")}`}></div>
                <aside className={`sidebar sidebar-${left ? "left" : "right"} ${show ? "show" : "hide-" + (left ? "left" : "right")}`}
                    style={sidebarStyle}
                >
                    {values.content}
                </aside>
            </div>
        </>
    )

}
