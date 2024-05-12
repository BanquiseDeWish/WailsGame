import SimpleButton from './SimpleButton';

export default function BlueButton({children, routeName, className, disabled=false, ...otherProps }) {
    return (
        <>
            <SimpleButton
                routeName={routeName}
                className={`button_blue ${className}`}
                {...otherProps}
            >
                {children}
            </SimpleButton>
        </>
    );
}
