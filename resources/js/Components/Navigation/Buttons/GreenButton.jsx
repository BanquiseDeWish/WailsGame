import SimpleButton from './SimpleButton';

export default function GreenButton({children, className, routeName, disabled=false, ...otherProps }) {

    return (
        <>
            <SimpleButton
                routeName={routeName}
                className={`button_green ${className}`}
                {...otherProps}
            >
                {children}
            </SimpleButton>
        </>
    );
}
