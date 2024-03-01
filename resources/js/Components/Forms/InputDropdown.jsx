import "react-widgets/styles.css";

import { DropdownList } from "react-widgets";


export default function InputDropdown({ label, dataKey, textField, value, defaultValue, onChange, data }) {

    return (
        <>
            <div className='flex flex-col gap-2'>
                <label htmlFor="number_of_dead_tickets">{label}</label>
                <DropdownList
                    dataKey={dataKey}
                    textField={textField}
                    value={value}
                    onChange={onChange}
                    data={data}
                    defaultValue={defaultValue}
                />
            </div>
            <style>{`

            `}</style>
        </>
    );

}