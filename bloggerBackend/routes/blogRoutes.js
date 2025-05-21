const express = require('express');
const router = express.Router();
const Blog = require('../models/Blogs');
const upload = require('../middle-ware/uploads');
// Save or update a draft
// Assuming Express + multer for image upload
router.post('/save-draft', upload.single('image'), async (req, res) => {
  try {
    const { title, content, tags, status, createdAt, updatedAt } = req.body;
    const image = req.file ? req.file.filename : null;

    const blog = new Blog({
      title,
      content,
      tags: tags.split(',').map(t => t.trim()),
      status,
      createdAt,
      updatedAt,
      image,
    });

    await blog.save();
    res.status(201).json({ message: 'Draft saved', blog });
  } catch (error) {
    console.error('Error in /save-draft:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// /api/blogs/save-draft
// Publish a blog
router.post('/publish', upload.single('image'), async (req, res) => {
  try {
    // Now req.body and req.file are populated
    const { id, title, content, tags } = req.body;
    const image = req.file ? req.file.filename : null;

    const now = new Date();

    let blog;

    if (id) {
      blog = await Blog.findByIdAndUpdate(id, {
        title,
        content,
        tags: tags.split(',').map(t => t.trim()),
        image,
        status: 'published',
        updatedAt: now,
        publishDate: now,
      }, { new: true });
    } else {
      blog = new Blog({
        title,
        content,
        tags: tags.split(',').map(t => t.trim()),
        image,
        status: 'published',
        createdAt: now,
        updatedAt: now,
        publishDate: now,
      });
      await blog.save();
    }

    res.status(200).json(blog);
  } catch (err) {
    console.error('Error in /publish:', err);
    res.status(500).json({ error: 'Failed to publish blog', details: err.message });
  }
});


// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get blogs' });
  }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

module.exports = router;
