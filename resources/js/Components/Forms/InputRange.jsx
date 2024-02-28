
export function InputRange({label, value, onChange, min, max, step, id}) {
    return (
        <div className='flex flex-col w-full'>
            <div className="flex flex-row justify-between items-center">
                <label htmlFor="number_of_dead_tickets">{label}</label>
                <span className="light_bg px-2 rounded justify-center items-center flex">{value}</span>
            </div>
            <div className="flex flex-row gap-[16px] w-full justify-center items-center">
                <input id={id} type='range' value={value} onChange={onChange} min={min} max={max} step={step} className="w-full"/>
            </div>
        </div>
    )
}