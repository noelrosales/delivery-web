import React, { Component } from 'react';
import moment from 'moment';
import QrReader from 'react-qr-reader';

import DashboardContainer from '../../components/hoc/Dashboard';
import ClaimService from '../../services/Claim';
import Scan from '../../services/Scan';

import './style.css';
import ParcelPreview from '../../components/ParcelPreview';

class Claim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: [],
            tripId: '',
            packages: [],
            claimedCount: 0,
            totalCount: 0,
            selectedPackage: {},
            scanType: 3,
            billOfLading: '',
            parcelId: '',
            parcelImage: [],
            error: '',
            step: 1
        }
    }

    componentDidMount() {
        ClaimService.getTrips()
            .then(res => {
                if(res.data.success === true){
                    const tripList = res.data.data.data;
                    console.log('CLAIM TRIPS', tripList);
                    this.setState({
                        trips: tripList
                    })
                } else {
                    alert("Something went wrong. Please sign in.");
                    localStorage.clear();
                    this.props.history.push('/login')
                }
            })
    }

    getPackages = (tripId) => {
        ClaimService.getPackages(tripId)
            .then(res => {
                const packages = res.data.data.list;
                const claimedCount = res.data.data.claimedCount;
                const totalCount = res.data.data.totalCount;
                console.log('PACKAGES',res.data.data.list);
                this.setState({
                    packages: packages,
                    claimedCount: claimedCount,
                    totalCount: totalCount,
                    step: 2
                })
            })
    }

    scanCode = (scanCode, tripId, scanType) => {
        Scan.scanCode(scanCode, tripId, scanType)
            .then(res => {
                console.log(res.data)
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleScan = data => {
        const {billOfLading, tripId, scanType} = this.state;
        if(data){
            this.setState({
                billOfLading: data
            }, () => {
                this.scanCode(billOfLading, tripId, scanType);
            })
        }
    }

    handleError = err => {
        this.setState({
            error: err
        }, () => console.log(this.state.error))
    }


    render() { 
        const {trips, packages, selectedPackage, billOfLading, claimedCount, totalCount, step} = this.state;
        return (
            <div className="w3-container">
                <div className="w3-card-4 claim">
                    <h1 className="w3-blue w3-container">Claim</h1>
                    <div className="w3-container">
                        <div className="bread-crumbs">
                            <ul>
                                { step >= 1 ? <li  className={step === 1 ? 'active' : ''} onClick={()=>this.setState({step:1})}>Trips /</li> : null}
                                { step >= 2 ? <li  className={step === 2 ? 'active' : ''} onClick={()=>this.setState({step:2})}>Packages /</li> : null}
                                { step >= 3 && step !== 4 ? <li  className={step === 3 ? 'active' : ''} onClick={()=>this.setState({step:3})}>Preview /</li> : null}
                                { step === 4 ? <li className={step === 4 ? 'active' : ''} onClick={()=>this.setState({step:4})}>Scan /</li> : null}
                            </ul>
                        </div>
                        { step === 1
                            ? <div>
                                {trips.map((trip,i) => {
                                    console.log('TRIP',trip);
                                    return(
                                        <div
                                            className="package"
                                            key={i}
                                            onClick={()=>{
                                                this.getPackages(trip._id);
                                                this.setState({tripId: trip._id})
                                            }}
                                        >
                                            <h4>{trip.bus.busModel}</h4>
                                            <p>{trip.bus.licenseNumber}</p>
                                            <p>Start: {moment(trip.tripStartDateTime).format('MMM DD, YYYY | h:mm:A')}</p>
                                            <p>{trip.endStation.name}</p>
                                            <h6>{trip.noOfPackages} Package{trip.noOfPackages>1 ? 's' : null}</h6>
                                        </div>
                                    )
                                })}  
                              </div>
                            : null
                        }
                        { step === 2
                            ? <div>
                                <p>{totalCount} Total</p>
                                <p>{claimedCount} Claimed</p>
                                <button 
                                    className="w3-btn w3-blue"
                                    onClick={()=>this.setState({step:4})}
                                >
                                    <i className="fas fa-qrcode"></i> Scan QR Code
                                </button>
                                <br/><br/>
                                {packages.map((_package,i) => {
                                    console.log(_package.packageInfo.packageName);
                                    return(
                                        <div
                                            className="package"
                                            key={i}
                                            onClick={()=>this.setState({selectedPackage:_package, step: 3})}
                                        >
                                            <h4>{_package.packageInfo.packageName}</h4>
                                            <p>{_package.packageInfo.packageWeight} kgs</p>
                                        </div>
                                    )
                                })}  
                              </div>
                            : null
                        }
                        { step === 3
                            ? <ParcelPreview parcelData={selectedPackage}/>
                            : null
                        }
                        { step === 4
                            ? <div className="w3-display-middle">
                                <QrReader
                                    delay={300}
                                    onError={this.handleError}
                                    onScan={this.handleScan}
                                    style={{width: 350}}
                                />
                                <input 
                                    type="text" 
                                    name="billOfLading" 
                                    className="w3-input" 
                                    value={billOfLading}
                                    onChange={this.handleChange}/>      
                              </div>
                            : null
                        }
                    </div>
                </div>
            </div>          
        );
    }
}
 
export default DashboardContainer(Claim);