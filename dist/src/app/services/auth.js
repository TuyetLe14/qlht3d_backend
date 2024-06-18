"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const db_1 = require("../../db");
const middlewares_1 = __importDefault(require("../../api/middlewares"));
const index_1 = __importDefault(require("../../extensions/emails/index"));
const schedules_1 = __importDefault(require("../../extensions/schedules"));
const signIn = async (username, password) => {
    const userDetail = await db_1.User.findOne({
        where: { [sequelize_1.Op.or]: [{ phoneNumber: username }, { email: username }] },
        logging: false,
    });
    if (!userDetail) {
        throw new Error("Sai tên đăng nhập.");
    }
    console.log(typeof userDetail.active);
    if (Number(userDetail.active) !== 1) {
        throw new Error("Tài khoản chưa xác thực.");
    }
    const ret = (0, bcrypt_1.compareSync)(password, userDetail.password);
    if (!ret) {
        throw new Error("Sai mật khẩu.");
    }
    const token = await middlewares_1.default.createToken({
        id: userDetail.id,
        phoneNumber: userDetail.phoneNumber,
        email: userDetail.email,
        group: userDetail.group,
    });
    return token;
};
const signUp = async (data) => {
    const { password, email, phoneNumber, name, avatar } = data;
    const udEmail = await db_1.User.findOne({ where: { email } });
    if (udEmail) {
        throw new Error("Email đã tồn tại.");
    }
    const salt = (0, bcrypt_1.genSaltSync)(10);
    const userDetail = await db_1.User.create({
        name,
        avatar,
        email,
        phoneNumber: phoneNumber > 1 ? phoneNumber : "",
        password: (0, bcrypt_1.hashSync)(password, salt),
        group: "User",
        active: false,
    });
    const verifyUser = await db_1.VerifyCode.create({
        email,
        code: Math.floor(100000 + Math.random() * 900000),
    });
    const time = new Date().getTime() + 300000; // + 5'
    const timeout = moment_1.default.utc(time);
    const expression = `${timeout.format("s")} ${timeout.format("m")} ${timeout.format("H")} ${timeout.format("D")} ${timeout.format("M")} * ${timeout.format("YYYY")}`;
    await schedules_1.default.add(`signUp/${email}`, expression, true, verifyUser, timeoutVerifyCode);
    const domain = process.env.DOMAIN;
    const subject = `Hệ thống Quản Lý xác nhận tài khoản: ${userDetail.email}`;
    const content = `<!DOCTYPE html>
	<html>
		<head>
			<style type="text/css">
		  div{
			display: inline-block;
		  }
		  a{
			color: blue;
		  }
			</style>
		</head>
		<body>
		<div>
		  <div> <p>Vui lòng click vào </p></div>
		  <div> <a href="${domain}/heritages/confirmAccount?email=${email}&code=${verifyUser.code}">link</a> </div>
		  <div> <p> để xác thực tài khoản.</p> </div>
		  </div>
		</body>
	</html>`;
    await (0, index_1.default)(userDetail.email, subject, content);
    return { id: userDetail.id, email, phoneNumber: phoneNumber || "" };
};
const timeoutVerifyCode = async (data) => {
    await data.destroy();
};
const confirmAccount = async (email, code) => {
    const userDetail = await db_1.User.findOne({ where: { email } });
    if (!userDetail) {
        return {
            message: "<h3>Tài khoản không tồn tại, vui lòng đăng kí tài khoản.</h3>",
        };
    }
    if (userDetail.active === 1) {
        return { message: "<h3>Tài khoản đã được xác thực.</h3>" };
    }
    const verifyUser = await db_1.VerifyCode.findOne({ where: { email, code } });
    if (!verifyUser) {
        return {
            message: `<div>
		  <h3> Confirmation has expired!!</h3>
		  <div> <p>Please click to 
		   <a href="${process.env.DOMAIN}/heritages/newConfirmAccount?email=${email}">link</a> 
			to create create a new confirmation email.</p> </div>
		  </div>
		</body>`,
        };
    }
    if (verifyUser.code !== Number(code)) {
        userDetail.destroy();
        verifyUser.destroy();
        return {
            message: "<h3>Xác thực tài khoản thất bại, vui lòng đăng kí lại tài khoản.</h3>",
        };
    }
    await userDetail.update({ active: true });
    verifyUser.destroy();
    return { message: "<h3>Xác thực tài khoản thành công!</h3>" };
};
const signOut = async (id, did) => {
    console.log(id);
    console.log(did);
};
const refreshToken = async (token) => {
    const ret = await middlewares_1.default.isRefressToken(token);
    return ret;
};
const changePassword = async (userInfo, oldPassword, newPassword) => {
    const salt = (0, bcrypt_1.genSaltSync)(10);
    console.log(userInfo);
    const userDetail = await db_1.User.findOne({ where: { id: userInfo.id } });
    if (!userDetail) {
        throw new Error("Yêu cầu thay đổi mật khẩu thất bại.");
    }
    const ret = (0, bcrypt_1.compareSync)(oldPassword, userDetail.password);
    if (!ret) {
        throw new Error("Sai mật khẩu cũ.");
    }
    return await db_1.User.update({ password: (0, bcrypt_1.hashSync)(newPassword, salt) }, {
        where: {
            id: userDetail.id,
        },
    });
};
const forgotPassword = async (username) => {
    const userDetail = await db_1.User.findOne({ where: { email: username } });
    if (!userDetail) {
        throw new Error("Tài khoản không tồn tại.");
    }
    const verifyUser = await db_1.VerifyCode.create({
        email: username,
        code: Math.floor(100000 + Math.random() * 900000),
    });
    const time = new Date().getTime() + 300000; // + 5'
    const timeout = moment_1.default.utc(time);
    const expression = `${timeout.format("s")} ${timeout.format("m")} ${timeout.format("H")} ${timeout.format("D")} ${timeout.format("M")} * ${timeout.format("YYYY")}`;
    await schedules_1.default.add(username, expression, true, verifyUser, timeoutVerifyCode);
    const subject = `Ultrasonic gửi mã xác nhận tài khoản: ${username}`;
    const content = `<!DOCTYPE html>
	<html>
		<head>
			<style type="text/css">
		  div{
			display: inline-block;
		  }
			</style>
		</head>
		<body>
		<div>
		  <div> <p>Mã xác thực của bạn là: </p></div>
		  <div><h3>${verifyUser.code}.</h3></div>
		  </div>
		</body>
	</html>`;
    return await (0, index_1.default)(username, subject, content);
};
const confirmForgotPassword = async (data) => {
    const verifyUser = await db_1.VerifyCode.findOne({
        where: { email: data.username, code: data.confirmationCode },
    });
    if (!verifyUser) {
        throw new Error("Không tồn tại mã xác thực.");
    }
    // if (verifyUser.code !== Number(data.confirmationCode)) {
    //   verifyUser.destroy()
    //   await cronJob.delete(data.username)
    //   throw new Error('Sai mã xác thực.')
    // }
    verifyUser.destroy();
    await schedules_1.default.delete(data.username);
    const salt = (0, bcrypt_1.genSaltSync)(10);
    return await db_1.User.update({ password: (0, bcrypt_1.hashSync)(data.password, salt), active: true }, {
        where: {
            email: data.username,
        },
    });
};
const resetPassword = async (username, password) => {
    const salt = (0, bcrypt_1.genSaltSync)(10);
    const userDetail = await db_1.User.findOne({ where: { username } });
    if (!userDetail) {
        throw new Error("Tài khoản không tồn tại");
    }
    const ret = await db_1.User.update({ password: (0, bcrypt_1.hashSync)(password, salt) }, {
        where: {
            sub: userDetail.sub,
        },
    });
    const subject = `Ultrasonic gửi mật khẩu của tài khoản: ${username}`;
    const text = `<!DOCTYPE html>
	<html>
		<head>
			<style type="text/css">
		  div{
			display: inline-block;
		  }
			</style>
		</head>
		<body>
		<div>
		  <div> <p>Mật khẩu Ultrasonic của bạn là: </p></div>
		  <div><h3>${password}.</h3></div>
		  </div>
		</body>
	</html>`;
    await (0, index_1.default)(userDetail.email, subject, text);
    return ret;
};
const newConfirmAccount = async (email) => {
    const userDetail = await db_1.User.findOne({ where: { email } });
    if (!userDetail) {
        return {
            message: "<h3>Account does not exist, please register an account!</h3>",
        };
    }
    const verifyUser = await db_1.VerifyCode.create({
        email,
        code: Math.floor(100000 + Math.random() * 900000),
    });
    const time = new Date().getTime() + 300000; // + 5'
    const timeout = moment_1.default.utc(time);
    const expression = `${timeout.format("s")} ${timeout.format("m")} ${timeout.format("H")} ${timeout.format("D")} ${timeout.format("M")} * ${timeout.format("YYYY")}`;
    await schedules_1.default.add(`signUp/${email}`, expression, true, verifyUser, timeoutVerifyCode);
    const domain = process.env.DOMAIN || 'http://localhost:3005';
    const subject = `Manage System 3D the account: ${userDetail.email}`;
    const content = `<!DOCTYPE html>
	  <html>
		  <head>
			  <style type="text/css">
			div{
			  display: inline-block;
			}
			a{
			  color: blue;
			}
			  </style>
		  </head>
		  <body>
		  <div>
			<div> <p>Please click to &nbsp;</p></div>
			<div> <a href="${domain}/heritages/confirmAccount?email=${userDetail.email}&code=${verifyUser.code}">link</a> </div>
			<div> <p>&nbsp;  to confirm your account.</p> </div>
			</div>
		  </body>
	  </html>`;
    await (0, index_1.default)(userDetail.email, subject, content);
    return {
        message: `<h3>The new verification has been sent to ${email}! Please check your inbox!</h3>`,
    };
};
exports.default = {
    signUp,
    signIn,
    confirmAccount,
    signOut,
    refreshToken,
    changePassword,
    forgotPassword,
    confirmForgotPassword,
    resetPassword,
    newConfirmAccount,
};
//# sourceMappingURL=auth.js.map