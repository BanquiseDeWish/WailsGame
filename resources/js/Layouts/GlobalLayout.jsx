import IceBerg from "@/Components/Svg/IceBerg";
import BgEffect from '../../assets/bg_effect.png'
import AppBackground from '../../assets/backgrounds/20.png'

export default function GlobalLayout({ children }) {
    return (
        <>
            <div className="flex w-screen h-screen flex-col items-center gap-8">
                <span id="app_background"/>
                <span id="background_effect" className="fixed"></span>
                {children}
            </div>
            <style> {`
                #background_effect {
                    background-image: url(${BgEffect});
                    background-position: center;
                    width: 100vw;
                    height: 100vh;
                    opacity: 0.7;
                    pointer-events: none;
                    z-index: 10;
                }

                #app_background {
                    position: fixed;
                    background-position: center;
                    background-size: cover;
                    width: 100vw;
                    height: 100vh;
                    background-image: url(${AppBackground});
                }

                #app_background::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(60.52% 59.95% at 50% 50%, rgba(4, 25, 37, 0.35) 0%, rgba(2, 12, 17, 0.85) 100%);
                }
            `}
            </style>
        </>
    );
}
