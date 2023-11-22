import { usePage } from "@inertiajs/react"
import axios from "axios"
import { useState, useEffect } from "react"


export default function ColorIcon({ appearance, funcParent }) {

    const props = usePage().props
    const [cosmetics, setCosmetics] = useState(undefined)
    const [selectCosItem, setSelectCosItem] = useState(appearance?.colorIcon !== undefined ? appearance?.colorIcon?.id : undefined)

    if(cosmetics == undefined) {
        axios.post(route('profile.appearance.cosmetics.get'), { type: 'card', sub_type: 'colorIcon' }).then((response) => {
            setCosmetics(response?.data)
        })
    }

    const colorIconChange = (val) => {
        funcParent.changeAppearance('colorIcon', { id: val.id, type: val.type, sub_type: val.sub_type, style: val?.style })
        setSelectCosItem(val.id)
    }

    return (
        <div className="cosmetics">
            {cosmetics?.map((val, index) => {
                return (
                    <div className={`cosmetic item ${selectCosItem == val.id ? "active" : ""}`} onClick={() => { colorIconChange(val) }}>
                        <div className="colorIcon" style={{ background: val.style }} />
                        <span className="select-none">{val.name}</span>
                    </div>
                )
            })}
        </div>
    )

}
