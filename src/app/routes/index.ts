import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.routes';
import { ScheduleRoutes } from '../modules/schedule/schedule.routes';
import { doctorScheduleRoutes } from '../modules/doctorSchedule/doctorSchedule.route';
import { SpecialtiesRoutes } from '../modules/specialties/specialties.routes';
import { DoctorRouters } from '../modules/doctor/doctor.route';
import { AppointmentRouter } from '../modules/appointment/appointment.route';
import { PrescriptionRoutes } from '../modules/prescription/prescription.router';
import { ReviewRoutes } from '../modules/review/review.route';
import { PatientRoutes } from '../modules/patient/patient.route';
import { AdminRoutes } from '../modules/admin/admin.routes';


const router = express.Router();

const moduleRoutes = [
   
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/schedule',
        route: ScheduleRoutes
    },
    {
        path: '/doctor-schedule',
        route: doctorScheduleRoutes
    },
    {
        path: '/specialties',
        route: SpecialtiesRoutes
    },
    {
        path: '/doctor',
        route: DoctorRouters
    },
    {
        path: '/appointment',
        route: AppointmentRouter
    },
     {
        path: '/prescription',
        route: PrescriptionRoutes
    },
     {
        path: '/review',
        route: ReviewRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/patient',
        route: PatientRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;