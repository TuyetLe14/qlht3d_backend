import cron from 'node-cron'
import noti from '../notifications/index'

class CronManager {
  private jobs: any
  constructor() {
    this.jobs = {}
  }
  async add(name: string, expression: string, active: boolean, data: object, callback: any, timezone: any = 'Etc/UTC') {
    if (typeof this.jobs[name] !== 'undefined') {
      this.jobs[name].cron.stop()
      delete this.jobs[name]
    }
    this.jobs[name] = {
      name,
      cron: cron.schedule(
        expression,
        async () => {
          await callback(data)
        },
        {
          scheduled: active,
          timezone: timezone, // "Asia/Ho_Chi_Minh" is not define by typescript
        }
      ),
    }

    await this.start(name)
  }
  async start(name: string) {
    this.jobs[name].cron.start()
  }
  async stop(name: string) {
    this.jobs[name].cron.stop()
  }
  async delete(name: string) {
    if (typeof this.jobs[name] !== 'undefined') {
      this.jobs[name].cron.stop()
      delete this.jobs[name]
    }
  }
  async stopAll() {
    // for (const cron in this.jobs) {
    //   this.jobs[cron].cron.stop()
    // }
  }
  async list() {
    return this.jobs
  }
  async validate(expression: string) {
    return cron.validate(expression)
  }
}

const cronJob = new CronManager()

// async function test() {
//   const name = 'myCronJob';
//   const expression = '*/2 * * * * *';
//   const active = true;
//   const data = { key: 'value' };
//   const callback = async () => {
//     // const registrationToken =
//     //   'eg-7IZxzTamiBCnH-FKuIn:APA91bH_HREV4qbzSAkAPz4MCNs1E_bzKQ_ygU-ZrGT4D6huJg4o7i8E-y7ItLof40lD_yKe4D5FgJe54RtWvv5NrDH7C0SCN7II45sI9I6gwsdpayBgn0g__3S4Dp2-x60oZJbwh-Cg'
//     // await noti.sendNotiToMobile(registrationToken, "noti", "this is noti");

//     mqtt.publish("mp33","asdsadsa",1)
//   };
//   await cronJob.add(name, expression, active, data, callback);
// }

// // Call the test function
// test();

export default cronJob
