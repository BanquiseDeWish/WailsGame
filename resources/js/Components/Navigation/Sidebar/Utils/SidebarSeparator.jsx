import React from 'react';

class SidebarSeparator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <>
                <div className="separator w-full">{this.props.children}</div>
            </>
        );
    }
}

export default SidebarSeparator;