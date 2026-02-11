import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AppointmentService } from "./appointment.service";

const createAppointment = catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    console.log(user)
    const result = await AppointmentService.createAppointment(user , req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Appointment created successfully!",
        data: result
    })
});


export const AppointmentController ={
    createAppointment
}