import "react-widgets/styles.css";

import { Combobox } from "react-widgets";


export default function InputComboBox({ label, dataKey, textField, value, defaultValue, onChange, data, ...otherProps }) {

    return (
        <>
            <div className='flex flex-col gap-2'>
                <label htmlFor="number_of_dead_tickets">{label}</label>
                <Combobox
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