"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const create = async (data) => {
    const { heritageId, eventName, eventDate, description } = data;
    const historical = await db_1.HistoricalEvent.create({
        heritageId,
        eventName,
        eventDate,
        description,
    });
    return historical;
};
const update = async (id, data) => {
    console.log("-----------------");
    console.log(data);
    const { heritageId, eventName, eventDate, description } = data;
    let conditions = {};
    if (heritageId && eventName && eventDate && description) {
        conditions["heritageId"] = heritageId;
        conditions["eventName"] = eventName;
        conditions["eventDate"] = eventDate;
        conditions["description"] = description;
    }
    const historical = await db_1.HistoricalEvent.findByPk(id);
    if (!historical) {
        throw new Error("Không tìm thấy di tích.");
    }
    return historical.update(conditions);
};
const getAll = async () => {
    const historicals = await db_1.HistoricalEvent.findAll();
    return historicals;
};
const remove = async (id) => {
    const historicalDel = await db_1.HistoricalEvent.findOne({ where: { id } });
    if (!historicalDel) {
        throw new Error("Không tìm thấy di tích.");
    }
    ;
    return await historicalDel.destroy();
};
exports.default = {
    getAll,
    create,
    update,
    remove,
};
//# sourceMappingURL=historicalevent.js.map