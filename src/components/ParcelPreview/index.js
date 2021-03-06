import React from 'react';
import './style.css'
import { QRCode } from 'react-qr-svg';

const ParcelPreview = ({parcelData}) => {
  return (
    <div className="parcel-preview">
        {parcelData.scanCode
            ? <QRCode
                style={{width: 150}}
                level="Q"
                value={parcelData.scanCode}
              />
            : null
        }
        
        <h4>Parcel Details</h4>
        <div className="parcel-details w3-row">
            <img className="w3-col m4" src={parcelData.packageImage ? parcelData.packageImagePreview : parcelData.packageInfo.packageImages[0]} alt="package" />
            <div className="w3-col m8 w3-container">
                <h5>Package Details</h5>
                <table className="w3-table striped">
                    <tbody>
                        <tr>
                            <td>Package Name : </td>
                            <td>{parcelData.packageName ? parcelData.packageName : parcelData.packageInfo.packageName}</td>
                        </tr>

                        <tr>
                            <td>Number of Parcels : </td>
                            <td>{parcelData.quantity ? parcelData.quantity : parcelData.packageInfo.quantity}</td>
                        </tr>

                        <tr>
                            <td>Weight : </td>
                            <td>{parcelData.packageWeight ? parcelData.packageWeight : parcelData.packageInfo.packageWeight}</td>
                        </tr>

                        <tr>
                            <td>Shipping Cost : </td>
                            <td>{parcelData.price ? parcelData.price : parcelData.priceDetails.price}</td>
                        </tr>

                        <tr>
                            <td>Convenience Fee : </td>
                            <td>{parcelData.convenienceFee ? parcelData.convenienceFee : parcelData.priceDetails.convenienceFee}</td>
                        </tr>

                        <tr>
                            <td>Insurance Fee : </td>
                            <td>{parcelData.insuranceFee ? parcelData.insuranceFee : parcelData.priceDetails.insuranceFee}</td>
                        </tr>

                        <tr>
                            <td>Total Shipping Cost : </td>
                            <td>{parcelData.price ? parseInt(parcelData.price) + parseInt(parcelData.insuranceFee) + parseInt(parcelData.convenienceFee) : parcelData.priceDetails.totalPrice}</td>
                        </tr>
                    
                        <tr>
                            <td>Additional Note : </td>
                            <td>{parcelData.additionalNote}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <h5>Sender Details</h5>
        <table className="w3-table striped">
            <tbody>
                <tr>
                    <td>Name : </td>
                    <td>{parcelData.senderName ? parcelData.senderName : parcelData.senderInfo.senderName}</td>
                </tr>
                <tr>
                    <td>Email : </td>
                    <td>{parcelData.senderEmail ? parcelData.senderEmail : parcelData.senderInfo.senderEmail}</td>
                </tr>
                <tr>
                    <td>Phone : </td>
                    <td>{`+63 ${parcelData.senderPhoneNumber ?  parcelData.senderPhoneNumber : parcelData.senderInfo.senderPhone.number}`}</td>
                </tr>
            </tbody>
        </table>

        <h5>Recepient Details</h5>
        <table className="w3-table">
            <tbody>
                <tr>
                    <td>Name : </td>
                    <td>{parcelData.recipientName ? parcelData.recipientName : parcelData.recipientInfo.recipientName}</td>
                </tr>
                <tr>
                    <td>Email : </td>
                    <td>{parcelData.recipientEmail ? parcelData.recipientEmail : parcelData.recipientInfo.recipientEmail}</td>
                </tr>
                <tr>
                    <td>Phone : </td>
                    <td>{`+63 ${parcelData.recipientPhoneNumber ? parcelData.recipientPhoneNumber : parcelData.recipientInfo.recipientPhone.number}`}</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default ParcelPreview
