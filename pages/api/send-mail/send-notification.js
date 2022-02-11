import sgMail from "@sendgrid/mail";
import emailTeplate from "../../../styles/email-templates/contact-email-template";

// Sign SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  console.log(process.env.NOTIFICATION_MAIL_ADDRESS);
  if (req.method === "POST") {
    const data = req.body;

    // Create email template
    const html = emailTeplate(data);

    // Create email object
    const msg = {
      to: process.env.NOTIFICATION_MAIL_ADDRESS,
      from: process.env.NOTIFICATION_MAIL_ADDRESS,
      subject: data.subject,
      name: "Roundnet France",
      html,
    };

    try {
      await sgMail.send(msg);
      //! FOR TESTING PURPOSES ONLY - Wait for 2 seconds
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      res.status(200).json({
        success: true,
        message: `Votre email a été envoyé ! Nous vous répondrons sous peu.`,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Une erreur est survenue lors de l'envoi du mail. Merci de réessayer",
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
