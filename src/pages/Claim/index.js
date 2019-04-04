import React, { Component } from 'react';
import QrReader from 'react-qr-reader';

import DashboardContainer from '../../components/hoc/Dashboard';

import './style.css';

class Claim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            isLoading: false,
            result: '',
            error: ''
        }
    }

    handleScan = data => {
        if(data){
            this.setState({
                result: data
            }, () => console.log(this.state.result))
        }
    }

    handleError = err => {
        this.setState({
            error: err
        }, () => console.log(this.state.error))
    }

    render() { 
        return (
            <div className="w3-container">
                <div className="w3-card-4 claim">
                    <h1 className="w3-blue w3-container">Claim</h1>
                    <div className="w3-container">
                        <div className="w3-display-middle">
                            <QrReader
                                delay={300}
                                onError={this.handleError}
                                onScan={this.handleScan}
                                style={{width: 350}}
                            />
                            {
                                this.state.result
                                    ? <h1 className="w3-teal w3-container w3-animate-right">{this.state.result}</h1>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>          
        );
    }
}
 
export default DashboardContainer(Claim);