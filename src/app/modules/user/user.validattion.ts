import z from "zod";

const createValidationSchema = z.object({
    password:z.string(),
    patient:z.object(
        {
        name:z.string({
            error:"Name is required"
        }),
        email:z.email({
            error:"Email is required"
        }),
        address:z.string().optional()
    }
    )
})


export const UserValidation = {
    createValidationSchema
}