import BlueButton from "@/Components/Navigation/Buttons/BlueButton"
import MainLayout from "@/Layouts/MainLayout"
import { Head, router } from "@inertiajs/react"
import axios from "axios"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import QuizzLogo from '../../../../assets/img/QuizzMasterLogo.webp'
import { Combobox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Fragment } from "react"
import env from '../../../../../env.json'
import RedButton from "@/Components/Navigation/Buttons/RedButton"
import GreenButton from "@/Components/Navigation/Buttons/GreenButton"
import { toast } from "sonner"
import Gallery from "@/Components/Icons/Gallery"
import Music from "@/Components/Icons/Music"


const QuizzForm = () => {

    const [themes, setThemes] = useState([])
    const [sending, setSending] = useState(false)
    const [values, setValues] = useState({
        sentence: '',
        themeSelect: themes[0]?.id,
        type: 'text',
        dropzone_file: null,
        proposal: [
            {
                text: '',
                isAnswer: true,
            },
            {
                text: '',
                isAnswer: false,
            },
            {
                text: '',
                isAnswer: false,
            },
        ]
    })
    const [errors, setErrors] = useState(undefined)

    useEffect(() => {
        resetFile()
    }, [values.type])

    function resetFile() {
        setValues(values => ({
            ...values,
            ['dropzone_file']: null,
        }))
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        setSending(true)
        const submitForm = () => {
            return new Promise((resolve, reject) => {
                router.post(route('games.quizz.form.submit'), values, {
                    forceFormData: true,
                    onSuccess: (props) => {
                        setErrors(undefined)
                        setValues(values => ({
                            ...values,
                            ['sentence']: '',
                            ['type']: 'text',
                            ['themeSelect']: themes[0]?.id,
                            ['dropzone_file']: null,
                            proposal: [
                                {
                                    text: '',
                                    isAnswer: true,
                                },
                                {
                                    text: '',
                                    isAnswer: false,
                                },
                                {
                                    text: '',
                                    isAnswer: false,
                                },
                            ]
                        }))
                        toast.success('Question envoyée avec succès !')
                    },
                    onError: (err) => {
                        toast.error('Des erreurs se sont produites lors de l\'envoie')
                        setErrors(err)
                    },
                    onFinish: () => {
                        setSending(false)
                        resolve()
                    }
                })
            })
        }
        toast.promise(submitForm, {
            loading: 'Veuillez patienter..'
        })
    }

    useEffect(() => {
        axios.get(env.socketServer + "/api/quizz/categories")
            .then((resp) => {
                setThemes(resp?.data)
                setValues(values => ({
                    ...values,
                    ['themeSelect']: resp?.data[0].id,
                }))
            })
    }, [])

    const addProposal = () => {
        if (values.proposal.length >= 6) return toast.error('Vous ne pouvez pas ajouter plus de proposition.')
        setValues(values => ({
            ...values,
            ['proposal']: [...values['proposal'], {
                text: '',
                isAnswer: false,
            }]
        }))
    }

    const removeProposal = (i) => {
        if (values.proposal.length <= 3) return toast.error('Vous devez avoir minimum trois propositions.')
        let pps = [...values.proposal]
        pps.splice(i, 1);
        setValues(values => ({
            ...values,
            ['proposal']: pps
        }))
    }

    const handleChangeProposal = (e, index) => {
        let pps = [...values.proposal]
        pps[index].text = e.target.value
        setValues(values => ({ ...values, ['proposal']: pps }))
    }

    return (
        <>
            <MainLayout showOverflow={true}>
                <Head title="Quizz Master - Formulaire" />
                <div className="flex w-full justify-center items-center pb-8 mb-8">
                    <div className="card w-fit gap-8">
                        <img src={QuizzLogo} style={{ width: '40%' }} alt="QuizzLogo" />
                        <div className="separator" />
                        <h2 className="text-[24px] font-semibold text-center">Formulaire de proposition de<br />questions relatives au jeu QuizzMaster</h2>
                        <div className="flex flex-col gap-6 w-full">
                            <div className="input-group">
                                <label>Intitulé de la question</label>
                                <input type="text" id="sentence" disabled={sending} value={values.sentence} onChange={handleChange} />
                                <span className="text-red-600">{errors?.sentence}</span>
                            </div>
                            <div className="input-group">
                                <label>Thème de la question</label>
                                <select name="" id="themeSelect" disabled={sending} value={values.themeSelect} onChange={handleChange}>
                                    {themes.map((theme, i) => {
                                        return <option value={theme.id} key={i}>{theme.dname}</option>
                                    })}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Type de question</label>
                                <select name="" id="type" disabled={sending} value={values.type} onChange={handleChange}>
                                    <option value="text">Texte</option>
                                    <option value="picture">Image</option>
                                    <option value="sound">Musique</option>
                                </select>
                                <span className="text-red-600">{errors?.type}</span>
                            </div>
                            {values.type !== "text" &&
                                <div className="input-group">
                                    <label>Ajout d'assets</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="dropzone_file" onClick={() => { values.dropzone_file !== null && toast.error('Vous avez atteint le nombre de fichier attendus') }} className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#57779D] border-dashed rounded-lg cursor-pointer container_background dark:hover:bg-bray-800 ">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="select-none mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour ajouter</span> ou glissez déposer vos fichiers</p>
                                                <p className="select-none text-xs text-gray-500 dark:text-gray-400">
                                                    {values.type == "picture" && <span>PNG, JPEG, WEBP (2 Mo)</span>}
                                                    {values.type == "sound" && <span>MP3, OGG, WEBA (2 Mo - 10 Secondes max)</span>}
                                                </p>
                                            </div>
                                            {values.dropzone_file == null && <input id="dropzone_file" type="file" accept={values.type == "picture" ? "image/jpeg,image/webp,image/png" : "audio/mpeg,audio/ogg,audio/weba"} className="hidden" onChange={(e) => {
                                                setValues(values => ({
                                                    ...values,
                                                    ['dropzone_file']: e.target.files[0],
                                                }))
                                             }} />}
                                        </label>
                                    </div>
                                    {values.dropzone_file !== null &&
                                        <div className="card w-full p-4 justify-between text-left flex-row">
                                            <div className="flex items-center gap-2">
                                                {values.type == "picture" && <Gallery width={28} height={28} />}
                                                {values.type == "sound" && <Music width={28} height={28} />}
                                                <span className="select-none">{values.dropzone_file?.name}</span>
                                            </div>
                                            <TrashIcon onClick={resetFile} width={28} height={28} color="#e02424" />
                                        </div>
                                    }
                                    <span className="text-red-600">{errors?.file}</span>
                                </div>
                            }
                            <div className="input-group">
                                <label>Proposition</label>
                                <div className="text-[14px]">
                                    <i>Considérez la première proposition comme la bonne réponse.</i>
                                </div>
                                <span className="text-red-600">{errors?.proposal}</span>
                                <div className="flex flex-col w-full gap-4">
                                    {values.proposal.map((pp, i) => {
                                        return (
                                            <div className="flex gap-4 w-full" key={i}>
                                                <input type="text" disabled={sending} onChange={(e) => { handleChangeProposal(e, i) }} value={pp.text} className="flex-1" key={i} />
                                                {i == 0 ? <GreenButton id="noFormSubmit" onClick={addProposal}>+</GreenButton> : i > 2 ? <RedButton onClick={() => { removeProposal(i) }}>-</RedButton> : <></>}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="flex justify-end w-full">
                                <BlueButton onClick={handleSubmit}>Envoyer ma question</BlueButton>
                            </div>
                        </div>
                    </div>
                </div >
            </MainLayout >
        </>
    )

}

export default QuizzForm;
