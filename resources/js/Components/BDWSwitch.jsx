import { useState } from "react"
import { Switch } from "@headlessui/react";

export default function BDWSwitch({ bool, setBool }) {

    const handleClick = () => setBool(!bool)

    return (
        <Switch
            checked={bool}
            onChange={handleClick}
            style={{ background: bool ? '#8B5ABB' : 'var(--light_background)' }}
            className={` relative inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
            <span className="sr-only"></span>
            <span
                aria-hidden="true"
                className={`${bool ? 'translate-x-[1.6rem]' : 'translate-x-0'} pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    )

}
