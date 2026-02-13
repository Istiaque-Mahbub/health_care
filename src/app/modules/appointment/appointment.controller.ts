import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AppointmentService } from "./appointment.service";
import pick from "../../helper/pick";

const createAppointment = catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await AppointmentService.createAppointment(user , req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Appointment created successfully!",
        data: result
    })
});

const getMyAppointment = catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const options = pick(req.query,["page","limit","sortBy","sortOrder"])
    const user = req.user;
    const filters =  pick(req.query,["status","paymentStatus"])
    const result = await AppointmentService.getMyAppointment(user,options,filters)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Fetch my appointments!",
        data: result
    })
});


const updateAppointmentStatus = catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;

    const result = await AppointmentService.updateAppointmentStatus(id, status, user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Appointment updated successfully!",
        data: result
    })
})

export const AppointmentController ={
    createAppointment,
    getMyAppointment,
    updateAppointmentStatus
}