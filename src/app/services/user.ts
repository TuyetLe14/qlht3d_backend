import { User} from "../../db";
import { logger } from "../../extensions/logger/logger";
import { Op, where } from 'sequelize';
import { hashSync, genSaltSync, compareSync } from "bcrypt";

const get = async (userId: number) => {
	const user = await User.findOne({ where: { id: userId } });
	if (!user) {
		throw new Error("Không tìm thấy user.");
	}
	const extractedData = {
		id: user.id,
		email: user.email,
		name: user.name,
		phoneNumber: user.phoneNumber,
		group: user.group,
	};
	return extractedData;
};

const getAll = async () => {
	const user = await User.findAll();
	if (!user) {
		throw new Error("Không tìm thấy user.");
	}
	const keysToRemove = [
		"password",
		"active",
		"createdAt",
		"updatedAt",
		"avatar",
	];

	// Use map to create a new array with the specified keys removed from each object
	const newArray = user.map((item) => {
		// Create a new object by spreading the original object
		const newObj = { ...item.dataValues };

		// Remove the specified keys
		keysToRemove.forEach((key) => delete newObj[key]);

		return newObj;
	});
	console.log(newArray);
	return newArray;
};

const getAllAgent = async () => {
	const user = await User.findAll({
		where: {
		  [Op.or]: [
			{ group: 'Employee' },
			{ group: 'Admin' }
		  ]
		}
	  });
	if (!user) {
		throw new Error("Không tìm thấy user.");
	}
	const keysToRemove = [
		"password",
		"createdAt",
		"updatedAt",
		"avatar",
	];

	// Use map to create a new array with the specified keys removed from each object
	const newArray = user.map((item) => {
		// Create a new object by spreading the original object
		const newObj = { ...item.dataValues };

		// Remove the specified keys
		keysToRemove.forEach((key) => delete newObj[key]);

		return newObj;
	});
	console.log(newArray);
	return newArray;
};

const getAllUser = async () => {
	const user = await User.findAll({
		where: {
			group: 'User',
		}
	  });''
	if (!user) {
		throw new Error("Không tìm thấy user.");
	}
	const keysToRemove = [
		"password",
		"createdAt",
		"updatedAt",
		"avatar",
	];

	// Use map to create a new array with the specified keys removed from each object
	const newArray = user.map((item) => {
		// Create a new object by spreading the original object
		const newObj = { ...item.dataValues };

		// Remove the specified keys
		keysToRemove.forEach((key) => delete newObj[key]);

		return newObj;
	});
	console.log(newArray);
	return newArray;
};

const createAgent = async (data: any) => {
	const { password, email, phoneNumber, name, avatar, active, group} = data;
  
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
	  group,
	  active: true,
	});
  
	return { id: userDetail.id, email, phoneNumber: phoneNumber || "", group, active };
  };

const update = async (userId: number, data: any) => {
	const { name, phoneNumber, group, password,email } = data;
	const user = await User.findOne({ where: { id: userId } });
	
	if (!user) {
		throw new Error("Không tìm thấy user.");
	}

	await user.update({  name,phoneNumber, password, email,group});
	return {
		name: user.name,
		phoneNumber: user.phoneNumber,
		email:user.email,
		group:user.group,
		password:user.password,
		
	};
};

const updateAgent = async (userId: number, data: any) => {
	const { name, phoneNumber, group, password,email } = data;
	const user = await User.findOne({ where: { id: userId } });
	
	console.log(data);
	if (!user) {
		throw new Error("Không tìm thấy user.");
	}

	await user.update({ name,phoneNumber, password, email,group });
	return {
		name: user.name,
		phoneNumber: user.phoneNumber,
		email:user.email,
		group:user.group,
		password:user.password,
	};
};


const remove = async (userId: number) => {
	console.log(userId);
	const userDetail = await User.findOne({ where: { id: userId } });
	if (!userDetail) {
		throw new Error("Không tìm thấy người dùng");
	}

	await userDetail.destroy();
	return userDetail;
};

const listGroup = async () => {
	const groups = ["User", "Admin", "Employee"];

	return groups;
};


export default {
	get,
	getAll,
	update,
	remove,
	listGroup,
	createAgent,
	getAllAgent,
	getAllUser,
	updateAgent,
};
