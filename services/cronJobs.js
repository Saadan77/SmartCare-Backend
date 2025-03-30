const cron = require("node-cron");
const { sendWeeklyDiseaseNotification } = require("./diseaseNotificationService");

cron.schedule("0 9 * * 1", async () => {
  console.log("🚀 Running Weekly Disease Notification...");
  await sendWeeklyDiseaseNotification();
});

console.log("✅ Cron Job for Weekly Disease Notification is Set Up!");
