import SimpleButton from './SimpleButton';
import React from 'react';

export default class YellowButton extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <SimpleButton
                    routeName={this.props.routeName}
                    className='button_yellow'
                    {...this.props}
                >
                    {this.props.children}
                </SimpleButton>
            </>
        );
    }
}
