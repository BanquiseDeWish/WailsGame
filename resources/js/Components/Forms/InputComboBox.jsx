import "@css/react-widget.css";

import { Combobox } from "react-widgets";


export default function InputComboBox({ label, dataKey, textField, value, defaultValue, onChange, data, globalClassName, ...otherProps }) {

    return (
        <>
            <div className={`flex flex-col gap-2 ${globalClassName}`}>
                <label htmlFor="number_of_dead_tickets" className="font-medium">{label}</label>
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