import { useState, useEffect } from 'react';
import SimpleButton from '../Buttons/SimpleButton';

import '../../../css/modal.css';

export default function BaseModal({ buttonChildren, children, ...otherProps }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <SimpleButton onClick={() => setOpenModal(true)}>{buttonChildren}</SimpleButton>

            <div 
                className={`modal_container ${!openModal ? 'hidden-modal-container' : ''}`}
                {...otherProps}
                onClick={() => setOpenModal(false)}
            >
                {
                    openModal ? (
                        <div
                            id='modal'
                            className={`modal`}
                        >
                            {children}
                        </div>
                    ) : ( <></> )
                }
            </div>

        </>
    )
}