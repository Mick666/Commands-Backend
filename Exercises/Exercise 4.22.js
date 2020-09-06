const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')

let token

beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    
    const response = await api
    .post('/api/login')
    .send({
        username: 'root',
        name: 'root',
        password: 'password'
    })

    token = response.body.token
})

describe('Initial tests', () => {
    xtest('notes are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    
    xtest('all notes are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
    xtest('returned items have an id property', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            expect(blog).toEqual(expect.objectContaining({
                id: expect.any(String)
            }))
        })
    })
})


describe('Blog post related tests', () => {
    xtest('can add a new blog post', async () => {
        const newBlogPost = new Blog({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
        })
        const response = await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogPost)

        let blogList = await Blog.find({})
        blogList = blogList.map(note => note.toJSON());
        
        expect(blogList).toEqual(expect.arrayContaining([response.body]))
    })
    
    

    xtest('likes field has a default value', async () => {
        const newBlogPost = new Blog({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        })
        const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogPost);
        let newBlog = await Blog.find({title: 'Go To Statement Considered Harmful'})
        newBlog = newBlog.map(note => note.toJSON());
        
        expect(newBlog[0]).toEqual(expect.objectContaining({likes: "0"}))
    })
    

    xtest('missing fields from a blog post results in a 400 error', async () => {
        const newBlogPost = new Blog({
            title: 'Go To Statement Considered Harmful',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2
        })
        await api
            .post('/api/blogs')
            .send(newBlogPost)
            .expect(400)
    })

    xtest('can delete a blog post', async () => {
        const blogID = await helper.blogsInDb()
        await api
            .delete(`/api/blogs/${blogID[0].id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
    })

    test('can update a blog post', async () => {
        const blogID = await helper.blogsInDb()
        const newLikes = {
            "likes": 99
        }
        const updatedBlog = await api
            .put(`/api/blogs/${blogID[0].id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(newLikes)
        const blogCheck = await Blog.findById(blogID[0].id)
        expect(blogCheck.likes).toEqual("99")
    })
})



afterAll(() => {
    mongoose.connection.close()
}) 