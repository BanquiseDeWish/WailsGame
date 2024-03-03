import "@css/react-widget.css";

import { DropdownList } from "react-widgets";


export default function InputDropdown({ label, dataKey, textField, value, defaultValue, onChange, data, globalClassName ,...otherProps }) {

    return (
        <>
            <div className={`flex flex-col gap-2 ${globalClassName}`}>
                <label htmlFor="number_of_dead_tickets" className="font-medium">{label}</label>
                <DropdownList
                    dataKey={dataKey}
                    textField={textField}
                    value={value}
                    onChange={onChange}
                    data={data}
                    defaultValue={defaultValue}
                    {...otherProps}
                    selectIcon={<svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.7 15H22.4895H31.3049C32.8134 15 33.5676 17.125 32.4991 18.3706L24.3594 27.8597C23.0552 29.3801 20.9339 29.3801 19.6297 27.8597L16.5341 24.2509L11.4901 18.3706C10.4373 17.125 11.1915 15 12.7 15Z" fill="#57779D"/>
                                </svg>
                                }
                />
            </div>
            <style>{`

            `}</style>
        </>
    );

}