import config from "../../config";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "samsularefin532@gmail.com",
    pass: "zkew wvlj zsey pcju",
  },
});

const emailSender = async (userEmail: string, mailBody: string) => {
  console.log(userEmail);
  const info = await transporter.sendMail({
    from: config.nodeMailer.email_sender,
    to: userEmail,
    subject: "Request For password-reset",
    html: mailBody,
  });
  console.log(info);
  return info;
};

export default emailSender;
