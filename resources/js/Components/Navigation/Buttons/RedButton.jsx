import SimpleButton from './SimpleButton';

export default function RedButton({children, routeName, disabled=false, ...otherProps }) {
    return (
        <>
            <SimpleButton
                routeName={routeName}
                className='button_red'
                {...otherProps}
            >
                {children}
            </SimpleButton>
        </>
    );
}
