"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const uploads_1 = __importDefault(require("../../extensions/uploads"));
const create = async (file, data) => {
    const { heritageId, description } = data;
    if (!file) {
        throw new Error('No file uploaded');
    }
    const img = await db_1.ImgHeritage.findOne({ where: { heritageId } });
    if (img) {
        await uploads_1.default.process.remove(`/img/${file.filname}`);
        throw new Error("");
    }
    await uploads_1.default.process.caculate_crc(heritageId, 2048);
    return await db_1.ImgHeritage.create({
        heritageId,
        url: `/imgs/${file.filename}`,
        description,
    });
};
const update = async (id, file, data) => {
    const { heritageId, description } = data;
    const img = await db_1.ImgHeritage.findOne({ where: { heritageId } });
    if (!img) {
        throw new Error('Heritage image not found');
    }
    if (file) {
        // Remove the old file if a new file is uploaded
        await uploads_1.default.process.remove(img.url);
        // Update the image URL with the new file
        img.url = `/imgs/${file.filename}`;
    }
    if (description) {
        img.description = description;
    }
    await uploads_1.default.process.caculate_crc(heritageId, 2048);
    return await img.save();
};
const remove = async (id) => {
    const img = await db_1.ImgHeritage.findOne({ where: { id } });
    if (!img) {
        throw new Error('Heritage image not found');
    }
    // Remove the file from the file system
    await uploads_1.default.process.remove(img.url);
    // Remove the entry from the database
    return await img.destroy();
};
const getAll = async () => {
    return await db_1.ImgHeritage.findAll();
};
exports.default = {
    create,
    update,
    remove,
    getAll
};
//# sourceMappingURL=imgheritage.js.map