import axios from 'axios';
import moment from 'moment';
import Config from '../util/Config';

const ParcelService = {
    getTrips : (token, stationId) => {
        return axios({
            method: 'post',
            url: `${Config.api_domain}/server/api/v1/account/delivery-person/home/trips`,
            headers : {
                'x-auth-deviceid' : '1',
                'x-auth-devicetype' : '1',
                'x-auth-token' : token
            },
            data : {
                stationId: stationId,
                todaysStartDate: moment().subtract(1, 'day').format('YYYY-MM-DDT16:00:00[Z]'),
                tomorrowsStartTime: moment().format('YYYY-MM-DDT15:59:59[Z]'),
                currentTime: moment().utc().format('YYYY-MM-DDThh:mm:ss[Z]')
            }
        })
    },

    create : (parcelData) => {
        const bodyFormData = new FormData();

        bodyFormData.set('senderName',parcelData.senderName)
        bodyFormData.set('senderEmail', parcelData.senderEmail)
        bodyFormData.set('senderPhoneCountryCode', parcelData.senderPhoneCountryCode)
        bodyFormData.set('senderPhoneNumber', parcelData.senderPhoneNumber)
        bodyFormData.set('recipientName', parcelData.recipientName)
        bodyFormData.set('recipientEmail', parcelData.recipientEmail)
        bodyFormData.set('recipientPhoneCountryCode', parcelData.recipientPhoneCountryCode)
        bodyFormData.set('recipientPhoneNumber', parcelData.recipientPhoneNumber)
        bodyFormData.set('packageName', parcelData.packageName)
        bodyFormData.set('packageWeight', parcelData.packageWeight)
        bodyFormData.set('estimatedValue', parcelData.estimatedValue)
        bodyFormData.set('accompanied', parcelData.accompanied)
        bodyFormData.set('packageInsurance', parcelData.packageInsurance)
        bodyFormData.set('quantity', parcelData.quantity)
        bodyFormData.set('price', parcelData.price)
        bodyFormData.set('additionalNote', parcelData.additionalNote)
        bodyFormData.append('packageImage', parcelData.packageImage)
        bodyFormData.set('busId', parcelData.busId)
        bodyFormData.set('busCompanyId', parcelData.busCompanyId)
        bodyFormData.set('tripId', parcelData.tripId)
        bodyFormData.set('startStation', parcelData.startStation)
        bodyFormData.set('endStation', parcelData.endStation)
                
        return axios({
            method: 'post',
            url: `${Config.api_domain}/server/api/v1/account/delivery-person/parcel/create`,
            headers : {
                'x-auth-deviceid' : '1',
                'x-auth-devicetype' : '1',
                'x-auth-token' : Config.api_token
            },
            data: bodyFormData,
            config: { headers : {'Content-Type': 'multipart/form-data'} }
        })
    },

    getDynamicPrice: (busCompanyId, claimAmount, endStation, isAccompanied, startStation, weight) => {
        return axios({
            method: 'post',
            url: `${Config.api_domain}/server/api/v1/account/delivery-person/parcel/${busCompanyId}/calculate`,
            headers: {
                'x-auth-deviceid' : '1',
                'x-auth-devicetype' : '1',
                'x-auth-token' : Config.api_token
            },
            data: {
                claimAmount: claimAmount,
                endStation: endStation,
                isAccompanied: isAccompanied,
                startStation: startStation,
                weight: weight
            }
        })
    }
}

export default ParcelService;