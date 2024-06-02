"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const create = async (data) => {
    const { heritageId, dateCover, dateUncover, personRespon, cost } = data;
    const conservation = await db_1.Conservation.create({
        heritageId,
        dateCover,
        dateUncover,
        personRespon,
        cost
    });
    return conservation;
};
const update = async (id, data) => {
    console.log("-----------------");
    console.log(data);
    const { heritageId, dateCover, dateUncover, personRespon, cost } = data;
    let conditions = {};
    if (heritageId && dateCover && dateUncover && personRespon && cost) {
        conditions["heritageId"] = heritageId;
        conditions["dateCover"] = dateCover;
        conditions["dateUncover"] = dateUncover;
        conditions["personRespon"] = personRespon;
        conditions["cost"] = cost;
    }
    const conservation = await db_1.Conservation.findByPk(id);
    if (!conservation) {
        throw new Error("Không tìm thấy di tích.");
    }
    return conservation.update(conditions);
};
const getAll = async () => {
    const conservations = await db_1.Conservation.findAll();
    return conservations;
};
const remove = async (id) => {
    const conservationDel = await db_1.Conservation.findOne({ where: { id } });
    if (!conservationDel) {
        throw new Error("Không tìm thấy di tích.");
    }
    ;
    return await conservationDel.destroy();
};
exports.default = {
    getAll,
    create,
    update,
    remove,
};
//# sourceMappingURL=conservation.js.map