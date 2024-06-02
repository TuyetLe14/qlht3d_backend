"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (...args) => {
    return async (req, res, next) => {
        try {
            const ret = args.some((role) => role === req.user.group);
            if (ret) {
                next();
            }
            else {
                res.status(403).json({ message: 'Forbidden' });
            }
        }
        catch (err) {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
};
//# sourceMappingURL=permission.js.map