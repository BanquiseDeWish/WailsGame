import React, { memo } from 'react';

import '../../../css/modal.css';

export default class BaseModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };
    }

    openModal = () => {
        this.setState((prevState) => ({ ...prevState, openModal: true }));
    }

    closeModal = () => {
        this.setState((prevState) => ({ ...prevState, openModal: false }));
    }

    getButton() {
        return 'Open Modal'
    }

    render(children) {
        console.log(this.state);
        return (
            <>
                <div onClick={this.openModal}>
                    {this.getButton()}
                </div>

                <div 
                    className={`modal_container ${this.state.openModal ? 'active' : ''}`}
                    {...this.props}
                >
                    <div
                        id='modal_background'
                        onClick={this.closeModal}
                        className={`${this.state.openModal ? 'active' : ''}`}
                    >
                    </div>

                    <div
                        id='modal'
                        className={`modal ${this.state.openModal ? 'active' : ''}`}
                    >
                        {children}
                    </div>
                </div>

            </>
        )
    }
}