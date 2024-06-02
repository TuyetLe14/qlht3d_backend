"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const create = async (data) => {
    const { heritageId, typeTicket, price, timeStart, timeEnd } = data;
    const ticket = await db_1.Ticket.create({
        heritageId,
        typeTicket,
        price,
        timeStart,
        timeEnd
    });
    return ticket;
};
const update = async (id, data) => {
    console.log("-----------------");
    console.log(data);
    const { heritageId, typeTicket, price, timeStart, timeEnd } = data;
    let conditions = {};
    if (heritageId && typeTicket && price && timeStart && timeEnd) {
        conditions["heritageId"] = heritageId;
        conditions["typeTicket"] = typeTicket;
        conditions["price"] = price;
        conditions["timeStart"] = timeStart;
        conditions["timeEnd"] = timeEnd;
    }
    const ticket = await db_1.Ticket.findByPk(id);
    if (!ticket) {
        throw new Error("Không tìm thấy di tích.");
    }
    return ticket.update(conditions);
};
const getAll = async () => {
    const tickets = await db_1.Ticket.findAll();
    return tickets;
};
const remove = async (id) => {
    const ticketsDel = await db_1.Ticket.findOne({ where: { id } });
    if (!ticketsDel) {
        throw new Error("Không tìm thấy di tích.");
    }
    ;
    return await ticketsDel.destroy();
};
exports.default = {
    getAll,
    create,
    update,
    remove,
};
//# sourceMappingURL=ticket.js.map