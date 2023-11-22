import EarsWeils from '../../../assets/img/earsweils.png'
import Konami from 'react-konami-code';

export default function EasterEggEars() {

    const easterEgg = () => {
        console.log('coucou')
        document.querySelector('body').style.overflow = 'hidden';
        setTimeout(() => {
            document.querySelector('.konami').style.opacity = '1';
            setTimeout(() => {
                document.querySelector('body').style.overflow = 'auto';
                document.querySelector('.konami').style.opacity = '0';
                setTimeout(() => {
                    document.querySelector('.konami').style.display = 'none';
                }, 1200)
            }, 5000)
        }, 600);
    }


    return (
        <Konami action={easterEgg}>
            <div className="easterEgg animate__hshake">
                <img src={EarsWeils} alt="earsWeils" />
                <div className="text-white text-[5rem]">Kawaiiiiiiiii</div>
            </div>
        </Konami>

    )

}
