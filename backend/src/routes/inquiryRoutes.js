import express from 'express';
import {
  submitInquiry,
  getInquiries,
  updateInquiryStatus,
  submitSubscriber,
  getSubscribers,
} from '../controllers/inquiryController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public contact submission & admin view
router.route('/')
  .post(submitInquiry)
  .get(protect, adminOnly, getInquiries);

// Update status of specific inquiries
router.route('/:id')
  .put(protect, adminOnly, updateInquiryStatus);

// Newsletter subscriptions
router.post('/subscribe', submitSubscriber);
router.get('/subscribers', protect, adminOnly, getSubscribers);

export default router;
