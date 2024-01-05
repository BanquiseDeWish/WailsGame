

export default function PokemonMap({mapName, mapUrl, ...otherProps}) {

    

    return (
        <>
            <div className="overflow-hidden rounded-lg container_background" {...otherProps}>
                <img className="" src={mapUrl} width={256} alt={mapName} />
                <div className="p-4 text-base font-semibold flex justify-center">{mapName}</div>
            </div>
        </>
    )
}