import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import './style.css';

import movonLogo from '../../assets/img/movon2.png';
import User from '../../services/User';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffId: '',
            password: '',
            error: '',
            loading: false
        }
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        this.refs.staffId.focus();

        //If token exists, redirect to dashboard
        if(token) {
            window.location='/'
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { staffId, password } = this.state;
        this.setState({loading: true, error:''})
        User.login(staffId, password)
            .then( res => {
                const status = res.data.success;
                
                if(status === true){
                    localStorage.setItem('token', res.data.data.token);
                    localStorage.setItem('user', JSON.stringify(res.data.data.user));
                    window.location='/'
                } else {
                    this.setState({error: 'Invalid login. Please try again'})
                }
            })
            .catch( err => {
                this.setState({error: err.message})
            })
            .then(() => {
                this.setState({loading: false})
            })
    }

    render() { 
        return (
            <div className="Login w3-teal w3-container">
                <form ref="login" className="login-form w3-container w3-card w3-display-middle" onSubmit={this.handleSubmit}>
                    
                    {
                        this.state.error ? 
                            <div className="w3-panel w3-red w3-center w3-animate-opacity" style={{marginTop: '0px'}}>
                                <p>{this.state.error}</p>
                            </div> : null
                    }

                    {
                        this.state.loading ?
                            <div className="w3-center">
                                <Loader 
                                    type="ThreeDots"
                                    color="teal"
                                    height="40"	
                                    width="50"
                                /> 
                            </div> : null
                    }
                    <div className="w3-center">
                        <img className="w3-center" src={movonLogo} style={{height:'100px'}} alt="MovOn logo" />
                        <h1 className="w3-center">Delivery | <span style={{color:'teal'}}>Web Portal</span></h1>
                    </div>
                    <div className="">
                        <label>Staff ID</label>
                        <input ref="staffId" className="w3-input" type="text" name="staffId" required onChange={this.handleChange}/>
                        <br />
                        <label>Password</label>
                        <input ref="password" className="w3-input" type="password" name="password" required onChange={this.handleChange}/>
                        <br />
                        <button
                            className="w3-btn w3-blue" 
                            type="submit"
                            disabled={ this.state.loading ? true : false}
                        >
                        <i className="fas fa-sign-in-alt"></i> {this.state.loading ? 'LOGGING IN' : 'LOGIN'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default Login;