import React from 'react';

class SidebarContent extends React.Component {

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

export default SidebarContent;
