import BgEffect from '../../assets/bg_effect.png'
import { Toaster } from 'sonner'
export default function GlobalLayout({ children, showOverflow }) {
    return (
        <>
            <Toaster />
            <div className={`flex w-screen h-screen flex-col gap-0 items-center ${showOverflow ? "overflow-x-hidden overflow-y-auto" : "overflow-hidden"}`}>
                {children}
            </div>
        </>
    );
}
