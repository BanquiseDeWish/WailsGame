import { Switch } from "@headlessui/react";
import { useState } from "react";

const InputSwitch = ({ label, classNameContainer, state, onChange }) => {

    return (
        <div className={`flex items-center h-fit gap-2 ${classNameContainer}`}>
            <Switch
                checked={state}
                onChange={onChange}
                className={`${state ? 'bg-[#57779D]' : 'bg-[#324b68]'}
          relative inline-flex h-[18px] w-[34px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span className="sr-only"></span>
                <span
                    aria-hidden="true"
                    className={`${state ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
            <span>{label}</span>
        </div>
    )

}
export default InputSwitch;
