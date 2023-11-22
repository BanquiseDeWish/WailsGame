import SimpleButton from './SimpleButton';

export default function BlueButton({children, routeName, disabled=false, ...otherProps }) {
    return (
        <>
            <SimpleButton
                routeName={routeName}
                className='button_blue'
                {...otherProps}
            >
                {children}
            </SimpleButton>
        </>
    );
}
