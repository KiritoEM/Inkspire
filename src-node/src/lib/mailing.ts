import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
    }
});

/**
 * Send an email 
 * 
 * @param {string} email adress
 * @param {string} html The HTML content 
 * @param {string} text The text content 
 * @returns [Promise<unknown>]
 */

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