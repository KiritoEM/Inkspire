import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
    }
});

const sendEmail = (email: string, html: string, text: string) => {
    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: `${email}`,
        subject: "Inkspire - Confirmation d'inscription",
        text: text,
        html: html
    }

    try {
        return transporter.sendMail(mailOptions);
    }
    catch (err) {
        console.error("An erro was occured when sending email: ", err);
    }
}

export { sendEmail }