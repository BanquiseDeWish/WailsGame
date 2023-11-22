import { Link } from '@inertiajs/react';

export default function SimpleButton({ children, routeName, className = '', disabled=false, ...otherProps }) {

    return (
        <>

            {otherProps.type != undefined || otherProps.onClick != undefined ? (
                <button
                    className={'simple_button ' + className}
                    {...otherProps}
                    disabled={disabled}
                >
                    {children}
                </button>
            ) : (
                <Link
                href={routeName != undefined ? route(routeName) : ''}
                    className={'simple_button ' + className}
                    {...otherProps}
                    disabled={disabled}
                >
                    {children}
                </Link>
            )}

            <style>
                {`
                    .simple_button {
                        display: flex;
                        flex-direction: row;
                        gap: 16px;
                        padding: 15px 30px;
                        border-radius: 8px;
                        font-family: Poppins;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        font-weight: 700;
                        font-size: 18px;
                    }
                `}
            </style>
        </>
    );
}
