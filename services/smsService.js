const twilio = require("twilio");

// Twilio Credentials from .env file
const accountSid = "AC56fe537cd2155ee6a29c095444879527";
const authToken = "d0e1e69e5b34e566f25d26dec804fc95";
const twilioPhone = +19288625801;

const client = new twilio(accountSid, authToken);

/**
 * Send SMS notification
 * @param {string} to - Recipient phone number (e.g., "+923001234567")
 * @param {string} message - SMS content
 */
const sendSMS = async (to, message) => {
    try {
        await client.messages.create({
            body: message,
            from: twilioPhone,
            to: to,
        });

        console.log(`📲 SMS sent to ${to}`);
    } catch (error) {
        console.error("❌ Error sending SMS:", error.message);
    }
};

module.exports = { sendSMS };
