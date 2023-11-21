import BgEffect from '../../assets/bg_effect.png'
import { Toaster } from 'sonner'
export default function GlobalLayout({ children }) {
    return (
        <>
            <Toaster />
            <div className="flex w-screen h-screen flex-col items-center">
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
                    background: linear-gradient(254deg, #151617 0%, #0D0D0F 100%);
                    z-index: 0;
                }
            `}
            </style>
        </>
    );
}
