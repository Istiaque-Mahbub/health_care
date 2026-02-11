import { prisma } from "../../shared/prisma";


const createAppointment = async (user: any, payload: { doctorId: string, scheduleId: string }) => {
    const patientData = await prisma.patient.findUniqueOrThrow({
        where:{email:user.email}
    })
    const doctorData = await prisma.doctor.findFirstOrThrow({
        where:{
            id:payload.doctorId,
            isDeleted:false
        }
    })

    const isBookedOrNot = await prisma.doctorSchedules.findFirstOrThrow({
        where:{
            doctorId:payload.doctorId,
            scheduleId:payload.scheduleId,
            isBooked:false
        }
    })
};

export const AppointmentService = {
    createAppointment,
};