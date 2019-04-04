import React, { Component } from 'react';

import DashboardContainer from '../../components/hoc/Dashboard';

import './style.css';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="w3-container">
                <div className="w3-card-4 history">
                    <h1 className="w3-blue w3-container">History</h1>
                    <div className="w3-container">
                        <h1 className="w3-display-middle">Coming Soon...</h1>
                    </div>
                </div>
            </div>        
        );
    }
}
 
export default DashboardContainer(History);