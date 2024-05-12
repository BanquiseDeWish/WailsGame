import BlueButton from "@/Components/Navigation/Buttons/BlueButton"
import MainLayout from "@/Layouts/MainLayout"
import { Head } from "@inertiajs/react"
import axios from "axios"
import { useState, useEffect } from "react"
import QuizzLogo from '../../../../assets/img/QuizzMasterLogo.webp'
import { v4 as uuidv4 } from 'uuid'
import { validate as isValidUUID } from 'uuid';
import { toast } from "sonner"
import env from "../../../../../env.json"

const QuizzMaster = () => {

    const [idParty, setIdParty] = useState("")
    const [update, setUpdate] = useState(undefined)

    const goToParty = () => {
        if (!isValidUUID(idParty)) return toast.error('Format de code de partie, non valide.')
        document.location.href = route('games.quizz.party', { gameId: idParty })
    }

    useEffect(() => {
        //Get last update
        axios.get(`${env.socketServer}/update/qm/last`)
            .then((response) => {
                console.log(response.data);
                setUpdate(response.data)
            })
    }, [])

    let dateFormat = "N/A"
    if (update) {
        const datePreFormat = new Date(Date.parse('2024-05-12'))
        const month = (datePreFormat.getUTCMonth()) + 1;
        dateFormat = `${datePreFormat.getUTCDate()}/${(month > 10 ? month : `0${month}`)}/${datePreFormat.getUTCFullYear()}`
    }

    return (
        <>
            <MainLayout showOverflow={true}>
                <Head title="Quizz Master" />
                <div className="flex justify-center h-fit gap-4 relative pb-8">
                    <div className="card items-start justify-center max-w-[800px] h-fit w-full">
                        <div className="flex justify-center w-full">
                            <img src={QuizzLogo} style={{ width: '60%' }} alt="" />
                        </div>
                        <p className="text-[16px] font-extralight">
                            QuizzMaster vous permet de vous tester sur votre culture générale ou encore sur de nombreux thèmes !<br />
                            Le principe est simple : vous répondez jusqu'à 50 questions variées pendant 15 secondes chacune. Ça peut être une simple question, une question audio ou encore une image ou des images. Le but, avoir le meilleur score pour prouver à vos amis que vous avez un BIG BRAIN.<br />
                            Plus vous répondez vite, plus vous gagnerez ou perdrez de points. Cependant, à contrario, plus vous prenez votre temps pour répondre moins vous gagnerez ou perdrez de points.
                        </p>
                        <div className="separator my-4 w-full" style={{ background: 'var(--container_background)' }} />
                        <span className="text-[18px] font-semibold">Rejoindre via un code de partie</span>
                        <span className="text-[12px] font-light">Le leader de la partie doit vous fournir un code de partie disponible au lobby. <br />Il peut également vous fournir l'url disponible dans la barre d'adresse de son navigateur web</span>
                        <div className="flex w-full gap-4 mt-4">
                            <div className="flex-1 w-full">
                                <input type="text" className="w-full" placeholder="ID de la partie" value={idParty} onChange={(e) => { setIdParty(e.target.value) }} id="" />
                            </div>
                            <BlueButton onClick={goToParty}>
                                Rejoindre la partie
                            </BlueButton>
                        </div>
                        <div className="separator my-4 w-full" style={{ background: 'var(--container_background)' }} />
                        <div className="flex flex-col mb-4">
                            <span className="text-[18px] font-semibold">Créer une partie</span>
                            <span className="text-[12px] font-light">Cliquez sur le bouton ci-dessous si vous êtes leader de la partie avec vos ami(e)s. <br />Vous devrez fournir le code de partie disponible sur la page suivante pour qu'ils puissent rejoindre !</span>
                        </div>
                        <BlueButton className={"w-full"} href={route('games.quizz.party', { gameId: uuidv4() })}>
                            Créer la partie
                        </BlueButton>
                    </div>
                    <div className="card justify-start items-start p-4 h-fit min-w-[350px] max-w-[560px]">
                        <h2 className="text-[28px] font-bold">DevLog</h2>
                        {update !== undefined &&
                            <div className="updateItem w-full mt-4">
                                <h2 className="text-[20px] font-semibold">Version {update?.key}</h2>
                                <h2 className="text-[14px] font-light">Publié le {dateFormat}</h2>
                                <ul className="flex flex-col gap-1 mt-2">
                                    {update?.data?.map((item, i) => {
                                        return (
                                            <li key={i} className="item list-disc ml-6 text-[13px]">
                                                {item?.text}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        }
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
