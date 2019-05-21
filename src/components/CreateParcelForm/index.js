import React, { Component } from 'react';

class CreateParcelForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('FROM Create Parcel Form');
        this.props.nextStep();
    }

    render() { 
        const { createData, handleChange} = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="step-1">
                    <h1>Parcel Details</h1>
                    <div className="w3-row-padding"> 
                        <div className="w3-third">
                            <label>Sender Name</label>
                            <input className="w3-input" type="text" name="senderName" value={createData.senderName} onChange={handleChange} required/>
                        </div>
                    
                        <div className="w3-third">
                            <label>Sender Email</label>
                            <input className="w3-input" type="email" name="senderEmail" value={createData.senderEmail} onChange={handleChange} required/>
                        </div>

                        <div className="w3-third">
                            <label>Sender Mobile Number</label>
                            <input className="w3-input" type="text" name="senderPhoneNumber" value={createData.senderPhoneNumber} onChange={handleChange} required/>
                        </div>
                    </div>

                    <div className="w3-row-padding">
                        <div className="w3-third">
                            <label>Recipient Name</label>
                            <input className="w3-input" type="text" name="recipientName" value={createData.recipientName} onChange={handleChange} required/>
                        </div>

                        <div className="w3-third">
                            <label>Recipient Email</label>
                            <input className="w3-input" type="email" name="recipientEmail" value={createData.recipientEmail} onChange={handleChange} required/>
                        </div>

                        <div className="w3-third">
                            <label>Recipient Mobile Number</label>
                            <input className="w3-input" type="text" name="recipientPhoneNumber" value={createData.recipientPhoneNumber} onChange={handleChange} required/>
                        </div>
                    </div> 

                    <div className="w3-row-padding">
                        <div className="w3-row-padding w3-third">
                            <label>Destination</label>
                            <select className="w3-input" name="endStation" value={createData.endStation} onChange={handleChange} required>
                                <option value="">SELECT STATION</option>
                                {
                                    createData.uniqueStations.map((station, index) => {
                                        return <option key={index} value={station.endStationId}>{station.endStationName}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="w3-row-padding">
                        <div className="w3-third">
                            <label>Description</label>
                            <input className="w3-input" type="text" name="packageName" value={createData.packageName} onChange={handleChange} required/>
                        </div>
                    </div>
                    
                    <div className="w3-row-padding">
                        <div className="w3-row-padding w3-third">
                            <label>Declared Value</label>
                            <input className="w3-input" type="number" name="estimatedValue" value={createData.estimatedValue} onChange={handleChange} required/>
                        </div>

                        <div className="w3-row-padding w3-third">
                            <label>Package Insurance</label>
                            <select className="w3-input" name="packageInsurance" value={createData.packageInsurance} onChange={handleChange} required>
                                <option value=""> -- Select Insurance -- </option>
                                <option value="Insurance 10%">Insurance 1</option>
                                <option value="none">None</option>
                            </select>
                        </div>

                        <div className="w3-row-padding w3-third">
                            <br/>
                            <input className="w3-check" type="checkbox" name="accompanied"  onChange={handleChange}/>
                            <label> Accompanied</label>
                        </div>
                    </div>

                    <div className="w3-row-padding">
                        <div className="w3-row-padding w3-third">
                            <label>Quantity</label>
                            <input className="w3-input" type="number" name="quantity" value={createData.quantity} onChange={handleChange} required/>
                        </div>

                        <div className="w3-row-padding w3-third">
                            <label>Shipping Cost</label>
                            <input className="w3-input" type="number" name="price" value={createData.price} onChange={handleChange} required/>
                        </div>
                    </div>

                    <div className="w3-row-padding">
                        <div className="w3-row-padding w3-third">
                            <label>Convenience Fee</label>
                            <input className="w3-input" type="number" name="convenienceFee" readOnly value={createData.convenienceFee} required/>
                        </div>

                        <div className="w3-row-padding w3-third">
                            <label>Insurance Fee</label>
                            <input 
                                className="w3-input" type="number" name="insuranceFee" readOnly value={createData.insuranceFee} required/>
                        </div>
                    </div>

                    <div className="w3-row-padding">
                        <div className="w3-row-padding w3-third">
                            <label>Additional Note</label>
                            <input className="w3-input" type="text" name="additionalNote" value={createData.additionalNote} onChange={handleChange}/>
                        </div>
                    </div>

                    <div className="w3-row-padding">
                        <div className="w3-third">
                            <label>Package Weight (kg)</label>
                            <input className="w3-input" type="number" name="packageWeight" value={createData.packageWeight} onChange={handleChange} required/>
                        </div>
                    </div>

                    <div className="w3-row-padding">
                        <div className="w3-third">
                            <input type="submit" className="w3-btn w3-blue" value="Next Step" />
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
 
export default CreateParcelForm;