import nodemailer from 'nodemailer';
import logger from './logger.js';

/**
 * sendEmail
 * Sends an email using SMTP credentials if configured, otherwise logs details to server console.
 * @param {Object} options - Email options { to, subject, text, html }
 */
const sendEmail = async (options) => {
  // Check if SMTP configurations are set in environment
  const hasSmtpConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

  if (!hasSmtpConfig) {
    logger.warn('[Email Service] WARNING: SMTP credentials are not fully configured in environment variables.');
    logger.info(`[Email Service] Mock Send to: ${options.to} | Subject: ${options.subject}`);
    logger.debug(`[Email Service] Mock Body:\n${options.text}`);
    return { mock: true, message: 'Email logged in console because SMTP is not configured.' };
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send mail
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'Sooftcode Leads'}" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    logger.info(`[Email Service] Email sent successfully to ${options.to}: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`[Email Service] Failed to send email to ${options.to}: ${error.message}`);
    throw error;
  }
};

export default sendEmail;
