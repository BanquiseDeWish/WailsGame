import React from 'react';

class SidebarSeparator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <>
                {this.props.children}
            </>
        );
    }
}

export default SidebarSeparator;