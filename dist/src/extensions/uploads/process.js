"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const crc32_1 = __importDefault(require("crc/crc32"));
const caculate_crc = async (version, chunkSize) => {
    const url = path_1.default.join(__dirname, `../../../public/firmware/${version}`);
    const fileData = fs_1.default.readFileSync(`${url}/firmware.bin`);
    const fileSize = fileData.length;
    const numChunks = Math.ceil(fileSize / chunkSize);
    const crcArray = [];
    // Splitting the file into chunks and calculating CRC32 for each chunk
    for (let i = 0; i < numChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(fileSize, start + chunkSize);
        const chunk = fileData.slice(start, end);
        const crc = (0, crc32_1.default)(chunk).toString(16).toUpperCase();
        // console.log(`Chunk ${i + 1}: CRC32 - ${crc}`)
        crcArray.push(crc);
    }
    const outputFile = path_1.default.join(__dirname, `../../../public/firmware/${version}/metadata.txt`);
    const crcContent = `filesize=${fileSize}\n[crc32]\n${crcArray.join('\n')}\n[/crc32]`;
    await fs_1.default.writeFileSync(outputFile, crcContent);
};
const remove = async (dir) => {
    console.log(dir);
    const url = path_1.default.join(__dirname, `../../../public${dir}`);
    console.log(url);
    fs_1.default.unlink(url, (err) => {
        if (err) {
            console.log(err);
        }
    });
};
exports.default = { remove, caculate_crc };
//# sourceMappingURL=process.js.map