const blogs = require('./blogs.model');
const user = require('../user/user.model');

const createBlog = async (req,res) => {
    try {        
        if (req.user) {
            let newBlog = new blogs();
            newBlog.title = req.body.title;
            newBlog.description = req.body.description;
            newBlog.author = req.user._id;
            const storedBlog = await newBlog.save();
            if (storedBlog) {
                res.json({
                    code: 200,
                    status: 'success',
                    data: storedBlog
                })
            } else {
                res.json({
                    code: 403,
                    status: 'err',
                    message: "Something went wrong!"
                })
            }
        }
    } catch (error) {
        res.json({
            code: 500,
            status: 'error',
            error: error.toString()
        })
    }
}

const getBlogs = async (req,res) => {
    try {
        if (req.user) {
            const availableBlogs = await blogs.find();
            const userBLogs = availableBlogs?.filter(({author}) => author.toString() === req.user._id);
            res.json({
                code: 200,
                status: 'success',
                data: userBLogs
            })
        }
    } catch (error) {
        res.json({
            code: 500,
            status: 'error',
            error: error.toString()
        })
    }
}

const getSingleBlog = async (req,res) => {
    try {        
        const singleBlog = await blogs.findById({ _id: req.params.id });
        if (singleBlog) {
            res.json({
                code: 200,
                status: 'success',
                data: singleBlog
            })
        } else {
            res.json({
                code: 403,
                status: 'error',
                message: 'something went wrong!'
            })
        }
    } catch (error) {
        res.json({
            code: 500,
            status: 'error',
            error: error.toString()
        })
    }
}

const updateSingleBlog = async (req,res) => {
    try {
        const singleBlog = await blogs.findById({ _id: req.body.id });
        if (singleBlog) {
            const fieldToUpdate = {
                title: req.body.title,
                description: req.body.description
            }
            const updatedValue = await blogs.findByIdAndUpdate({_id: singleBlog._id }, fieldToUpdate, {new:true});
            if (updatedValue) {
                res.json({
                    code: 200,
                    status: 'success',
                    data: updatedValue
                })
            } else {
                res.json({
                    code: 403,
                    status: 'error',
                    message: 'someting went wrong!'
                })
            }
        }
    } catch (error) {
        res.json({
            code: 500,
            status: 'error',
            error: error.toString()
        })
    }
}

const deleteBlog = async (req,res) => {
    try {
        const updatedValue = await blogs.findByIdAndDelete({_id: req.params.id }, {new:true});
        if (updatedValue) {
            res.json({
                code: 200,
                status: 'success',
                data: updatedValue
            })
        } else {
            res.json({
                code: 403,
                status: 'error',
                message: 'someting went wrong!'
            })
        }
    } catch (error) {
        res.json({
            code: 500,
            status: 'error',
            error: error.toString()
        })
    }
}

module.exports = { createBlog, getBlogs, getSingleBlog, updateSingleBlog, deleteBlog };