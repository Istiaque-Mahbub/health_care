import { Doctor, Prisma } from "@prisma/client"
import { paginationHelper } from "../../helper/paginationHelper"
import { doctorSearchableFields } from "./doctor.constant"
import { prisma } from "../../shared/prisma"
import catchAsync from "../../shared/catchAsync"
import { Request, Response } from "express"
import { IDoctorUpdateInput } from "./doctor.interface"


const getAllFromDB = async(filters:any,options:any) =>{
    const {page,limit,skip,sortBy,sortOrder} = paginationHelper.calculatedPagination(options)
    const {searchTerm,specialties, ...filterData} = filters

    const andConditions:Prisma.DoctorWhereInput[] = []

    if(searchTerm){
        andConditions.push({
            OR:doctorSearchableFields.map((field) =>({
            [field]:{
                contains:searchTerm,
                mode:"insensitive"
            }
        }))
        })
    }

    if(specialties && specialties.length > 0){

        andConditions.push({
            doctorSpecialties:{
                some:{
                    specialities:{
                        title:{
                            contains:specialties,
                            mode:"insensitive"
                        }
                    }
                }
            }
        })
    }

    if(Object.keys(filterData).length > 0){
        const filterConditions = Object.keys(filterData).map((key:any)=>({
            [key]:{
                equals:(filterData as any)[key]
            }
        }))

        andConditions.push(...filterConditions)
    }

    const whereConditions : Prisma.DoctorWhereInput =  andConditions.length > 0 ? {AND:andConditions} :{}

    const result = await prisma.doctor.findMany({
        where:whereConditions,
        skip,
        take:limit,
        orderBy:{
            [sortBy]:sortOrder
        },
        include:{
            doctorSpecialties:{
                include:{
                    specialities:true
                }
            }
        }
    })

    const total = await prisma.doctor.count({
        where:whereConditions
    })

    return{
        meta:{
            total,
            page,
            limit
        },
        data:result
    }
    
}

const updateIntoDB = async(id:string,payload:Partial<IDoctorUpdateInput>) =>{
    const doctorInfo = await prisma.doctor.findUniqueOrThrow({
        where:{
            id
        }
    })

    const {specialties,...doctorData} = payload

    return await prisma.$transaction(async(tnx)=>{

        
    if(specialties && specialties.length > 0){
       const deleteSpecialtyIds = specialties.filter((specialty) => specialty?.isDeleted)

       for(const specialty of deleteSpecialtyIds ){
        await tnx.doctorSpecialties.deleteMany({
            where:{
                doctorId :id,
                specialtiesId:specialty.specialtyId
            }
        })
       }

       const createSpecialtyIds = specialties.filter((specialty) => !specialty?.isDeleted)

        for(const specialty of createSpecialtyIds ){
        await tnx.doctorSpecialties.create({
            data:{
                doctorId :id,
                specialtiesId:specialty.specialtyId
            }
        })
       }
    }


    const updatedData =  await tnx.doctor.update({
        where:{
            id:doctorInfo.id
        },
        data:doctorData,

        include:{
            doctorSpecialties:{
                include:{
                    specialities:true
                }
            }
        }
    })

    return updatedData
    })

}

export const DoctorService = {
    getAllFromDB,updateIntoDB
}