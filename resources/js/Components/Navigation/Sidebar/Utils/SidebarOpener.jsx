import React from 'react';

class SidebarOpener extends React.Component {

    static className = "SidebarOpener";

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

export default SidebarOpener;
