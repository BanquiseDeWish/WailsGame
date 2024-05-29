import React, { memo } from 'react';


import '@css/modal.css';

export default class BaseModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            totallyClose: true,
            onBackgroundClick: this.closeModal
        };
    }

    openModal = () => {
        this.setState((prevState) => ({ ...prevState, totallyClose: false }));
        this.setState((prevState) => ({ ...prevState, openModal: true }));
    }

    closeModal = () => {
        this.setState((prevState) => ({ ...prevState, openModal: false }));
        setTimeout(() => {
            this.setState((prevState) => ({ ...prevState, totallyClose: true }));
        }, 300);
    }

    getButton() {
        return 'Open Modal'
    }

    render(children) {
        return (
            <>
                {this.getButton() && (
                    <div onClick={this.openModal}>
                        {this.getButton()}
                    </div>
                    )
                }

                <div
                    className={`modal_container ${!this.state.totallyClose ? 'active' : ''}`}
                    {...this.props}
                >
                    <div
                        id='modal_background'
                        onClick={this.state.onBackgroundClick}
                        className={`${this.state.openModal ? 'active' : 'inactive'}`}
                    >
                    </div>

                    <div
                        id='modal'
                        className={`modal w-full lg:w-auto ${this.state.openModal ? 'active' : 'inactive'}`}
                    >
                        {children}
                    </div>
                </div>

            </>
        )
    }
}
