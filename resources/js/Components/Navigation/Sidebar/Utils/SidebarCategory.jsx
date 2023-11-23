import React from 'react';

class SidebarCategory extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <>
            <div className='sidebar-category'>
                {this.props.children}
            </div>
            </>
        );
    }
}

export default SidebarCategory;
