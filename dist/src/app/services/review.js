"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const create = async (data) => {
    const { heritageId, userId, rating, content } = data;
    const currentDate = new Date();
    const review = await db_1.Review.create({
        heritageId,
        userId,
        dateComment: currentDate,
        rating,
        content
    });
    return review;
};
const update = async (id, data) => {
    console.log("-----------------");
    console.log(data);
    const { heritageId, userId, rating, content } = data;
    let conditions = {};
    if (heritageId && userId && rating && content) {
        conditions["heritageId"] = heritageId;
        conditions["userId"] = userId;
        conditions["rating"] = rating;
        conditions["content"] = content;
    }
    const review = await db_1.Review.findByPk(id);
    if (!review) {
        throw new Error("Không tìm thấy di tích.");
    }
    return review.update(conditions);
};
const getAll = async () => {
    const reviews = await db_1.Review.findAll();
    return reviews;
};
const remove = async (id) => {
    const reviewsDel = await db_1.Review.findOne({ where: { id } });
    if (!reviewsDel) {
        throw new Error("Không tìm thấy di tích.");
    }
    ;
    return await reviewsDel.destroy();
};
exports.default = {
    getAll,
    create,
    update,
    remove,
};
//# sourceMappingURL=review.js.map