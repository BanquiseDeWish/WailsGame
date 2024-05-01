import '@css/components/inputs.css'

export function InputRange({label, value, onChange, min, max, step, id}) {
    return (
        <div className='flex flex-col w-full gap-1'>
            <div className="flex flex-row justify-between items-center">
                <label htmlFor={id}>{label}</label>
                <span className="container_background px-4 rounded justify-center items-center flex">{value}</span>
            </div>
            <div className="range flex flex-row gap-[16px] w-full justify-center items-center">
                <input id={id} type='range' value={value} onChange={onChange} min={min} max={max} step={step} className="w-full"/>
            </div>
        </div>
    )
}