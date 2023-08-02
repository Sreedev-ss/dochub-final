import axios from 'axios'

class DoctorApi{
    async updatePaymentStatus(paymentIntent:string,appointmentId:string){
        const response = await axios.put(`http://localhost:8000/doc/doctor/update-payment-status`,{paymentIntent,appointmentId})
        return response
    }
}

export {DoctorApi}