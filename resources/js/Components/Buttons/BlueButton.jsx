import SimpleButton from './SimpleButton';

export default function BlueButton({children, routeName, disabled=false, ...props }) {
    return (
        <>
            <SimpleButton
                routeName={routeName}
                className='button_blue'
                {...props}
            >
                {children}
            </SimpleButton>
        </>
    );
}
