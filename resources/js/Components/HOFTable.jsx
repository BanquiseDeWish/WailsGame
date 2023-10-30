import HOFEntry from "./HOFEntry";

export default function HOFTable({ pagination }) {

    console.log(pagination)

    return (
        <div className="hoftable">
            {pagination?.data?.map((val, index) => {

                const position = pagination.current_page * pagination.per_page - pagination.per_page + 1 + index;

                if(position > 3) {
                    return (
                        <HOFEntry position={position} data={ val } />
                    )
                }
            })}
        </div>
    )

}
