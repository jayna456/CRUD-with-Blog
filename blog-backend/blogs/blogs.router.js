const express = require('express');
const { checkAuthentication } = require('./middleware');
const { createBlog, getBlogs, getSingleBlog, updateSingleBlog, deleteBlog } = require('./blogs.controller');
const router = express.Router();

router.post('/blogs', checkAuthentication, createBlog);
router.get('/blogs', checkAuthentication, getBlogs);
router.get('/blogs/:id', checkAuthentication, getSingleBlog);
router.put('/blogs/:id', checkAuthentication, updateSingleBlog);
router.delete('/blogs/:id', checkAuthentication, deleteBlog);

module.exports = router;