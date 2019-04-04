import React from 'react';
import './style.css'

const ParcelPreview = ({parcelData}) => {
  return (
    <div className="parcel-preview">
        <h1>Parcel Details</h1>
        <div className="parcel-details w3-row">
            <img className="w3-col m4" src={parcelData.packageImage ? parcelData.packageImagePreview : parcelData.packageInfo.packageImages[0]} alt="package" />
            <div className="w3-col m8 w3-container">
                <h2>Package Details</h2>
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
                            <td>Price : </td>
                            <td>{parcelData.price ? parcelData.price : parcelData.priceDetails.totalPrice}</td>
                        </tr>
                        <tr>
                            <td>Additional Note : </td>
                            <td>{parcelData.additionalNote}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <h2>Sender Details</h2>
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

        <h2>Recepient Details</h2>
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
