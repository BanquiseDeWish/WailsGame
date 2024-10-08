import LockIcon from "@/Components/Icons/LockIcon";

export default function CosmeticCard({className, width=200, height=200, lock=false, onClick, children, ...props}) {

    return (
        <div className={
            `text-sm md:text-base content-center text-center flex-shrink-0 relative bg-container rounded-md p-4 flex flex-col gap-2 md:gap-4 items-center cursor-pointer hover:bg-light_container transition-all justify-end ${lock ? 'opacity-40' : ''} ${className} 
        `}
            onClick={onClick}
            {...props}
        >
            {children}
            {lock && <LockIcon width={38} className="absolute -top-2 right-1"/>}
        </div>
    );
}