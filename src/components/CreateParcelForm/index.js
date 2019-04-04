import React, { Component } from 'react';

class CreateParcelForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (
            <div className="step-1">
                <h1>Parcel Details</h1>
                <div className="w3-row-padding"> 
                    <div className="w3-third">
                        <label>Sender Name</label>
                        <input className="w3-input" type="text" name="senderName" value={this.props.createData.senderName} onChange={this.props.handleChange}/>
                    </div>
                
                    <div className="w3-third">
                        <label>Sender Email</label>
                        <input className="w3-input" type="email" name="senderEmail" value={this.props.createData.senderEmail} onChange={this.props.handleChange}/>
                    </div>

                    <div className="w3-third">
                        <label>Sender Mobile Number</label>
                        <input className="w3-input" type="text" name="senderPhoneNumber" value={this.props.createData.senderPhoneNumber} onChange={this.props.handleChange}/>
                    </div>
                </div>

                <div className="w3-row-padding">
                    <div className="w3-third">
                        <label>Recipient Name</label>
                        <input className="w3-input" type="text" name="recipientName" value={this.props.createData.recipientName} onChange={this.props.handleChange}/>
                    </div>

                    <div className="w3-third">
                        <label>Recipient Email</label>
                        <input className="w3-input" type="email" name="recipientEmail" value={this.props.createData.recipientEmail} onChange={this.props.handleChange}/>
                    </div>

                    <div className="w3-third">
                        <label>Recipient Mobile Number</label>
                        <input className="w3-input" type="text" name="recipientPhoneNumber" value={this.props.createData.recipientPhoneNumber} onChange={this.props.handleChange}/>
                    </div>
                </div> 

                <div className="w3-row-padding">
                    <div className="w3-third">
                        <label>Package Name</label>
                        <input className="w3-input" type="text" name="packageName" value={this.props.createData.packageName} onChange={this.props.handleChange}/>
                    </div>

                    <div className="w3-third">
                        <label>Package Weight (kg)</label>
                        <input className="w3-input" type="number" name="packageWeight" value={this.props.createData.packageWeight} onChange={this.props.handleChange}/>
                    </div>

                    <div className="w3-row-padding w3-third">
                        <label>Package Insurance</label>
                        <select className="w3-input" name="packageInsurance" value={this.props.createData.packageInsurance} onChange={this.props.handleChange}>
                            <option disabled> -- Select Insurance -- </option>
                            <option value={this.props.createData.estimatedValue * .10}>Insurance 1</option>
                            <option value={0}>None</option>
                        </select>
                    </div>
                </div>
                
                <div className="w3-row-padding">
                    <div className="w3-row-padding w3-third">
                        <label>Estimated Value</label>
                        <input className="w3-input" type="number" name="estimatedValue" value={this.props.createData.estimatedValue} onChange={this.props.handleChange}/>
                    </div>

                    <div className="w3-row-padding w3-third">
                        <br/>
                        <input className="w3-check" type="checkbox" name="accompanied"  onChange={this.props.handleChange}/>
                        <label> Accompanied</label>
                    </div>
                </div>

                <div className="w3-row-padding">
                    <div className="w3-row-padding w3-third">
                        <label>Quantity</label>
                        <input className="w3-input" type="number" name="quantity" value={this.props.createData.quantity} onChange={this.props.handleChange}/>
                    </div>
                </div>

                <div className="w3-row-padding">
                    <div className="w3-row-padding w3-third">
                        <label>Price</label>
                        <input className="w3-input" type="number" name="price" value={this.props.createData.price} onChange={this.props.handleChange}/>
                    </div>
                </div>

                <div className="w3-row-padding">
                    <div className="w3-row-padding w3-third">
                        <label>Additional Note</label>
                        <input className="w3-input" type="text" name="additionalNote" value={this.props.createData.additionalNote} onChange={this.props.handleChange}/>
                    </div>
                </div>

                <div className="w3-row-padding">
                    <div className="w3-row-padding w3-third">
                        <label>Destination</label>
                        <select className="w3-input" name="endStation" value={this.props.createData.endStation} onChange={this.props.handleChange}>
                            <option value="">SELECT STATION</option>
                            {
                                this.props.createData.uniqueStations.map((station, index) => {
                                    return <option key={index} value={station.endStationId}>{station.endStationName}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default CreateParcelForm;