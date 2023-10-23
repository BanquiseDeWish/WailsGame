import BgEffect from '../../assets/bg_effect.png'

export default function GlobalLayout({ children }) {
    return (
        <>
            <div className="flex w-screen h-screen flex-col items-center gap-8">
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
                    background-color: 282828;
                }

                #app_background::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(60.52% 59.95% at 50% 50%, rgba(4, 25, 37, 0.26) 0%, rgba(2, 12, 17, 0.85) 100%);
                }
            `}
            </style>
        </>
    );
}
