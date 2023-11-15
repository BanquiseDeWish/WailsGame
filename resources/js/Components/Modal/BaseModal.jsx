import { useState } from 'react';

import '../../../css/modal.css';

export default function BaseModal({ buttonChildren, children, ...otherProps }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div onClick={() => setOpenModal(true)}>
                {buttonChildren}
            </div>

            <div 
                className={`modal_container ${openModal ? 'active' : ''}`}
                {...otherProps}
            >
                <div
                    id='modal_background'
                    onClick={() => setOpenModal(false)}
                    className={`${openModal ? 'active' : ''}`}
                >
                </div>

                <div
                    id='modal'
                    className={`modal ${openModal ? 'active' : ''}`}
                >
                    {children}
                </div>
            </div>

        </>
    )
}