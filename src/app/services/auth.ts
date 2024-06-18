import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { Op, where } from "sequelize";
import moment from "moment";
import { User, VerifyCode } from "../../db";
import middlewares from "../../api/middlewares";
import sendEmail from "../../extensions/emails/index";
import cronJob from "../../extensions/schedules";

const signIn = async (username: string, password: string) => {
	const userDetail = await User.findOne({
	  where: { [Op.or]: [{ phoneNumber: username }, { email: username }] },
	  logging: false,
	});
  
	if (!userDetail) {
	  throw new Error("Sai tên đăng nhập.");
	}
  
	console.log(typeof userDetail.active);
	if (Number(userDetail.active) !== 1) {
	  throw new Error("Tài khoản chưa xác thực.");
	}
  
	const ret = compareSync(password, userDetail.password as string);
	if (!ret) {
	  throw new Error("Sai mật khẩu.");
	}
  
	const token = await middlewares.createToken({
	  id: userDetail.id,
	  phoneNumber: userDetail.phoneNumber,
	  email: userDetail.email,
	  group: userDetail.group,
	});
	return token;
  };

  const signUp = async (data: any) => {
	const { password, email, phoneNumber, name, avatar} = data;
  
	const udEmail = await User.findOne({ where: { email } });
	if (udEmail) {
	  throw new Error("Email đã tồn tại.");
	}
  
	const salt = genSaltSync(10);
	const userDetail = await User.create({
	  name,
	  avatar,
	  email,
	  phoneNumber: phoneNumber > 1 ? phoneNumber : "",
	  password: hashSync(password, salt),
	  group: "User",
	  active: false,
	});

	const verifyUser = await VerifyCode.create({
	  email,
	  code: Math.floor(100000 + Math.random() * 900000),
	});
  
	const time = new Date().getTime() + 300000; // + 5'
	const timeout = moment.utc(time);
  
	const expression = `${timeout.format("s")} ${timeout.format(
	  "m"
	)} ${timeout.format("H")} ${timeout.format("D")} ${timeout.format(
	  "M"
	)} * ${timeout.format("YYYY")}`;
  
	await cronJob.add(
	  `signUp/${email}`,
	  expression,
	  true,
	  verifyUser,
	  timeoutVerifyCode
	);
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
  
	await sendEmail(userDetail.email, subject, content);
  
	return { id: userDetail.id, email, phoneNumber: phoneNumber || "" };
  };

  const timeoutVerifyCode = async (data: any) => {
	await data.destroy();
  };
  
  const confirmAccount = async (email: string, code: string) => {
	const userDetail = await User.findOne({ where: { email } });
	if (!userDetail) {
	  return {
		message: "<h3>Tài khoản không tồn tại, vui lòng đăng kí tài khoản.</h3>",
	  };
	}
  
	if (userDetail.active === 1) {
	  return { message: "<h3>Tài khoản đã được xác thực.</h3>" };
	}
	const verifyUser = await VerifyCode.findOne({ where: { email, code } });
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
		message:
		  "<h3>Xác thực tài khoản thất bại, vui lòng đăng kí lại tài khoản.</h3>",
	  };
	}
	await userDetail.update({ active: true });
	verifyUser.destroy();
	return { message: "<h3>Xác thực tài khoản thành công!</h3>" };
  };
  
  const signOut = async (id: number, did: string) => {
	console.log(id);
	console.log(did);
  };
  
  const refreshToken = async (token: string) => {
	const ret = await middlewares.isRefressToken(token);
	return ret;
  };
  
  const changePassword = async (
	userInfo: any,
	oldPassword: string,
	newPassword: string
  ) => {
	const salt = genSaltSync(10);
	console.log(userInfo);
	const userDetail = await User.findOne({ where: { id: userInfo.id } });
	if (!userDetail) {
	  throw new Error("Yêu cầu thay đổi mật khẩu thất bại.");
	}
	const ret = compareSync(oldPassword, userDetail.password as string);
	if (!ret) {
	  throw new Error("Sai mật khẩu cũ.");
	}
  
	return await User.update(
	  { password: hashSync(newPassword, salt) },
	  {
		where: {
		  id: userDetail.id,
		},
	  }
	);
  };
  
  const forgotPassword = async (username: string) => {
	const userDetail = await User.findOne({ where: { email: username } });
	if (!userDetail) {
	  throw new Error("Tài khoản không tồn tại.");
	}
  
	const verifyUser = await VerifyCode.create({
	  email: username,
	  code: Math.floor(100000 + Math.random() * 900000),
	});
  
	const time = new Date().getTime() + 300000; // + 5'
	const timeout = moment.utc(time);
  
	const expression = `${timeout.format("s")} ${timeout.format(
	  "m"
	)} ${timeout.format("H")} ${timeout.format("D")} ${timeout.format(
	  "M"
	)} * ${timeout.format("YYYY")}`;
  
	await cronJob.add(username, expression, true, verifyUser, timeoutVerifyCode);
  
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
  
	return await sendEmail(username, subject, content);
  };
  
  const confirmForgotPassword = async (data: any) => {
	const verifyUser = await VerifyCode.findOne({
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
	await cronJob.delete(data.username);
  
	const salt = genSaltSync(10);
	return await User.update(
	  { password: hashSync(data.password, salt), active: true },
	  {
		where: {
		  email: data.username,
		},
	  }
	);
  };
  const resetPassword = async (username: string, password: string) => {
	const salt = genSaltSync(10);
	const userDetail: any = await User.findOne({ where: { username } });
	if (!userDetail) {
	  throw new Error("Tài khoản không tồn tại");
	}
  
	const ret = await User.update(
	  { password: hashSync(password, salt) },
	  {
		where: {
		  sub: userDetail.sub,
		},
	  }
	);
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
  
	await sendEmail(userDetail.email, subject, text);
  
	return ret;
  };
  
  const newConfirmAccount = async (email: string) => {
	const userDetail = await User.findOne({ where: { email } });
	if (!userDetail) {
	  return {
		message: "<h3>Account does not exist, please register an account!</h3>",
	  };
	}
	const verifyUser = await VerifyCode.create({
	  email,
	  code: Math.floor(100000 + Math.random() * 900000),
	});
  
	const time = new Date().getTime() + 300000; // + 5'
	const timeout = moment.utc(time);
  
	const expression = `${timeout.format("s")} ${timeout.format(
	  "m"
	)} ${timeout.format("H")} ${timeout.format("D")} ${timeout.format(
	  "M"
	)} * ${timeout.format("YYYY")}`;
  
	await cronJob.add(
	  `signUp/${email}`,
	  expression,
	  true,
	  verifyUser,
	  timeoutVerifyCode
	);

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
  
	await sendEmail(userDetail.email, subject, content);
  
	return {
	  message: `<h3>The new verification has been sent to ${email}! Please check your inbox!</h3>`,
	};
  };

  export default {
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