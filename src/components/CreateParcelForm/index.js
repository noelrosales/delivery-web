import React, { Component } from 'react';

class CreateParcelForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const { createData, handleChange} = this.props;
        return (
            <div className="step-1">
                <h1>Parcel Details</h1>
                <div className="w3-row-padding"> 
                    <div className="w3-third">
                        <label>Sender Name</label>
                        <input className="w3-input" type="text" name="senderName" value={createData.senderName} onChange={handleChange}/>
                    </div>
                
                    <div className="w3-third">
                        <label>Sender Email</label>
                        <input className="w3-input" type="email" name="senderEmail" value={createData.senderEmail} onChange={handleChange}/>
                    </div>

                    <div className="w3-third">
                        <label>Sender Mobile Number</label>
                        <input className="w3-input" type="text" name="senderPhoneNumber" value={createData.senderPhoneNumber} onChange={handleChange}/>
                    </div>
                </div>

                <div className="w3-row-padding">
                    <div className="w3-third">
                        <label>Recipient Name</label>
                        <input className="w3-input" type="text" name="recipientName" value={createData.recipientName} onChange={handleChange}/>
                    </div>

                    <div className="w3-third">
                        <label>Recipient Email</label>
                        <input className="w3-input" type="email" name="recipientEmail" value={createData.recipientEmail} onChange={handleChange}/>
                    </div>

                    <div className="w3-third">
                        <label>Recipient Mobile Number</label>
                        <input className="w3-input" type="text" name="recipientPhoneNumber" value={createData.recipientPhoneNumber} onChange={handleChange}/>
                    </div>
                </div> 

                <div className="w3-row-padding">
                    <div className="w3-third">
                        <label>Package Name</label>
                        <input className="w3-input" type="text" name="packageName" value={createData.packageName} onChange={handleChange}/>
                    </div>

                    <div className="w3-third">
                        <label>Package Weight (kg)</label>
                        <input className="w3-input" type="number" name="packageWeight" value={createData.packageWeight} onChange={handleChange}/>
                    </div>

                    <div className="w3-row-padding w3-third">
                        <label>Package Insurance</label>
                        <select className="w3-input" name="packageInsurance" value={createData.packageInsurance} onChange={handleChange}>
                            <option disabled> -- Select Insurance -- </option>
                            <option value={createData.estimatedValue * .10}>Insurance 1</option>
                            <option value={0}>None</option>
                        </select>
                    </div>
                </div>
                
                <div className="w3-row-padding">
                    <div className="w3-row-padding w3-third">
                        <label>Estimated Value</label>
                        <input className="w3-input" type="number" name="estimatedValue" value={createData.estimatedValue} onChange={handleChange}/>
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
                        <input className="w3-input" type="number" name="quantity" value={createData.quantity} onChange={handleChange}/>
                    </div>
                </div>

                <div className="w3-row-padding">
                    <div className="w3-row-padding w3-third">
                        <label>Price</label>
                        <input className="w3-input" type="number" name="price" value={createData.price} onChange={handleChange}/>
                    </div>
                </div>

                <div className="w3-row-padding">
                    <div className="w3-row-padding w3-third">
                        <label>Additional Note</label>
                        <input className="w3-input" type="text" name="additionalNote" value={createData.additionalNote} onChange={handleChange}/>
                    </div>
                </div>

                <div className="w3-row-padding">
                    <div className="w3-row-padding w3-third">
                        <label>Destination</label>
                        <select className="w3-input" name="endStation" value={createData.endStation} onChange={handleChange}>
                            <option value="">SELECT STATION</option>
                            {
                                createData.uniqueStations.map((station, index) => {
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