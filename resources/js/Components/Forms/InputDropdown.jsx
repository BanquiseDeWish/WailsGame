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
                />
            </div>
            <style>{`

            `}</style>
        </>
    );

}