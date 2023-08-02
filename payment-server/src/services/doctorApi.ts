import axios from 'axios'

class DoctorApi{
    async updatePaymentStatus(paymentIntent:string,appointmentId:string){
        const response = await axios.put(`https://sreedev.live/doctor/update-payment-status`,{paymentIntent,appointmentId})
        return response
    }
}

export {DoctorApi}