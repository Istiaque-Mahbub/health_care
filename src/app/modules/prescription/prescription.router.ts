import { UserRole } from "@prisma/client";
import { PrescriptionController } from "./prescription.cntroller";
import auth from "../../middlewares/auth";
import express from "express"
const router = express.Router();


router.get(
    '/my-prescription',
    auth(UserRole.PATIENT),
    PrescriptionController.patientPrescription
)

router.post(
    "/",
    auth(UserRole.DOCTOR),
    PrescriptionController.createPrescription
);

export const PrescriptionRoutes = router;