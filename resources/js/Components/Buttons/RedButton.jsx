import SimpleButton from './SimpleButton';

export default function RedButton({children, routeName, disabled=false, ...props }) {
    return (
        <>
            <SimpleButton
                routeName={routeName}
                className='button_red'
                {...props}
            >
                {children}
            </SimpleButton>
        </>
    );
}
