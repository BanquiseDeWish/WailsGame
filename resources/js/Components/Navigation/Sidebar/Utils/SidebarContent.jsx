import React from 'react';

class SidebarContent extends React.Component {

    static className = "SidebarContent";

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
