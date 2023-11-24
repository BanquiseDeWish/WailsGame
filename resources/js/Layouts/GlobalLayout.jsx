import BgEffect from '../../assets/bg_effect.png'
import { Toaster } from 'sonner'
export default function GlobalLayout({ children, showOverflow }) {
    return (
        <>
            <Toaster />
            <div className={`flex w-screen h-screen flex-col items-center ${showOverflow ? "overflow-x-hidden overflow-y-auto xl:overflow-y-hidden" : "overflow-hidden"}`}>
                <span id="app_background"/>
                {children}
            </div>
            <style> {`
                body {
                    background-color: #1E1C1A;
                }
                #app_background {
                    position: fixed;
                    background-position: center;
                    background-size: cover;
                    width: 100vw;
                    height: 100vh;
                    z-index: 0;
                }
            `}
            </style>
        </>
    );
}
