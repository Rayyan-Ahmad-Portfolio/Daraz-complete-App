import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  data: Record<string, any>
) => {
  try {
    const templatePath = path.join(__dirname, "../views", templateName);
    const html = await ejs.renderFile(templatePath, data);

    await transporter.sendMail({
      from: `"Daraz Admin" <${process.env.ADMIN_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ Email (${templateName}) sent successfully to: ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};