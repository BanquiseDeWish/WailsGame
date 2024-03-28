import { useState, useRef, useEffect } from "react";

import Lottie from 'react-lottie-player'
import animationData from '@assets/lottie/vipgames/skull_laugh.json'
import GameSound from '@/Game/audio';

import skullSound from '@assets/sounds/vipgames/skull_laugh.wav';


export default function PopupContent({ resetAn }) {

    const [animation, setAnimation] = useState(false);
    const lottieRef = useRef();

    const resetAnimation = () => {
      // Set the current time of the animation to 0 to restart it
      if (lottieRef.current) {
        lottieRef.current.goToAndPlay(0);
      }
    };
  
    useEffect(() => {
        if(resetAn > 0) {
            setAnimation(true);
            resetAnimation();
            GameSound.playSound(skullSound);
        }
    }, [resetAn]);

    return (
        <>
            <div className={`absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg ${resetAn == 0 ? 'invisible' : ( animation ? 'animate-in' : 'animate-out')}`}
            >
                <Lottie
                    ref={lottieRef}
                    loop={false}
                    animationData={animationData}
                    play={false}
                    style={{ width: 400, height: 400 }}
                    onComplete={() => {
                        setAnimation(false);
                    }}
                />
            </div>
            <style>{`
                .animate-in {
                    animation: fadeIn 0.3s ease-in-out;
                }
                .animate-out {
                    animation: fadeOut 0.3s ease-in-out forwards;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes fadeOut {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                        display: none;
                    }
                }
            `}</style>
        </>
    );
}