import ToastContainer from '@/Components/Content/ToastContainer';
import Snowfall from 'react-snowfall'
import BgEffect from '../../assets/bg_effect.png'
export default function GlobalLayout({ children, showOverflow }) {
    return (
        <>
            <div className={`flex w-screen h-screen flex-col gap-0 items-center ${showOverflow ? "overflow-x-hidden overflow-y-auto" : "overflow-hidden"}`}>
                <Snowfall color="#fff" style={{ zIndex: 0 }} />
                <ToastContainer />
                {children}
            </div>
            <style>
                {
                    `
                        body {
                            background-image: linear-gradient(254deg, #09101A 0%, #050A11 100%);
                        }
                    `
                }
            </style>
        </>
    );
}
