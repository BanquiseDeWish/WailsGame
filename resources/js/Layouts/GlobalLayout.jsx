import ToastContainer from '@/Components/Content/ToastContainer';
import Snowfall from 'react-snowfall'
import BgEffect from '../../assets/bg_effect.png'
export default function GlobalLayout({ children, showOverflow, disableEvent }) {

    const dateCurrent = new Date(Date.now()).getDate();
    const monthCurrent = new Date(Date.now()).getMonth();
    const isChristmas = monthCurrent == 11
    const isFirstApril = dateCurrent == 1 && monthCurrent == 12

    return (
        <>
            <div className={`flex w-screen h-screen flex-col gap-0 items-center ${showOverflow ? "overflow-x-hidden overflow-y-auto" : "overflow-hidden"}`}>
                {isChristmas && !disableEvent && <Snowfall color="#fff" style={{ zIndex: 0 }} /> }
                <ToastContainer />
                {children}
            </div>
        </>
    );
}
