

export default function CosmeticCard({onClick, children}) {
    return (
        <div className="bg-container rounded-md p-4 flex flex-col w-[200px] h-[200px] gap-4 justify-center items-center cursor-pointer hover:bg-light_container transition-all"
            onClick={onClick}
        >
            {children}
        </div>
    );
}