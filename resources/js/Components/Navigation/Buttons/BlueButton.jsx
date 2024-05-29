import SimpleButton from './SimpleButton';

export default function BlueButton({children, routeName, className, disabled=false, ...otherProps }) {
    
    return (
        <>
            <SimpleButton
                routeName={routeName}
                className={`${className} button_blue`}
                {...otherProps}
            >
                {children}
            </SimpleButton>
        </>
    );
}
