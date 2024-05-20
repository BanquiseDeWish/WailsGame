import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import BlueButton from '@/Components/Navigation/Buttons/BlueButton'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]

export default function Cart({ cart, openCart, priceCart, setOpenCart, deleteArticle }) {

    const [process, setProcess] = useState(false)
    const processBuy = () => {
        if(process) return;
        setProcess(true)
        router.post(route('paypal.start'), { articles: cart.map((art) => art.id) }, {
            onSuccess: (response) => {
                setProcess(false)
                if (response.props.flash.message.type == 'error') {
                    setOpenCart(false)
                    toast.error(response.props.flash.message.msg)
                }
            }
        })
    }

    return (
        <Transition.Root show={openCart} as={Fragment}>
            <Dialog className="relative z-10" onClose={() => { if(!process) setOpenCart(false) }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[rgba(0,0,0,0.65)] backdrop-blur-sm bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md" style={{ background: 'var(--web_background)' }} >
                                    <div className="flex h-full flex-col overflow-y-hidden shadow-xl" style={{ background: 'var(--container_background)' }}>
                                        <div className={`flex-1 ${cart !== undefined ? "overflow-y-auto" : "overflow-y-hidden"} px-4 py-6 sm:px-6`}>
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg text-white font-bold">Votre Panier</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => { if(!process) setOpenCart(false) }}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            {!cart && <div className="flex flex-1 justify-center items-center w-full h-full"><div className="loader-spinner"></div></div>}
                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-container">
                                                        {cart &&
                                                            <>
                                                                {cart?.map((product) => (
                                                                    <li key={product.id} className="flex py-6">

                                                                        <div className="flex flex-1 flex-col">
                                                                            <div>
                                                                                <div className="flex justify-between text-base font-medium text-white">
                                                                                    <div className="flex flex-col">
                                                                                        <h3>
                                                                                            <a href={product.href}>{product.name}</a>
                                                                                        </h3>

                                                                                        <p className="mt-1 text-sm text-gray-500">{product.tab?.name}</p>
                                                                                    </div>
                                                                                    <div className="flex flex-col justify-end items-end">
                                                                                        <p className="">{product.price}€</p>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="font-medium text-red-500"
                                                                                            onClick={() => {  if(!process) deleteArticle(product?.id) }}
                                                                                        >
                                                                                            Supprimer
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-1 items-end justify-end text-sm">
                                                                                <div className="flex">
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </>
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-container px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-white">
                                                <p>Total</p>
                                                <p>{priceCart}€</p>
                                            </div>
                                            <div className="mt-6 w-full">
                                                <BlueButton className={"w-full"} onClick={processBuy}>
                                                    {process && <div style={{ width: '24px', height: '24px', borderWidth: '4px' }} className="loader-spinner" />}
                                                    {process ?
                                                    "Veuillez patienter" :
                                                    "Procéder à l'achat"}
                                                </BlueButton>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    ou{' '}
                                                    <button
                                                        type="button"
                                                        className="font-medium text-white hover:text-white"
                                                        onClick={() => { if(!process) setOpenCart(false) }}
                                                    >
                                                        Continuer mes achats
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
