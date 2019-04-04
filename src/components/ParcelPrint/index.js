import React, { Component } from 'react';
import { QRCode } from "react-qr-svg";
import moment from 'moment';
import './style.css';
import movonLogo3 from '../../assets/img/movon3.png';
import bicolLogo from '../../assets/img/bicol.png';

class ParcelPrint extends Component {
    render() { 
        const { parcelData } = this.props;
        return (
            <div>
                <div className="parcel-summary-print">
                    <div>
                        <div className="parcel-summary-qr-code">
                            <div>
                                <QRCode
                                    style={{width: 150}}
                                    level="Q"
                                    value={parcelData.scanCode}
                                />
                                <h3>{parcelData.scanCode}</h3>
                            </div>
                        </div>

                        <div className="parcel-summary-delivery-detail">
                            <div className="header-logos">
                                <img src={movonLogo3} alt="MovOn logo" />
                                <img src={bicolLogo} alt="Company logo" />
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Sender:</td>
                                        <td>{parcelData.senderInfo.senderName}</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{parcelData.senderInfo.senderEmail}</td>
                                    </tr>
                                    <tr>
                                        <td>Recipient:</td>
                                        <td>{parcelData.recipientInfo.recipientName}</td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td>{parcelData.recipientInfo.recipientEmail}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{flexDirection:'column'}}>
                        <h3>Package Info</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Package Name: </td>
                                    <td>{parcelData.packageInfo.packageName}</td>
                                </tr>
                                <tr>
                                    <td>Quantity: </td>
                                    <td>{parcelData.packageInfo.quantity}</td>
                                </tr>
                                <tr>
                                    <td>Destination: </td>
                                    <td>{parcelData.endStationName || parcelData.endStation.name}</td>
                                </tr>
                                <tr>
                                    <td>Date: </td>
                                    <td>{moment(parcelData.createdAt).format('LL')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {
                    parcelData.subParcels.map((subParcel,index) => {
                        return (
                            <div className="parcel-print" key={index}>
                                <div className="qr-code">
                                    <div>
                                        <QRCode
                                            style={{width: 200}}
                                            level="Q"
                                            value={subParcel.subParcelCode}
                                        />
                                        <h3 style={{textAlign: 'center', marginTop:'24px'}}>{subParcel.subParcelCode}</h3>
                                    </div>
                                    <h3>{moment(parcelData.createdAt).format('LL')}</h3>
                                </div>
                                <div className="delivery-detail">
                                    <div className="header-logos">
                                        <img src={movonLogo3} alt="MovOn logo" />
                                        <img src={bicolLogo} alt="Company logo" />
                                    </div>

                                    <div className="recipient-details">
                                        <div>
                                            <h3>Recipient:</h3>
                                            <h2>{parcelData.recipientInfo.recipientName}</h2>
                                        </div>
                                        
                                        <div>
                                            <h3>Destination:</h3>
                                            <h2>{parcelData.endStationName || parcelData.endStation.name}</h2>
                                        </div>

                                        <div className="parcel-count">
                                            <h3>Parcel:</h3>
                                            <h3>{`${index+1} of ${parcelData.subParcels.length}`}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
 
export default ParcelPrint;
