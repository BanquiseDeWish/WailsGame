import LockIcon from "@/Components/Icons/LockIcon";

export default function CosmeticCard({className, width=200, height=200, lock=false, onClick, children, active, name, rarity=0, ...props}) {

    return (
        <div className={
            `text-sm md:text-base content-center text-center flex-shrink-0 relative bg-container rounded-md p-4 flex flex-col gap-2 md:gap-4 items-center cursor-pointer hover:bg-light_container transition-all justify-end ${lock ? 'opacity-40' : ''} ${className} 
        `}
            onClick={onClick}
            {...props}
        >
            <span className={`absolute bottom-0 left-0 w-full h-full ${'rarity_' + rarity}`}></span>
            {children}
            <span>{name}</span>
            {lock && <LockIcon width={38} className="absolute -top-2 right-1"/>}
            {active && <svg className="absolute top-0 left-0" width="87" height="37" viewBox="0 0 87 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M81.5615 0.5H0V36.5C0 36.5 12.8812 31.8053 21.5 30.5C32.1183 28.8919 38.5677 33.0501 49 30.5C56.2227 28.7345 59.4713 25.4253 66.5 23C73.7529 20.4973 82.5654 25.0892 85.5 18C87.0702 14.207 86.1456 11.4421 85 7.5C84.1501 4.57532 81.5615 0.5 81.5615 0.5Z"
                    fill="url(#paint0_linear_2017_3201)" />
                <path
                    d="M17.988 18.512H14.844L14.34 20H12.192L15.24 11.576H17.616L20.664 20H18.492L17.988 18.512ZM17.46 16.928L16.416 13.844L15.384 16.928H17.46ZM21.2437 15.776C21.2437 14.944 21.4237 14.204 21.7837 13.556C22.1437 12.9 22.6437 12.392 23.2837 12.032C23.9317 11.664 24.6637 11.48 25.4797 11.48C26.4797 11.48 27.3357 11.744 28.0477 12.272C28.7597 12.8 29.2357 13.52 29.4757 14.432H27.2197C27.0517 14.08 26.8117 13.812 26.4997 13.628C26.1957 13.444 25.8477 13.352 25.4557 13.352C24.8237 13.352 24.3117 13.572 23.9197 14.012C23.5277 14.452 23.3317 15.04 23.3317 15.776C23.3317 16.512 23.5277 17.1 23.9197 17.54C24.3117 17.98 24.8237 18.2 25.4557 18.2C25.8477 18.2 26.1957 18.108 26.4997 17.924C26.8117 17.74 27.0517 17.472 27.2197 17.12H29.4757C29.2357 18.032 28.7597 18.752 28.0477 19.28C27.3357 19.8 26.4797 20.06 25.4797 20.06C24.6637 20.06 23.9317 19.88 23.2837 19.52C22.6437 19.152 22.1437 18.644 21.7837 17.996C21.4237 17.348 21.2437 16.608 21.2437 15.776ZM36.7923 11.576V13.22H34.5603V20H32.5083V13.22H30.2763V11.576H36.7923ZM39.8741 11.576V20H37.8221V11.576H39.8741ZM46.8452 11.576V13.22H43.4132V14.996H45.9812V16.592H43.4132V20H41.3612V11.576H46.8452Z"
                    fill="white" />
                <defs>
                    <linearGradient id="paint0_linear_2017_3201" x1="44" y1="3" x2="44" y2="39.5"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#82B3E0" />
                        <stop offset="1" stop-color="#324895" />
                    </linearGradient>
                </defs>
            </svg>}
        </div>
    );
}