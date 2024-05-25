import LockIcon from "@/Components/Icons/LockIcon";

export default function CosmeticCard({className, width=200, height=200, lock=false, onClick, children, ...props}) {

    return (
        <div className={
            `${className} text-base content-center text-center flex-shrink-0 relative bg-container rounded-md p-4 flex flex-col gap-4 items-center cursor-pointer hover:bg-light_container transition-all ${lock ? 'opacity-40' : ''}
        `}
            onClick={onClick}
            {...props}
        >
            {children}
            {lock && <LockIcon width={38} className="absolute -top-2 right-1"/>}
        </div>
    );
}