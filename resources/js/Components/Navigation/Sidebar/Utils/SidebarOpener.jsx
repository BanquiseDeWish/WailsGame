import React from 'react';

class SidebarOpener extends React.Component {

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
