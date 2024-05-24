import { Link } from '@inertiajs/react';

export default function SimpleButton({ children, routeName, extraRoute,  className = '', disabled=false, ...otherProps }) {

    return (
        <>

            {otherProps.type != undefined || otherProps.onClick != undefined ? (
                <button
                    className={`${className} simple_button flex`}
                    {...otherProps}
                    disabled={disabled}
                >
                    {children}
                </button>
            ) : (
                <Link
                href={routeName != undefined ? route(routeName, extraRoute) : ''}
                    className={`${className} simple_button flex`}
                    {...otherProps}
                    disabled={disabled}
                >
                    {children}
                </Link>
            )}
        </>
    );
}
