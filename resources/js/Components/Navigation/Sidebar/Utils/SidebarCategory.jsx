import React from 'react';

class SidebarCategory extends React.Component {

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

export default SidebarCategory;
