import { prisma } from "../../shared/prisma"


const insertIntoDB = async (user:any,payload:any) =>{
    const doctorData = await prisma.doctor.findFirstOrThrow({
        where:{
            email:user?.email
        }
    })

    const doctorScheduleData = payload.scheduleIds.map(
       ( scheduleId:any )=>({
          doctorId:doctorData.id,
          scheduleId
        })
    )
    
     return await prisma.doctorSchedules.createMany({
        data:doctorScheduleData
    })
    
    
}

export const DoctorScheduleService ={
    insertIntoDB
}