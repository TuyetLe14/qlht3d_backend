"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.Review = exports.DetailPayment = exports.ImgHeritage = exports.Heritage = exports.HistoricalEvent = exports.Conservation = exports.Order = exports.Ticket = exports.VerifyCode = exports.User = void 0;
const user_1 = __importDefault(require("./models/user"));
exports.User = user_1.default;
const verifyCode_1 = __importDefault(require("./models/verifyCode"));
exports.VerifyCode = verifyCode_1.default;
const ticket_1 = __importDefault(require("./models/ticket"));
exports.Ticket = ticket_1.default;
const order_1 = __importDefault(require("./models/order"));
exports.Order = order_1.default;
const conservation_1 = __importDefault(require("./models/conservation"));
exports.Conservation = conservation_1.default;
const historicalevent_1 = __importDefault(require("./models/historicalevent"));
exports.HistoricalEvent = historicalevent_1.default;
const heritage_1 = __importDefault(require("./models/heritage"));
exports.Heritage = heritage_1.default;
const imgheritage_1 = __importDefault(require("./models/imgheritage"));
exports.ImgHeritage = imgheritage_1.default;
const detailpayment_1 = __importDefault(require("./models/detailpayment"));
exports.DetailPayment = detailpayment_1.default;
const review_1 = __importDefault(require("./models/review"));
exports.Review = review_1.default;
const payment_1 = __importDefault(require("./models/payment"));
exports.Payment = payment_1.default;
//# sourceMappingURL=index.js.map