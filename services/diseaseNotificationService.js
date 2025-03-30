const axios = require("axios");
const { sendEmail } = require("../services/emailService");
const { sendSMS } = require("../services/smsService");

async function getMostWidespreadDisease() {
  try {
    const response = await axios.get("http://localhost:8000/data");
    const diseases = response.data;

    // Find the disease with the highest total cases
    let mostWidespread = diseases.reduce((prev, current) =>
      prev.Total > current.Total ? prev : current
    );

    return mostWidespread;
  } catch (error) {
    console.error("❌ Error fetching disease data:", error);
    return null;
  }
}

function getPreventiveMessage(diseaseName) {
  switch (diseaseName.toLowerCase()) {
    case "malaria":
      return `
          <b>Preventive Measures of Malaria</b><br>
          Avoid unsafe blood transfusion, use only sterile disposable syringes, and use mosquito repellents to stay safe from malaria.<br><br>
          <b>ملیریا سے بچاؤ کی تدابیر</b><br>
          غیر محفوظ خون کی منتقلی سے گریز کریں، صرف جراثیم سے پاک سرنج کا استعمال کریں، اور مچھر بھگانے والی ادویات استعمال کریں۔
        `;
    case "b. diarrhea":
      return `
          <b>Preventive Measures of Diarrhea</b><br>
          Diarrhea caused by medical conditions cannot be avoided, yet bacterial or infectious diarrhea can be prevented. You may avoid it by:<br>
          - Maintaining good hygiene by washing hands regularly<br>
          - Drinking pure water and staying hydrated<br>
          - Eating thoroughly cleaned fruits and vegetables<br>
          - Eating cooked chicken, meat, and other poultry foods<br><br>
          <b>ڈائریا سے بچاؤ کی تدابیر</b><br>
          طبی حالات کی وجہ سے ہونے والی ڈائریا سے بچاؤ ممکن نہیں، لیکن بیکٹیریا یا انفیکشن سے ہونے والی ڈائریا سے بچاؤ ممکن ہے۔<br>
          - ہاتھ دھونے کی اچھی عادت اپنائیں<br>
          - صاف پانی پیئیں اور ہائیڈریٹ رہیں<br>
          - اچھی طرح دھوئے ہوئے پھل اور سبزیاں کھائیں<br>
          - مکمل پکی ہوئی مرغی، گوشت اور دیگر کھانے کھائیں۔
        `;
    case "typhoid":
      return `
          <b>Preventive Measures of Typhoid</b><br>
          Vaccination is the only long-term measure to prevent typhoid. Two vaccines, namely <b>Ty21a</b> and <b>Vi polysaccharide capsular vaccine</b>, are scientifically proven to be effective.<br><br>
          <b>ٹائیفائیڈ سے بچاؤ کی تدابیر</b><br>
          ٹائیفائیڈ سے بچاؤ کا واحد طویل مدتی طریقہ ویکسینیشن ہے۔ دو ویکسینز <b>Ty21a</b> اور <b>Vi polysaccharide capsular vaccine</b> کو مؤثر ثابت کیا گیا ہے۔
        `;
    case "dengue":
      return `
          <b>Preventive Measures of Dengue Fever</b><br>
          The most effective way to prevent dengue is by avoiding mosquito bites. A vaccine is available for people aged 9-45 years. Reducing mosquito populations, inhibiting their breeding, and wearing protective clothing are key prevention steps. Staying in well-screened places and using mosquito repellents is also recommended.<br><br>
          <b>ڈینگی سے بچاؤ کی تدابیر</b><br>
          ڈینگی سے بچاؤ کا سب سے مؤثر طریقہ مچھروں کے کاٹنے سے بچنا ہے۔ ایک ویکسین دستیاب ہے جو 9 سے 45 سال کے افراد کے لیے منظور شدہ ہے۔ مچھروں کی آبادی کو کم کرنا، ان کی افزائش کو روکنا، اور حفاظتی لباس پہننا اہم اقدامات ہیں۔ مچھر بھگانے والی ادویات کا استعمال بھی تجویز کیا جاتا ہے۔
        `;
    default:
      return `
          Stay safe and take necessary precautions!<br><br>
          <b>محفوظ رہیں اور ضروری احتیاطی تدابیر اختیار کریں!</b>
        `;
  }
}

async function sendWeeklyDiseaseEmail() {
  const disease = await getMostWidespreadDisease();
  if (!disease) {
    console.error("No disease data available to send email.");
    return;
  }

  const emailRecipients = ["saadanjawad50@gmail.com"];
  const preventiveMessage = getPreventiveMessage(disease.Diseases);
  const subject = `🦠 Weekly Health Alert: ${disease.Diseases} in Pakistan`;
  const htmlContent = `
      <p>This week's most widespread disease is <b>${disease.Diseases}</b>.</p>
      <p>📊 Reported Cases: ${disease.Total}</p>
      ${preventiveMessage}
    `;

  try {
    for (const email of emailRecipients) {
      await sendEmail(email, subject, htmlContent);
    }
    console.log("✅ Weekly Disease Email Sent!");
  } catch (error) {
    console.error("❌ Error sending weekly disease email:", error.message);
  }
}

async function sendWeeklyDiseaseSMS(disease) {
  const phoneNumbers = ["+923213101228"];

  const preventiveMessage = getPreventiveMessage(disease.Diseases);
  const message = `🦠 Health Alert! Most widespread disease this week: ${disease.Diseases}. Cases: ${disease.Total}. ${preventiveMessage}`;

  try {
    for (const number of phoneNumbers) {
      await sendSMS(number, message);
    }
    console.log("✅ Weekly Disease SMS Sent!");
  } catch (error) {
    console.error("❌ Error sending weekly disease SMS:", error);
  }
}

async function sendWeeklyDiseaseNotification() {
  const disease = await getMostWidespreadDisease();
  if (!disease) {
    console.error("❌ No disease data available!");
    return;
  }

  await sendWeeklyDiseaseEmail(disease);
  await sendWeeklyDiseaseSMS(disease);
}

module.exports = { sendWeeklyDiseaseNotification };
