import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    client: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      default: '3 Months',
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Custom Software', 'Web Development', 'Mobile App Development', 'SaaS Development', 'Cloud Solutions', 'AI Solutions', 'QA Automation Testing'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Project image URL is required'],
    },
    link: {
      type: String,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    stats: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
