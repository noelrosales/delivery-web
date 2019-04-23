import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="Sidebar">
                <aside>
                    <ul>
                        <li><NavLink exact to='/'><i className="fas fa-tachometer-alt"></i> Dashboard</NavLink></li>
                        <li><NavLink to='/parcel'><i className="fas fa-cubes"></i> Parcel</NavLink></li>
                        <li><NavLink to='/manifest'><i className="fas fa-tasks"></i> Manifest</NavLink></li>
                        <li><NavLink to='/receive'><i className="fas fa-truck-loading"></i> Receive</NavLink></li>
                        <li><NavLink to='/claim'><i className="fas fa-qrcode"></i> Claim</NavLink></li>
                        <li><NavLink to='/history'><i className="fas fa-history"></i> History</NavLink></li>
                    </ul>
                </aside>
            </div>
        );
    }
}
 
export default SideBar;