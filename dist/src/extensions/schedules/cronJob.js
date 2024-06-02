"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
class CronManager {
    constructor() {
        this.jobs = {};
    }
    async add(name, expression, active, data, callback) {
        if (typeof this.jobs[name] !== 'undefined') {
            this.jobs[name].cron.stop();
            delete this.jobs[name];
        }
        this.jobs[name] = {
            name,
            cron: node_cron_1.default.schedule(expression, async () => {
                await callback(data);
            }, {
                scheduled: active,
                timezone: 'Etc/UTC', // "Asia/Ho_Chi_Minh" is not define by typescript
            }),
        };
    }
    async start(name) {
        this.jobs[name].cron.start();
    }
    async stop(name) {
        this.jobs[name].cron.stop();
    }
    async delete(name) {
        if (typeof this.jobs[name] !== 'undefined') {
            this.jobs[name].cron.stop();
            delete this.jobs[name];
        }
    }
    async stopAll() {
        // for (const cron in this.jobs) {
        //   this.jobs[cron].cron.stop()
        // }
    }
    async list() {
        return this.jobs;
    }
    async validate(expression) {
        return node_cron_1.default.validate(expression);
    }
}
const cronJob = new CronManager();
exports.default = cronJob;
//# sourceMappingURL=cronJob.js.map