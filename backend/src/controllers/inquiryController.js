import Inquiry from '../models/Inquiry.js';
import Subscriber from '../models/Subscriber.js';

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
