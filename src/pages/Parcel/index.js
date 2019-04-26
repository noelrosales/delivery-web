import React, { Component } from 'react';
import ParcelPreview from '../../components/ParcelPreview';
import ParcelPrint from '../../components/ParcelPrint';
import CreateParcelForm from '../../components/CreateParcelForm';

import DashboardContainer from '../../components/hoc/Dashboard';
import Webcam from 'react-webcam';
import ReactToPrint from 'react-to-print';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import './style.css';

import dataURLtoFile  from '../../util/UrlToFile';
import ParcelService from '../../services/Parcel';


class Parcel extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            senderName: '',
            senderEmail: '',
            senderPhoneCountryCode: 'PH',
            senderPhoneNumber: '',
            recipientName: '',
            recipientEmail: '',
            recipientPhoneCountryCode: 'PH',
            recipientPhoneNumber: '',
            packageName: '',
            packageWeight: 0,
            estimatedValue: 0,
            packageInsurance: 0,
            accompanied: false,
            quantity: 0,
            price: 0,
            additionalNote: '',
            packageImage: [],
            packageImagePreview: '',
            busId: '',
            busCompanyId: '',
            tripId: '',
            startStation: '',
            endStation: '',
            checkIn: false,
            convenienceFee: 0,
            insuranceFee: 0,
            step: 1,
            photoMode: true,
            busses: [],
            destination: {},
            createdParcel: {},
            loading: false,
            uniqueStations: [],
            user: JSON.parse(localStorage.getItem('user'))
        }
        this.state = this.initialState
    }

    componentDidMount() {
        this.generateTrips();
    }

    generateTrips = () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const stationId = user.assignedStation._id;
      
      this.setState({loading: true})
      ParcelService.getTrips(token, stationId)
        .then( res => {
            if(res.data.success === true){
                if(res.data.data.trips.data.length > 0){
                    this.setState({ busses: res.data.data.trips.data })
                    this.getUniqueStations()
                    console.log('BUSSES', this.state.busses)
                    console.log('UNIQUE STATIONS', this.state.uniqueStations)
                } else {
                    console.log('No routes available')
                }
            } else {
                //temporary : for testing
                alert("Something went wrong. Please sign in.");
                localStorage.clear();
                this.props.history.push('/login')
            }
        })
        .catch( err => console.log(err.message) )
        .then(()=>this.setState({loading: false}))
    }

    getUniqueStations = () => {
        const result = [];
        const map = new Map();
        
        for(const station of this.state.busses) {
            if(!map.has(station.endStation._id)) {
                map.set(station.endStation._id, true);
                result.push({
                    endStationId: station.endStation._id,
                    endStationName: station.endStation.name
                })
            }
        }
        
        this.setState({
            uniqueStations: result
        })
    }

    getDynamicPrice = () => {
        const { estimatedValue, accompanied, endStation, packageWeight } = this.state;
        const busCompanyId = this.state.user.busCompanyId;
        const startStation = this.state.user.assignedStation._id;

        ParcelService.getDynamicPrice(busCompanyId, parseInt(estimatedValue), endStation, accompanied, startStation, parseInt(packageWeight))
            .then(res => {
                //TASK: Apply dynamic price
                if(res.data.success){
                    const computedPrice = res.data.data.totalCost;
                    console.log('DYNAMIC PRICE: ',computedPrice)
                    this.setState({price: computedPrice});
                    this.setInsuranceFee()
                }
            })
            .catch(err => {
                console.log(err)
            })
            .then(()=>{
                console.log('DYNAMIC PRICE CALL ENDED');
            })
    }

    getConvenienceFee = () => {
        const {quantity} = this.state;
        ParcelService.getConvenienceFee(quantity)
            .then(res => {
                const convenienceFee = res.data.data.convenienceFee;
                console.log("CONVENIENCE FEE",convenienceFee);
                this.setState({
                    convenienceFee
                })
            })
    }

    setInsuranceFee = () => {
        const {estimatedValue, packageInsurance} = this.state;
        this.setState({
            insuranceFee: packageInsurance === "Insurance 10%" ? estimatedValue * .1 : 0
        })
    }

    renderLoading = (message) => {
        return (
            <div className="w3-center w3-teal w3-container w3-animate-opacity">
                <h4>{message}</h4>
                <Loader 
                    type="Bars"
                    color="#fff"
                    height="40"	
                    width="50"
                /> 
            </div>
        )
    }

    //Input Elements: Handle form data to state
    handleChange = (e) => {
        const dynamicPriceParams = ['endStation', 'accompanied', 'packageWeight', 'estimatedValue'];
        
        if(e.target.type === 'checkbox') {
            if(dynamicPriceParams.indexOf(e.target.name) !== -1){
                this.setState({
                    [e.target.name] : e.target.checked
                },() => this.getDynamicPrice())
            } else {
                this.setState({
                    [e.target.name] : e.target.checked
                })
            }
        } else if(e.target.type === 'file'){
            this.setState({
                [e.target.name] : e.target.files[0]
            })
        }else {
            if(dynamicPriceParams.indexOf(e.target.name) !== -1){
                this.setState({
                    [e.target.name] : e.target.value
                },() => this.getDynamicPrice())
            } else {
                if(e.target.name === 'quantity'){
                    this.setState({
                        [e.target.name] : e.target.value
                    },() => this.getConvenienceFee())
                } else if (e.target.name === 'packageInsurance'){
                    this.setState({
                        [e.target.name] : e.target.value
                    },() => this.setInsuranceFee())
                }

                this.setState({
                    [e.target.name] : e.target.value
                })
            }
        }
    }

    handleSubmit = () => {
        this.setState({loading: true})
        ParcelService.create(this.state)
            .then(res => {
                console.log(res.data)

                if(res.data.success === true) {
                    //temporary : for testing
                    localStorage.setItem('createdParcel', JSON.stringify(res.data.data))
                    this.setState({ 
                        step: 6,
                        createdParcel: res.data.data
                    })
                } else {
                    alert("Something went wrong. Please sign in.");
                    localStorage.clear();
                    this.props.history.push('/login')
                }
            })
            .catch( err => console.log(err) )
            .then(()=>this.setState({loading: false}))
    }

    //Create Parcel: Steps navigation
    nextStep = () => {
        const { step } = this.state;

        if(step === 2){
            this.generateTrips();
        }

        let stepNo = step;
        if( step >= 1 && step < 5){
            stepNo++;
            this.setState({ step: stepNo})
        }
    }

    prevStep = () => {
        const { step } = this.state;
        let stepNo = step;
        if( step <= 5 && step > 1){
            stepNo--;
            this.setState({ step: stepNo})
        }
    }

    //Webcam : Take a screen shot
    capture = () => {
        const imgSrc = this.refs.webcam.getScreenshot();

        var parcelImage = dataURLtoFile(imgSrc, 'parcel.png')
        this.setState({
            packageImagePreview: imgSrc,
            packageImage: parcelImage, 
            photoMode: false
        })
    }

    render() { 
        const {step} = this.state;
        return (
            <div className="w3-container Parcel">
                <div className="w3-card-4">
                    <h1 className="w3-blue w3-container">Create Parcel (Step {step})</h1>
                    <div className="w3-container">
                        <div className="bread-crumbs">
                            <ul>
                                { step >= 1 && step !== 6 ? <li  className={step === 1 ? 'active' : ''} onClick={()=>this.setState({step:1})}>Create Parcel Details /</li> : null}
                                { step >= 2 && step !== 6 ? <li  className={step === 2 ? 'active' : ''} onClick={()=>this.setState({step:2})}>Take Parcel Image /</li> : null}
                                { step >= 3 && step !== 6 ? <li  className={step === 3 ? 'active' : ''} onClick={()=>this.setState({step:3})}>Select Trip /</li> : null}
                                { step >= 4 && step !== 6 ? <li className={step === 4 ? 'active' : ''} onClick={()=>this.setState({step:4})}>Destination /</li> : null}
                                { step === 5 ? <li className={step === 5 ? 'active' : ''} onClick={()=>this.setState({step:5})}>Parcel Preview /</li> : null}
                            </ul>
                        </div>
                        {
                            step === 1 
                                ? <CreateParcelForm createData={this.state} handleChange={this.handleChange}/> 
                                : null
                        }
                        {
                            step === 2 ?
                                <div>
                                    <h1>Parcel Image</h1>
                                    <div className="step-2">
                                        {
                                            this.state.photoMode ?
                                                <div>
                                                    <div className="w3-container">
                                                        <Webcam
                                                            height={350}
                                                            ref="webcam"
                                                            screenshotFormat="image/jpeg"
                                                            width={350}
                                                        /> 
                                                        <div>
                                                            <button className="w3-btn w3-green" onClick={this.capture}>Capture photo</button>
                                                        </div>
                                                    </div>
                                                </div> :
                                                <div>
                                                    <div className="w3-container">
                                                        <div style={{height: '350px', width: '350px', display: 'flex', alignItems: 'center'}}>
                                                            <img src={this.state.packageImagePreview} alt="Package snapshot (reference for the package)" />
                                                        </div>
                                                        <button className="w3-btn w3-green" onClick={() => this.setState({photoMode: true})}>Take a photo again</button>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div> : null
                        }
                        {
                            step === 3 ?
                                <div>
                                    <h1>Select Bus</h1>
                                    {this.state.busses.length === 0 ? this.state.loading ? this.renderLoading('Loading trips.') : null : null}
                                    <div className="bus-list">
                                        {
                                            //render list of available busses
                                            this.state.busses.map( (bus,index) => {
                                                if(bus.endStation._id === this.state.endStation)
                                                    return (
                                                        <div 
                                                            key={index} 
                                                            onClick={()=> {
                                                                this.nextStep();
                                                                this.setState({
                                                                    destination: bus.endStation,
                                                                    busId: bus.bus.busId,
                                                                    busCompanyId: bus.busCompanyId._id,
                                                                    tripId: bus._id,
                                                                    startStation: bus.startStation._id,
                                                                    endStation: bus.endStation._id
                                                                })
                                                            }}
                                                            className={this.state.tripId === bus._id ? 'bus-list-item w3-ripple selected-trip' : 'bus-list-item w3-ripple'}
                                                        >
                                                            <div>
                                                                <h3>{`${bus.bus.licenseNumber} - ${bus.bus.busModel}`}</h3>
                                                                <h4>{bus.busCompanyId.name}</h4>
                                                                <h5>{`${bus.startStation.name} - ${bus.endStation.name}`}</h5>
                                                            </div>
                                                            <h1>{moment(bus.tripStartDateTime).format('hh:mm A')}</h1>
                                                        </div>
                                                    )
                                            })
                                        }
                                    </div>
                                </div> : null
                        }
                        {
                            step === 4 ?
                                <div>
                                    <h1>Package Destination</h1>
                                    <div className="destination-list">
                                        <h1>{this.state.destination.name}</h1>
                                    </div>
                                </div> : null
                        }
                        {
                            step === 5 ? 
                                <div>
                                    <ParcelPreview parcelData={this.state}/>  
                                    {
                                        this.state.loading 
                                            ? this.renderLoading('Creating parcel, please wait.')
                                            : <div>
                                                <div className="w3-row-padding">
                                                    <button className="w3-btn w3-green" onClick={()=>this.handleSubmit()}>Create Parcel</button>
                                                    <input className="w3-check" type="checkbox" name="checkIn"  onChange={this.handleChange}/>
                                                    <label>Check In</label>
                                                </div>
                                              </div> 
                                    }
                                </div> : null
                        }
                        {
                            step === 6 ? <ParcelPrint ref="print" parcelData={this.state.createdParcel}/> : null
                        }
                        <div style={{marginTop: '20px', marginBottom: '20px'}}>
                            {
                                step === 6 ? 
                                    <div>
                                        <ReactToPrint
                                            trigger={() => <button className="w3-btn w3-green"><i className="fas fa-print"></i> Print</button>}
                                            content={() => this.refs.print}
                                        />
                                        <button onClick={()=>this.setState(this.initialState)} className="w3-btn w3-blue">Save</button>
                                    </div>:
                                    <div>
                                        <button disabled={ step === 1 } className="w3-btn w3-red" onClick={this.prevStep}>Previous Step</button>
                                        <button disabled={ step === 5 } className="w3-btn w3-blue" onClick={this.nextStep}>
                                            {step === 4 ? 'Parcel Preview' : 'Next Step'}
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default DashboardContainer(Parcel);