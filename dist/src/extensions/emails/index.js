"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (email, subject, html) => {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.HOT_EMAIL,
        service: process.env.SERVICE_EMAIL,
        secure: true,
        port: 465,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL,
        },
    });
    return await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject,
        html,
    });
};
exports.default = sendEmail;
//# sourceMappingURL=index.js.map