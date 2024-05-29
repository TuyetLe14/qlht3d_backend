import cron from 'node-cron'

class CronManager {
  private jobs: any
  constructor() {
    this.jobs = {}
  }
  async add(name: string, expression: string, active: boolean, data: object, callback: any) {
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
          timezone: 'Etc/UTC', // "Asia/Ho_Chi_Minh" is not define by typescript
        }
      ),
    }
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

export default cronJob
