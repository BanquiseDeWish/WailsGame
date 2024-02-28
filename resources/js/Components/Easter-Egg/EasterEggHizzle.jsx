import { useEffect } from "react";

export default function EasterEggHizzle() {

    useEffect(() => {
        const handleKeyPress = (event) => {
            const keyPressed = event.key.toLowerCase();

            if (keyPressed === 'q') {
                window.addEventListener('keypress', function (event) {
                    const secondKeyPressed = event.key.toLowerCase();

                    if (secondKeyPressed === 'w') {
                        window.addEventListener('keypress', function (event) {
                            const thirdKeyPressed = event.key.toLowerCase();

                            if (thirdKeyPressed === 'e') {
                                window.addEventListener('keypress', function (event) {
                                    const fourthKeyPressed = event.key.toLowerCase();

                                    if (fourthKeyPressed === 'e') {
                                        window.addEventListener('keypress', function (event) {
                                            const fiveKeyPressed = event.key.toLowerCase();

                                            if (fiveKeyPressed === 'n') {
                                                open('https://www.twitch.tv/hizzle_tv');
                                                window.removeEventListener('keypress', handleKeyPress);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        };

        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, []);


    return (
        <div className="easterEggHizzle">
        </div>
    )

}
