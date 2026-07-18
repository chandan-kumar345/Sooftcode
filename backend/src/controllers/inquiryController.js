import Inquiry from '../models/Inquiry.js';
import Subscriber from '../models/Subscriber.js';
import sendEmail from '../utils/sendEmail.js';

// HTML Email template for Admin Notification
const getAdminNotificationTemplate = (name, email, subject, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Consultation Lead</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F1F5F9; color: #0F172A; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(15, 23, 42, 0.05); border: 1px solid rgba(15, 23, 42, 0.08); }
        .header { background: linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%); color: #FFFFFF; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; }
        .content { padding: 30px 20px; }
        .lead-detail { margin-bottom: 20px; border-bottom: 1px solid #E2E8F0; padding-bottom: 15px; }
        .lead-detail:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .label { font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 5px; letter-spacing: 0.5px; }
        .value { font-size: 15px; color: #0F172A; line-height: 1.5; }
        .message-box { background-color: #F8FAFC; border-left: 4px solid #4A00E0; padding: 15px; border-radius: 4px; font-style: italic; white-space: pre-wrap; }
        .footer { background-color: #F8FAFC; padding: 20px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Consultation Lead</h1>
          <p>A user has submitted a consultation inquiry on Sooftcode</p>
        </div>
        <div class="content">
          <div class="lead-detail">
            <div class="label">Lead Name</div>
            <div class="value">${name}</div>
          </div>
          <div class="lead-detail">
            <div class="label">Corporate Email</div>
            <div class="value"><a href="mailto:${email}" style="color: #4A00E0; text-decoration: none;">${email}</a></div>
          </div>
          <div class="lead-detail">
            <div class="label">Inquiry Subject</div>
            <div class="value" style="font-weight: 600;">${subject}</div>
          </div>
          <div class="lead-detail">
            <div class="label">Project Description & Goals</div>
            <div class="value message-box">${message}</div>
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Sooftcode Enterprise Systems. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};

// HTML Email template for Customer Confirmation
const getCustomerConfirmationTemplate = (name, subject, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Consultation Scoping Initiated</title>
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F1F5F9; color: #0F172A; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(15, 23, 42, 0.05); border: 1px solid rgba(15, 23, 42, 0.08); }
        .header { background: linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%); color: #FFFFFF; padding: 35px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; }
        .content { padding: 30px 25px; line-height: 1.6; font-size: 15px; }
        .salutation { font-size: 18px; font-weight: 700; color: #0F172A; margin-bottom: 15px; }
        .body-text { color: #334155; margin-bottom: 25px; }
        .quote-title { font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px; }
        .message-quote { background-color: #F8FAFC; border-left: 4px solid #8E2DE2; padding: 15px; border-radius: 4px; font-style: italic; color: #475569; margin-bottom: 30px; white-space: pre-wrap; }
        .btn-container { text-align: center; margin-bottom: 30px; }
        .btn { display: inline-block; background: linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%); color: #FFFFFF !important; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(74, 0, 224, 0.2); }
        .footer { background-color: #F8FAFC; padding: 20px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Consultation Initiated</h1>
          <p>We've received your project scoping request</p>
        </div>
        <div class="content">
          <div class="salutation">Hello ${name},</div>
          <div class="body-text">
            Thank you for reaching out to Sooftcode. We have successfully received your consultation inquiry regarding <strong>"${subject}"</strong>.
            <br><br>
            A Senior Consulting Advisor is currently reviewing your project scoping details. We will contact you within 24 business hours to discuss your engineering goals and outline a roadmap.
          </div>
          
          <div class="quote-title">Summary of Your Inquiry</div>
          <div class="message-quote">${message}</div>
          
          <div class="btn-container">
            <a href="https://sooftcode.com" class="btn">Visit Our Website</a>
          </div>
        </div>
        <div class="footer">
          This is an automated notification confirming your project scoping request. Please do not reply directly to this email.<br><br>
          &copy; ${new Date().getFullYear()} Sooftcode. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};

// @desc    Submit a contact inquiry
// @route   POST /api/inquiries
// @access  Public
export const submitInquiry = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error('All fields are required');
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      subject,
      message,
    });

    // Send email notifications (fire-and-forget, don't block response)
    const adminEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || 'sooftcode@gmail.com';
    
    // 1. Send Lead notification to Admin
    try {
      const adminSubject = `[New Consultation Lead] ${subject}`;
      const adminText = `New Consultation Lead\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
      const adminHtml = getAdminNotificationTemplate(name, email, subject, message);

      sendEmail({
        to: adminEmail,
        subject: adminSubject,
        text: adminText,
        html: adminHtml,
      }).catch(err => console.error('[Inquiry] Admin email notification failed:', err.message));
    } catch (emailErr) {
      console.error('[Inquiry] Admin email setup error:', emailErr.message);
    }

    // 2. Send Confirmation to Customer
    try {
      const customerSubject = `Consultation Scoping Initiated - Sooftcode`;
      const customerText = `Hello ${name},\n\nThank you for reaching out to Sooftcode. We have successfully received your consultation inquiry regarding "${subject}".\n\nA Senior Consulting Advisor is currently reviewing your project scoping details. We will contact you within 24 business hours to discuss your engineering goals and outline a roadmap.\n\nSummary of Your Inquiry:\n${message}\n\nBest regards,\nSooftcode Team`;
      const customerHtml = getCustomerConfirmationTemplate(name, subject, message);

      sendEmail({
        to: email,
        subject: customerSubject,
        text: customerText,
        html: customerHtml,
      }).catch(err => console.error('[Inquiry] Customer confirmation email failed:', err.message));
    } catch (emailErr) {
      console.error('[Inquiry] Customer confirmation setup error:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. We will get back to you shortly.',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private (Admin Only)
export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private (Admin Only)
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      res.status(404);
      throw new Error('Inquiry not found');
    }

    inquiry.status = status || inquiry.status;
    await inquiry.save();

    res.json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Subscribe to newsletter
// @route   POST /api/inquiries/subscribe
// @access  Public
export const submitSubscriber = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400);
      throw new Error('Email is required');
    }

    // Check if email already registered
    const exists = await Subscriber.findOne({ email: email.toLowerCase() });
    if (exists) {
      if (!exists.isActive) {
        exists.isActive = true;
        await exists.save();
        return res.status(200).json({
          success: true,
          message: 'Welcome back! Your subscription is active again.',
        });
      }
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed to our newsletter.',
      });
    }

    await Subscriber.create({ email: email.toLowerCase() });

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all newsletter subscribers
// @route   GET /api/inquiries/subscribers
// @access  Private (Admin Only)
export const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    next(error);
  }
};
