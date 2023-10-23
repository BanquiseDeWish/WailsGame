import SimpleButton from './SimpleButton';

export default function GreenButton({children, routeName, disabled=false, ...props }) {
    return (
        <>
            <SimpleButton
                routeName={routeName}
                className='button_green'
                {...props}
            >
                {children}
            </SimpleButton>
        </>
    );
}
