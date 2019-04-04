import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';

import User from '../../services/User';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    handleClick = () => {
        const token = localStorage.getItem('token');
        console.log('clicked')
        User.logout(token)
            .then( res => {
                console.log(res.data)
                localStorage.clear();
                this.props.history.push('/login')
            })
    }

    render() { 
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <nav>
                <h2>Delivery App</h2>
                <div style={{display:'flex'}}>
                    <h4>Welcome, {user.personalInfo.fullName} </h4>
                    <button className="w3-btn w3-green w3-margin-left" onClick={()=>this.handleClick()}>Logout</button>
                </div>
            </nav>
        );
    }
}
 
export default withRouter(Navbar);