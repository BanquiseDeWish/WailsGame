import React from 'react';

class SidebarCategory extends React.Component {

    static className = "SidebarCategory";

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
