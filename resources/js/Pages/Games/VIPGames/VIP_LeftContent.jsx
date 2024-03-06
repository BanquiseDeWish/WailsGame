import { useValues } from './VIPGamesContext';
import GreenButton from "@/Components/Navigation/Buttons/GreenButton";

export default function VIP_LeftContent() {

    const values = useValues().values;
    const modifyValue = useValues().modifyValue;

    return (
        <>
            <div className='flex flex-col gap-[24px] h-full w-[400px] flex-shrink-0 z-50'>
                <div className='le-tchat flex-col container h-[220px]'>
                    <span>LA CAM</span>
                </div>
                <div className='le-tchat container flex-grow items-start p-[16px] pt-[32px] snow_cap_chat'>
                    Le T'Chat
                </div>
            </div>
        </>
    );
};