import Job from '../models/Job.js';

// @desc    Get all active job listings
// @route   GET /api/careers
// @access  Public
export const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });

    res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job by ID
// @route   GET /api/careers/:id
// @access  Public
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job || !job.isActive) {
      res.status(404);
      throw new Error('Job listing not found or inactive');
    }

    res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a job listing
// @route   POST /api/careers
// @access  Private (Admin Only)
export const createJob = async (req, res, next) => {
  try {
    const { title, department, location, type, salaryRange, description, requirements, benefits } = req.body;

    const job = await Job.create({
      title,
      department,
      location,
      type,
      salaryRange,
      description,
      requirements,
      benefits,
    });

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a job listing
// @route   PUT /api/careers/:id
// @access  Private (Admin Only)
export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error('Job listing not found');
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job listing
// @route   DELETE /api/careers/:id
// @access  Private (Admin Only)
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      res.status(404);
      throw new Error('Job listing not found');
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Job listing deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Apply for a job listing
// @route   POST /api/careers/:id/apply
// @access  Public
export const applyJob = async (req, res, next) => {
  try {
    const { name, email, coverLetter } = req.body;
    let resumeUrl = req.body.resumeUrl;

    const job = await Job.findById(req.params.id);
    if (!job || !job.isActive) {
      res.status(404);
      throw new Error('Job posting is closed or does not exist');
    }

    // Check if resume file was uploaded via Multer
    if (req.file) {
      resumeUrl = `/uploads/${req.file.filename}`;
    }

    if (!name || !email || !resumeUrl) {
      res.status(400);
      throw new Error('Name, Email, and Resume are required');
    }

    // Add candidate application to listing
    job.applications.push({
      name,
      email,
      resumeUrl,
      coverLetter,
    });

    await job.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Our talent acquisition team will review your profile.',
    });
  } catch (error) {
    next(error);
  }
};
