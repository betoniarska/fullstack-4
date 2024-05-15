const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })


blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
  
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  })


  blogsRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id;

    try {  
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return response.status(404).json({ error: 'Blog not found' });
        }
        response.status(204).end();
        
    } catch (error) {
        next(error);
    }
});



module.exports = blogsRouter