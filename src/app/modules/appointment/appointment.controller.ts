import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AppointmentService } from "./appointment.service";
import pick from "../../helper/pick";
import { appointmentFilterableFields } from "./appointment.constant";
import httpStatus from "http-status";

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

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, appointmentFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AppointmentService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Appointment retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});

export const AppointmentController ={
    createAppointment,
    getMyAppointment,
    updateAppointmentStatus,
    getAllFromDB
}