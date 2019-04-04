import React, { Component } from 'react';

import DashboardContainer from '../../components/hoc/Dashboard';
import ParcelView from '../../components/ParcelPreview'
import ParcelPrint from '../../components/ParcelPrint';

import ReactToPrint from 'react-to-print';
import { PDFExport } from '@progress/kendo-react-pdf';
import moment from 'moment';

import ManifestService from '../../services/Manifest';

import './style.css';

class Manifest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            startTripDate: '',
            station: {},
            page: 1,
            trip: {},
            routes: [],
            manifestTripList:[],
            packages: [],
            printDetails: {},
            allowGetManifest: true,
            printManifest: false,
            isLoading: false,
            user: JSON.parse(localStorage.getItem('user')),
            textSize: '14px'
        };
    }

    componentDidMount = () => {
        ManifestService.getRoutes()
            .then( res => {
                if(res.data.success === true) {
                    if(res.data.data.length > 0){
                        console.log('ROUTES',res.data.data)
                        this.setState({
                            routes: res.data.data,
                            station: res.data.data[0],
                            startTripDate: moment().format('YYYY-MM-DD')
                        })
                    } else{
                        console.log('NO TRIPS AVAILABLE')
                        this.setState({
                            allowGetManifest: false
                        })
                    }
                } else {
                    alert("Something went wrong. Please sign in.");
                    localStorage.clear();
                    this.props.history.push('/login')
                }
            })
            .catch(err => console.log(err))
    }

    handleChange = (e) => {
        const inputType = e.target.type;
        this.setState({
            [e.target.name] : inputType === 'select-one' ? JSON.parse(e.target.value) : e.target.value
        })
    }

    getManifest = () => {
        const {startTripDate, station, page} = this.state;
        this.setState({isLoading: true});
        ManifestService.getManifest(startTripDate, station.start, station.end, page)
            .then(res => {
                if(res.data.success === true){
                    console.log('MANIFEST',res.data.data.data);
                    this.setState({
                        manifestTripList: res.data.data.data
                    })
                } else {
                    alert("Something went wrong. Please sign in.");
                    localStorage.clear();
                    this.props.history.push('/login')
                }
            })
            .catch(err => console.log(err))
            .then(() => this.setState({isLoading: false}))
    }

    getPackages = (tripId) => {
        console.log(tripId)
        ManifestService.getPackages(tripId)
            .then(res => {
                if(res.data.success === true) {
                    console.log('PACKAGES',res.data.data.list);
                    this.setState({
                        packages: res.data.data.list,
                        printManifest: res.data.data.print | false,
                        step: 2
                    })
                } else {
                    alert("Something went wrong. Please sign in.");
                    localStorage.clear();
                    this.props.history.push('/login')
                }
            })
    }

    setPrinDetails = (parcel) => {
        console.log('PARCEL',parcel)
        localStorage.setItem('createdParcel', JSON.stringify(parcel));
        this.setState({
            step: 3,
            printDetails: parcel
        })
    }

    //Export to PDF
    exportPDF = () => {
        this.setState({
            textSize: '8px'
        }, () => {
            this.resume.save();
            this.setState({textSize: '14px'})
        })
    }

    render() { 
        return (
            <div className="w3-container">
                <div className="w3-card-4">
                    <h1 className="w3-blue w3-container">Manifest</h1>
                    <div className="w3-container">
                        <div className="bread-crumbs">
                            <ul>
                                { this.state.step >= 1 ? <li  className={this.state.step === 1 ? 'active' : ''} onClick={()=>this.setState({step:1})}>Select Trip /</li> : null}
                                { this.state.step >= 2 ? <li  className={this.state.step === 2 ? 'active' : ''} onClick={()=>this.setState({step:2})}>Select Package /</li> : null}
                                { this.state.step >= 3 ? <li  className={this.state.step === 3 ? 'active' : ''} onClick={()=>this.setState({step:3})}>Package Preview /</li> : null}
                                { this.state.step === 4 ? <li className={this.state.step === 4 ? 'active' : ''}>Print </li> : null}
                            </ul>
                        </div>
                        {
                            this.state.step === 1 ?
                                <div className="w3-row-padding">
                                    <div className="w3-col m3">
                                        <label>Trip Date</label>
                                        <input 
                                            type="date" 
                                            name="startTripDate" 
                                            className="w3-input" 
                                            value={this.state.startTripDate} 
                                            onChange={this.handleChange}
                                            disabled = {!this.state.allowGetManifest ? true : false}
                                        />
                                    </div>
                                    <div className="w3-col m3">
                                        <label>Route</label>
                                        <select 
                                            className="w3-select" 
                                            name="station" 
                                            onChange={this.handleChange}
                                            disabled = {!this.state.allowGetManifest ? true : false}
                                        >
                                            {this.state.routes.map((route,i) => <option key={i} value={JSON.stringify(route)} >{route.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="w3-col m3">
                                        <br/>
                                        <button 
                                            className="w3-btn w3-blue" 
                                            onClick={this.getManifest}
                                            disabled = {!this.state.allowGetManifest ? true : false}
                                        >
                                            {!this.state.allowGetManifest ? 'NO TRIPS AVAILABLE' : 'GET'}
                                        </button>
                                    </div>

                                    {   
                                        this.state.isLoading 
                                            ? <div className="w3-container"><h4>Getting trips...</h4></div>
                                            : null
                                    }

                                    {
                                        this.state.manifestTripList.length > 0 ? 
                                            <table className="w3-table w3-striped w3-hoverable">
                                                <thead>
                                                    <tr>
                                                        <th>Departure Time/Date</th>
                                                        <th>No. of Parcel</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.manifestTripList.map((trip,i) => {
                                                            return (
                                                                <tr 
                                                                    key={i} 
                                                                    onClick={()=>{
                                                                        this.getPackages(trip._id)
                                                                        this.setState({trip: trip})
                                                                        }}>
                                                                    <td>{moment(trip.tripStartDateTime).format('hh:mm A MMMM Do YYYY')}</td>
                                                                    <td>{trip.noOfPackages}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table> : null
                                    }
                                </div> : null
                        }

                        {
                            this.state.step === 2 ?
                                <div className="w3-row-padding" style={{overflowX: 'auto'}}>
                                    <ReactToPrint
                                        trigger={() => <button className="w3-btn w3-green" disabled={this.state.printManifest ? false : true}>PRINT</button>}
                                        content={() => this.refs.report}
                                        onBeforePrint={()=>{
                                            //test: 03-27-2019
                                            // this.setState({textSize: '8px'})
                                        }}
                                    />
                                    <button 
                                        className="w3-btn w3-blue" 
                                        disabled={this.state.printManifest ? false : true} 
                                        onClick={this.exportPDF}>
                                        DOWNLOAD
                                    </button>

                                    <PDFExport paperSize={['8.5in','13in']}
                                        landscape= {true}
                                        fileName={this.state.trip.busCompanyId.name + ' ' + moment(this.state.trip.tripStartDateTime).format('MMM DD, YYYY') +'.pdf'}
                                        title={this.state.trip.busCompanyId.name+' manifest report'}
                                        ref={(r) => this.resume = r}>
                                            
                                        <div>
                                            <div ref="report">
                                                <table className="w3-table w3-half" style={{fontSize: this.state.textSize}}>
                                                    <tbody>
                                                        <tr>
                                                            <td><h4>{this.state.trip.busCompanyId.name}</h4></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Trip Code: </td>
                                                            <td>{this.state.trip.displayId} | {this.state.trip.startStation.name} to {this.state.trip.endStation.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Trip Start Time :</td>
                                                            <td>{moment(this.state.trip.tripStartDateTime).format('hh:mm A - MMM DD, YYYY')}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Prepared by:</td>
                                                            <td>{this.state.user.personalInfo.fullName}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <br/>
                                                <table className="w3-table w3-striped w3-hoverable" style={{fontSize: this.state.textSize}}>
                                                    <thead>
                                                        <tr>
                                                            <th>Bill of Lading</th>
                                                            <th>Parcel Description</th>
                                                            <th>Sender Name</th>
                                                            <th>Recipient Name</th>
                                                            <th>Parcel Weight</th>
                                                            <th>Charged Amount</th>
                                                            <th>From</th>
                                                            <th>To</th>
                                                            <th>Status</th>
                                                            <th>Associate Trip ID</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            this.state.packages.map((parcel,i)=>{
                                                                return(
                                                                    <tr 
                                                                        key={i}
                                                                        onClick={()=>this.setPrinDetails(parcel)}>
                                                                        <td>{parcel.scanCode}</td>
                                                                        <td>{parcel.packageInfo.packageName}</td>
                                                                        <td>{parcel.senderInfo.senderName}</td>
                                                                        <td>{parcel.recipientInfo.recipientName}</td>
                                                                        <td>{parcel.packageInfo.packageWeight +'kg(s)'}</td>
                                                                        <td>{parcel.priceDetails.totalPrice}</td>
                                                                        <td>{parcel.startStation.name}</td>
                                                                        <td>{parcel.endStation.name}</td>
                                                                        <td>
                                                                            { parcel.status === 1 ? 'CREATED' : null }
                                                                            { parcel.status === 2 ? 'ON WAY' : null }
                                                                            { parcel.status === 3 ? 'RECEIVED' : null }
                                                                            { parcel.status === 4 ? 'CLAIMED' : null }
                                                                            { parcel.status === 5 ? 'DELIVERED' : null }
                                                                        </td>
                                                                        <td>{parcel.tripId.displayId}</td>
                                                                        <td>CHECK IN</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>  
                                        </div>
                                    </PDFExport>
                                </div> : null
                        }

                        {
                            this.state.step === 3 ? 
                                <div className="w3-container">
                                    <ParcelView parcelData={this.state.printDetails}/>
                                    <button 
                                        className="w3-btn w3-green"
                                        onClick={() => this.setState({step: 4})}
                                    >
                                        Print
                                    </button>
                                </div> : null
                        }

                        {
                            this.state.step === 4 ?
                                <div>
                                    <h1>Print</h1>
                                    <ParcelPrint ref="print" parcelData={this.state.printDetails}/> 
                                    <ReactToPrint
                                        trigger={() => <button className="w3-btn w3-green">Print</button>}
                                        content={() => this.refs.print}
                                    />
                                    <button 
                                        className="w3-btn w3-red"
                                        onClick={() => this.setState({step: 1})}
                                    >
                                        Cancel
                                    </button>
                                </div> : null
                        }
        
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default DashboardContainer(Manifest);