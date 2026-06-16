import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Candidate name is required'],
  },
  email: {
    type: String,
    required: [true, 'Candidate email is required'],
    lowercase: true,
  },
  resumeUrl: {
    type: String,
    required: [true, 'Resume link or file path is required'],
  },
  coverLetter: {
    type: String,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location description is required'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Job type is required'],
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      default: 'Full-time',
    },
    salaryRange: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    requirements: {
      type: [String],
      required: [true, 'Requirements list is required'],
    },
    benefits: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applications: [applicationSchema],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
