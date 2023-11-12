import { useState, useEffect } from 'react';
import SimpleButton from '../Buttons/SimpleButton';

import '../../../css/modal.css';

export default function BaseModal({ buttonChildren, children, ...otherProps }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <SimpleButton onClick={() => setOpenModal(true)}>{buttonChildren}</SimpleButton>

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