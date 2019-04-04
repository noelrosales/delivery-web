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
                        <li><NavLink exact to='/'>Dashboard</NavLink></li>
                        <li><NavLink to='/parcel'>Parcel</NavLink></li>
                        <li><NavLink to='/manifest'>Manifest</NavLink></li>
                        <li><NavLink to='/claim'>Claim</NavLink></li>
                        <li><NavLink to='/receive'>Receive</NavLink></li>
                        <li><NavLink to='/history'>History</NavLink></li>
                    </ul>
                </aside>
            </div>
        );
    }
}
 
export default SideBar;