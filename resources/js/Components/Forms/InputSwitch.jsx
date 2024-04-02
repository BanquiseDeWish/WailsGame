import { Switch } from "@headlessui/react";
import { useState } from "react";

const InputSwitch = ({ label, state, onChange }) => {

    return (
        <div className="flex items-center h-fit gap-2">
            <Switch
                checked={state}
                onChange={onChange}
                className={`${state ? 'bg-[#57779D]' : 'bg-[#324b68]'}
          relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span className="sr-only"></span>
                <span
                    aria-hidden="true"
                    className={`${state ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
            <span>{label}</span>
        </div>
    )

}
export default InputSwitch;
