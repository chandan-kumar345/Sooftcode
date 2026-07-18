import Blog from '../models/Blog.js';

// @desc    Get all blog posts (with pagination, filters, and searches)
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res, next) => {
  try {
    const { category, tag, search, page = 1, limit = 10 } = req.query;
    const query = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tags = tag;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const skipIndex = (page - 1) * limit;
    
    const totalBlogs = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .limit(Number(limit))
      .skip(skipIndex);

    res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
    res.json({
      success: true,
      count: blogs.length,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: Number(page),
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    
    if (!blog) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    res.set('Cache-Control', 'public, max-age=60, s-maxage=60');
    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private (Admin Only)
export const createBlog = async (req, res, next) => {
  try {
    const { title, content, excerpt, coverImage, tags, category, author, readTime } = req.body;
    
    // Auto-generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const slugExists = await Blog.findOne({ slug });
    if (slugExists) {
      res.status(400);
      throw new Error('A blog post with a similar title already exists');
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags,
      category,
      author,
      readTime,
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private (Admin Only)
export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    // Handle title update and slug recalculation
    if (req.body.title && req.body.title !== blog.title) {
      const slug = req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
        
      const slugExists = await Blog.findOne({ slug, _id: { $ne: req.params.id } });
      if (slugExists) {
        res.status(400);
        throw new Error('A blog post with a similar title already exists');
      }
      req.body.slug = slug;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin Only)
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404);
      throw new Error('Blog post not found');
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Blog post removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
