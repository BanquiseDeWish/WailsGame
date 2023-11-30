import { Toaster, toast } from 'sonner'
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
export default function ToastContainer(){

    const { flash } = usePage().props

    useEffect(() => {
        if(flash.message !== null){
            let type = flash.message.type;
            let msg = flash.message.msg;
            switch(type){
                case 'error':
                    toast.error(msg)
                    break;
                case 'success':
                    toast.success(msg)
                    break;
                case 'info':
                    toast.info(msg)
                    break;
                case 'warning':
                    toast.warning(msg)
                    break;
                default:
                    toast.info(msg)
            }
            flash.message = null
        }
    }, [])

    return (
        <Toaster position='bottom-right' />
    )


}
