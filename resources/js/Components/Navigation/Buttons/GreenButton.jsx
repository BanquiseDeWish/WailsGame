import SimpleButton from './SimpleButton';

export default function GreenButton({children, routeName, disabled=false, ...otherProps }) {
    
    return (
        <>
            <SimpleButton
                routeName={routeName}
                className='button_green'
                {...otherProps}
            >
                {children}
            </SimpleButton>
        </>
    );
}
