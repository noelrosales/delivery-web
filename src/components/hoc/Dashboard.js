import React from 'react';
import Navbar from '../Navbar';
import SideBar from '../Sidebar';

import './style.css';
const DashboardContainer = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return (
                <div>
                    <Navbar />
                    <div className="w3-container-fluid">
                        <div className="w3-row">
                            <div className="w3-col m2">
                                <SideBar />
                            </div>
                            <div className="w3-col m10 w3-animate-right right-content">
                                <WrappedComponent {...this.props} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default DashboardContainer