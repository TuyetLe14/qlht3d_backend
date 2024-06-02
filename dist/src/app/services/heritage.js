"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const create = async (data) => {
    const { name, description, address, location, establishmentDate, recognitionDate, status } = data;
    const heritage = await db_1.Heritage.create({
        name,
        description,
        address,
        location,
        establishmentDate,
        recognitionDate,
        status
    });
    return heritage;
};
const update = async (id, data) => {
    console.log("-----------------");
    console.log(data);
    const { name, description, address, location, establishmentDate, recognitionDate, status } = data;
    let conditions = {};
    if (name && description && address && location && establishmentDate && recognitionDate && status) {
        conditions["name"] = name;
        conditions["description"] = description;
        conditions["address"] = address;
        conditions["location"] = location;
        conditions["establishmentDate"] = establishmentDate;
        conditions["recognitionDate"] = recognitionDate;
        conditions["status"] = status;
    }
    const heritage = await db_1.Heritage.findByPk(id);
    if (!heritage) {
        throw new Error("Không tìm thấy di tích.");
    }
    return heritage.update(conditions);
};
const getAll = async () => {
    const heritages = await db_1.Heritage.findAll();
    return heritages;
};
const remove = async (id) => {
    const heritagesDel = await db_1.Heritage.findOne({ where: { id } });
    if (!heritagesDel) {
        throw new Error("Không tìm thấy di tích.");
    }
    ;
    return await heritagesDel.destroy();
};
exports.default = {
    getAll,
    create,
    update,
    remove,
};
//# sourceMappingURL=heritage.js.map