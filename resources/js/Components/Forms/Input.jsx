export default function Input({label, id, type, value, onChange, onKeyDown, placeholder, ...otherProps}) {
    return (
        <>
            <div className='flex flex-col gap-2' {...otherProps}>
                <label htmlFor={id}>{label}</label>
                <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} onKeyDown={onKeyDown}/>
            </div>
        </>
    )
}