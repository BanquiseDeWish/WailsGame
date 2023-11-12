import BgEffect from '../../assets/bg_effect.png'

export default function GlobalLayout({ children }) {
    return (
        <>
            <div className="flex w-screen h-screen flex-col items-center">
                <span id="app_background"/>
                {children}
            </div>
            <style> {`
                #app_background {
                    position: fixed;
                    background-position: center;
                    background-size: cover;
                    width: 100vw;
                    height: 100vh;
                    background: #282828;
                    z-index: 0;
                }

                #app_background::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(60.52% 59.95% at 50% 50%, rgba(10, 37, 52, 0.30) 0%, #020C11 100%);
                }
            `}
            </style>
        </>
    );
}
