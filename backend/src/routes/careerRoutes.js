import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyJob,
} from '../controllers/careerController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

// Ensure uploads folder exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `resume-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter(req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX resumes are allowed'));
    }
  },
});

const router = express.Router();

router.route('/')
  .get(getJobs)
  .post(protect, adminOnly, createJob);

router.route('/:id')
  .get(getJobById)
  .put(protect, adminOnly, updateJob)
  .delete(protect, adminOnly, deleteJob);

router.post('/:id/apply', upload.single('resume'), applyJob);

export default router;
