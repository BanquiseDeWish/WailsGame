import BlueButton from "@/Components/Navigation/Buttons/BlueButton"
import MainLayout from "@/Layouts/MainLayout"
import { Head } from "@inertiajs/react"
import axios from "axios"
import { useState, useEffect } from "react"
import QuizzLogo from '../../../../assets/img/QuizzMasterLogo.webp'

const QuizzMaster = () => {

    const [questions, setQuestions] = useState([])

    useEffect(() => {
        axios.get('http://192.168.1.99:4589/quizz/viewQuestion')
            .then((resp) => {
                setQuestions(resp.data)
            })
    }, [])

    return (
        <>
            <MainLayout>
                <Head title="Quizz Master" />
                <div className="flex justify-center items-center h-full flex-col relative">
                    <div className="card items-start justify-center max-w-[800px] h-fit w-full">
                        <div className="flex justify-center w-full">
                            <img src={QuizzLogo} style={{ width: '60%'}} alt="" />
                        </div>
                        <p className="text-[16px] font-extralight">
                            QuizzMaster vous permet de vous tester sur votre culture générale ou encore sur de nombreux thèmes !<br />
                            Le principe est simple : vous répondez à 30 questions variées pendant 15 secondes chacune. Ça peut être une simple question, une question audio ou encore une image ou des images. Le but, avoir le meilleur score pour prouver à vos amis que vous avez un BIG BRAIN.<br />
                            Le calcul des scores se fait en fonction du temps restant : plus vous répondez vite et correctement, plus vous gagnez de points, au contraire, si vous répondez plus lentement et faux, plus vous perdez des points.
                        </p>
                        <div className="separator my-4 w-full" style={{ background: 'var(--container_background)' }} />
                        <div className="flex justify-end w-full">
                            <BlueButton>Créer une nouvelle partie</BlueButton>
                        </div>
                    </div>
                </div>
            </MainLayout>
            <style>{`
                :root {
                    --container_background: rgba(61.34, 105.63, 173.19, 0.20);
                    --content_background: #121A25;
                    --light_background: #2C3344;
                    --web_background: linear-gradient(254deg, #18273D 0%, #070A1E 100%);
                    --modal_background: linear-gradient(254deg, #1F304A 0%, #0D1B30 100%);
                    --input_placeholder_color: #57779D;
                }
            `}
            </style>
        </>
    )

}

export default QuizzMaster;
