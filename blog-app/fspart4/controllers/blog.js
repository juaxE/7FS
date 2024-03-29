
const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        url: body.url,
        author: body.author,
        likes: body.likes,
        user: user._id
    })

    try {
        const result = await blog.save()
        user.blogs = user.blogs.concat(blog._id)
        await user.save()
        response.status(201).json(result)
    }
    catch {
        response.status(400).json(result)
    }
})

blogRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    if (user._id.toString() != blog.user._id.toString()) {
        return response.status(401).json({ error: 'Unauthorized action' })
    }
    await Blog.deleteOne(blog._id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        comments: body.comments
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

blogRouter.post('/:id/comments', async (request, response) => {
    const comment = request.body.comment
    const blog = await Blog.findById(request.params.id)

    try {
        blog.comments.push(comment)
        await blog.save()
        response.status(201).json(blog)
    }
    catch {
        response.status(400).json(result)
    }
})

module.exports = blogRouter