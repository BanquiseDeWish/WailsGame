

export default function StatContainer({ statName, statData, iconUrl, iconComponent }) {

    console.log(iconComponent)

    return (
        <div className="container flex-grow basis-[300px] flex-shrink relative flex-col p-[32px] pt-[48px] gap-[32px] font-bold">
            {iconComponent !== undefined && iconComponent}
            {iconUrl !== undefined && <img className="absolute top-0 -translate-y-1/2" src={iconUrl} width={96} alt={statName} />}
            <div className="flex flex-col gap-[16px] justify-center items-center">
                <div className="text-center">
                    {statName}
                </div>
                <div className="text-[#adb7c9]">
                    {statData}
                </div>
            </div>
        </div>
    );

}
