const Blog = require('../models/blogs')

const initialBlogs = [
    {
        title: 'Blog 1',
        author: 'Mate Mateson',
        url: 'https://mongoosejs.com/docs/api.html#model_Model.find',
        likes: 4,
        __v: 0,
        user: '5f33c562ffdf7429516430b8'
    },
    {
        title: 'Blog 2',
        author: 'Joe Blogg',
        url: 'https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing',
        likes: 5,
        __v: 0,
        user: '5f33c562ffdf7429516430b8'
    },
    {
        title: 'Blog 3',
        author: 'Mate Mateson',
        url: 'http://localhost:3001/api/asdf',
        likes: 6,
        __v: 0,
        user: '5f33c562ffdf7429516430b8'
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}