import nodemailer from 'nodemailer'
import config from '../../../config';

const emailSender = async (
    email: string,
    html: string
) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: config.EMAIL_SENDER_EMAIL,
            pass: config.EMAIL_SENDER_APP_PASSWORD, // app password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: '"Health Care" <istiaquemahbubisti.geekssort@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Reset Password Link", // Subject line
        //text: "Hello world?", // plain text body
        html, // html body
    });

}

export default emailSender;