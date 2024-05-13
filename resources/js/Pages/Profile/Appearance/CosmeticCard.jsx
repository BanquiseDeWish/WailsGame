import LockIcon from "@/Components/Icons/LockIcon";

export default function CosmeticCard({className, width=200, height=200, lock=false, onClick, children, ...props}) {
    return (
        <div className={`${className} relative bg-container rounded-md p-4 flex flex-col w-[${width}px] h-[${height}px]
            gap-4 justify-center items-center cursor-pointer hover:bg-light_container transition-all
            ${lock ? 'opacity-40' : ''}
        `}
            onClick={onClick}
            {...props}
        >
            {children}
            {lock && <LockIcon width={38} className="absolute -top-2 right-1"/>}
        </div>
    );
}