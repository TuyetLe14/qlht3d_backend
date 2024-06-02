"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const create = async (data) => {
    const { orderId, pMethod, total } = data;
    const payment = await db_1.Payment.create({
        orderId,
        pMethod,
        total,
        status: 0
    });
    return payment;
};
const update = async (id, data) => {
    console.log("-----------------");
    console.log(data);
    const { orderId, pMethod, total, status } = data;
    const payment = await db_1.Payment.findByPk(id);
    if (!payment) {
        throw new Error("Không tìm thấy thanh toán.");
    }
    let conditions = {};
    if (orderId && pMethod && total && status) {
        conditions["orderId"] = orderId;
        conditions["pMethod"] = pMethod;
        conditions["total"] = total;
        conditions["status"] = status;
        if (status === 1) {
            const detail = await db_1.DetailPayment.create({
                paymentId: payment.id,
                amount: total,
            });
        }
    }
    return payment.update(conditions);
};
const getAll = async () => {
    const payments = await db_1.Payment.findAll();
    return payments;
};
const remove = async (id) => {
    const paymentsDel = await db_1.Payment.findOne({ where: { id } });
    if (!paymentsDel) {
        throw new Error("Không tìm thấy thanh toán.");
    }
    ;
    return await paymentsDel.destroy();
};
exports.default = {
    getAll,
    create,
    update,
    remove,
};
//# sourceMappingURL=payment.js.map