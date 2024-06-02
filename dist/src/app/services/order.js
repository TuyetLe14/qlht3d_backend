"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const create = async (data) => {
    const { ticketId, userId, ticketType } = data;
    const currentDate = new Date();
    const order = await db_1.Order.create({
        ticketId,
        userId,
        orderDate: currentDate,
        ticketType,
        status: 0
    });
    return order;
};
const update = async (id, data) => {
    console.log("-----------------");
    console.log(data);
    const { ticketId, userId, ticketType, status } = data;
    let conditions = {};
    if (ticketId && userId && ticketType && status) {
        conditions["ticketId"] = ticketId;
        conditions["userId"] = userId;
        conditions["ticketType"] = ticketType;
        conditions["status"] = status;
    }
    const order = await db_1.Order.findByPk(id);
    if (!order) {
        throw new Error("Không tìm thấy hoá đơn.");
    }
    return order.update(conditions);
};
const getAll = async () => {
    const orders = await db_1.Order.findAll();
    return orders;
};
const remove = async (id) => {
    const ordersDel = await db_1.Order.findOne({ where: { id } });
    if (!ordersDel) {
        throw new Error("Không tìm thấy hoá đơn.");
    }
    ;
    return await ordersDel.destroy();
};
exports.default = {
    getAll,
    create,
    update,
    remove,
};
//# sourceMappingURL=order.js.map