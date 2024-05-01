import BaseModal from '@/Components/Modal/BaseModal';
import GameSound from '@/Game/audio';
import '@css/modal.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import TriangleIcon from '../../../../../assets/icons/warning.svg'
import BlueButton from '@/Components/Navigation/Buttons/BlueButton';
import RedButton from '@/Components/Navigation/Buttons/RedButton';
import { RadioGroup } from '@headlessui/react';
export default class GameMode extends BaseModal {

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            data: props.data
        };
        this.state.onBackgroundClick = () => {
            this.props.setIsOpen(false)
        };
    }

    componentDidMount() {

    }

    percentageTimer() {
        return (this.props.data?.timer / 5 * 100)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isOpen !== this.props.isOpen) {
            if (this.props.isOpen && !this.state.openModal) {
                this.openModal();
            } else if (!this.props.isOpen && this.state.openModal) {
                this.closeModal();
            }
        }
    }

    getButton() {
        return undefined;
    }

    render() {
        return super.render(
            <>
                <div className='flex flex-col gap-[32px] w-[800px] p-8 select-none' style={{ background: 'var(--modal_background)', height: 'fit-content', borderRadius: 'inherit' }}>
                    <div className="flex flex-col gap-2">
                        <h2 className='text-[28px] font-semibold'>Mode de jeu</h2>
                        <span>Vous pouvez choisir le mode de jeu que vous voulez, mais vous pouvez toujours jouer de manière classique à QuizzMaster</span>
                    </div>
                    <div className="w-full">
                        
                    <RadioGroup value={this.props.gmSelect.val} onChange={this.props.gmSelect.set}>
                        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                        <div className="space-y-2 w-full">
                            {this.props.gamemodes.map((plan) => (
                                <RadioGroup.Option
                                    key={plan?.key}
                                    value={plan?.key}
                                    className={({ active, checked }) =>
                                        `${active
                                            ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                                            : ''
                                        }
                  ${checked ? 'bg-sky-900/75 text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none w-full`
                                    }
                                >
                                    {({ active, checked }) => (
                                        <>
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="text-sm">
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                                }`}
                                                        >
                                                            {plan.name}
                                                        </RadioGroup.Label>
                                                        <RadioGroup.Description
                                                            as="span"
                                                            className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'
                                                                }`}
                                                        >
                                                            <span>
                                                                {plan?.description}
                                                            </span>
                                                        </RadioGroup.Description>
                                                    </div>
                                                </div>
                                                {checked && (
                                                    <div className="shrink-0 text-white">
                                                        <svg viewBox="0 0 24 24" className='h-6 w-6' fill="none">
                                                            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
                                                            <path
                                                                d="M7 13l3 3 7-7"
                                                                stroke="#fff"
                                                                strokeWidth={1.5}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                    </div>
                </div>
                <style>{`
                    :root {
                        --rw_popup_background: #233E67;
                        --rw-list-option-color: #fff;
                        --rw-list-option-hover: #395786;
                    }
                `}</style>
            </>
        )
    }

    CheckIcon = (props) => {
        return (
            <svg viewBox="0 0 24 24" fill="none" {...props}>
                <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
                <path
                    d="M7 13l3 3 7-7"
                    stroke="#fff"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )
    }
}
