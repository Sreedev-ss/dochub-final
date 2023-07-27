import { Request, Response } from 'express';
import { AppointmentModel } from '../models/appointment';
import { AppointmentRepository } from '../repositories/appointment';
import RequestDefenition from '../definition';

const appointmentRepo = new AppointmentRepository()

export const addAppointment = async (req: Request, res: Response) => {
    try {
        const { data } = req.body
        console.log(data);
        const response = await AppointmentModel.create(data)
        res.json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const updatePayment = async (req: Request, res: Response) => {
    try {
        const { paymentIntent, appointmentId } = req.body
        await appointmentRepo.updatePaymentStatus(paymentIntent, appointmentId)
        res.status(200)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getAllAppointment = async (req: RequestDefenition, res: Response) => {    
    try {
        const user = req.query.role
        const id:string = req.query.id as string   
        const skip = req.query.skip
        const limit = req.query.limit   
        if(user == 'patient'){
            const response = await appointmentRepo.findByPatientId(id,skip,limit)
            res.json(response)
        } else{            
            const response = await appointmentRepo.findByDoctorId(id,skip,limit)
            res.json(response)
        }  
       
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getAllAppointmentBydate = async (req: Request, res: Response) => {
    try {
        const {date, dId} = req.body
        const response = await appointmentRepo.findByDoctorIdAndDate(dId,date)
        res.json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}