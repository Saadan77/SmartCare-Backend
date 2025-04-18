const cron = require("node-cron");
const {
  sendWeeklyDiseaseNotification,
  sendPredictedDiseaseNotification,
} = require("./diseaseNotificationService");

// Run every Sunday at 9 AM
cron.schedule("0 9 * * 0", async () => {
  console.log("🔔 Sending Weekly Predicted Disease Notification...");
  await sendPredictedDiseaseNotification();
});

cron.schedule("0 9 * * 1", async () => {
  console.log("🚀 Running Weekly Disease Notification...");
  await sendWeeklyDiseaseNotification();
});

console.log("✅ Cron Job for Weekly Disease Notification is Set Up!");
