const CronJob = require("cron").CronJob;
const { backupLog } = require("./log");

const job = new CronJob(
  "0 0 * * *",
  () => {
    backupLog();
  },
  null,
  false,
  "Europe/Bucharest"
);

module.exports = job;