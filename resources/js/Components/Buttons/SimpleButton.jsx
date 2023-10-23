import { Link } from '@inertiajs/react';

export default function SimpleButton({ children, routeName='/', className = '', disabled=false, ...props }) {
    return (
        <>
            <Link
                href={route(routeName)}
                className={'simple_button ' + className}
                {...props}
                disabled={disabled}
            >
                {children}
            </Link>

            <style>
                {`
                    .simple_button {
                        display: flex;
                        flex-direction: row;
                        gap: 16px;
                        padding: 16px 32px;
                        border-radius: 8px;
                        font-family: Poppins;
                        color: white;
                        font-weight: 700;
                        font-size: 20px;
                    }
                `}
            </style>
        </>
    );
}
