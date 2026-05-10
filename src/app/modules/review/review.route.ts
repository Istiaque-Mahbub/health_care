import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import express from "express"
import { ReviewController } from "./review.controller";
const router = express.Router();

router.post(
    '/',
    auth(UserRole.PATIENT),
    ReviewController.insertIntoDB
);

router.get('/', ReviewController.getAllFromDB);

export const ReviewRoutes = router;