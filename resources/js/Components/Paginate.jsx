import { usePage } from "@inertiajs/react";
import GreenButton from "./Buttons/GreenButton";

export default function Paginate({ layout, labelType, routeName, routeArgs, pagination, setList, setPagination, method }) {

    const props = usePage().props

    let pages = [];
    let index = pagination?.current_page;
    let calcTotalBtn = (5 + pagination?.current_page > pagination?.last_page) ? pagination?.last_page : 5 + pagination?.current_page > pagination?.last_page;
    if (pagination?.last_page < 6) {
        index = 1
        calcTotalBtn = pagination?.last_page
    } else if (!calcTotalBtn)
        calcTotalBtn = 5 + pagination?.current_page
    for (var i = index; i <= calcTotalBtn; i++)
        pages.push({ dp: i })

    async function changePage(action) {
        let result = null
        if (typeof action == "string") {
            if (action == "prev")
                result = pagination?.current_page - 1
            else if (action == "first")
                result = 1
            else if (action == "next")
                result = pagination?.current_page + 1
            else if (action == "last")
                result = pagination?.last_page
        } else {
            result = action
        }
        refreshList(result)
    }

    async function refreshList(page) {
        routeArgs['page'] = page
        setList(null)
        axios.get(route(routeName, routeArgs))
        .then((res) => {
            let resultPagination = res.data
            setList(resultPagination.data)
            setPagination(resultPagination)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            {pagination?.last_page >= 2 &&
                <div className="flex justify-between w-full">
                    <GreenButton onClick={() => { changePage('prev') }} disabled={pagination?.prev_page_url == null || pagination.data == null}>Précédent</GreenButton>
                    <GreenButton onClick={() => { changePage('next') }} disabled={pagination?.next_page_url == null || pagination.data == null}>Suivant</GreenButton>
                </div>
            }
        </>

    )

}
