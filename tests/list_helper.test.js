const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes();
        expect(result).toBe(0)
    })
    
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]
    
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    
    const listOfSeveralBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
        
    ]
    
    test('of several blogs', () => {
        const result = listHelper.totalLikes(listOfSeveralBlogs)
        expect(result).toBe(15)
    })
})
describe('favourite blog', () => {
    test('of empty list is zero', () => {
        const result = listHelper.favouriteBlog();
        expect(result).toEqual({})
    })
    
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]
    
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.favouriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })
    
    const listOfSeveralBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 4,
            __v: 0
        },
        {
            _id: '112222111',
            title: 'Blog 2',
            author: 'Joe Blogg',
            url: 'https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing',
            likes: 5,
            __v: 0
        },
        {
            _id: '22232332222',
            title: 'Blog 3',
            author: 'Mate Mateson',
            url: 'http://localhost:3001/api/asdf',
            likes: 6,
            __v: 0
        }
        
    ]
    test('of several blogs', () => {
        const result = listHelper.favouriteBlog(listOfSeveralBlogs)
        expect(result).toEqual(listOfSeveralBlogs[2])
    })
})

describe('most authors', () => {
    test('of empty list is zero', () => {
        const result = listHelper.mostBlogs();
        expect(result).toEqual({})
    })
    
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Mate Mateson',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]
    
    test('one blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        let output = {author: "Mate Mateson", blogs: 1}
        expect(result).toEqual(output)
    })
    
    const listOfSeveralBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Mate Mateson',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 4,
            __v: 0
        },
        {
            _id: '112222111',
            title: 'Blog 2',
            author: 'Joe Blogg',
            url: 'https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing',
            likes: 5,
            __v: 0
        },
        {
            _id: '22232332222',
            title: 'Blog 3',
            author: 'Mate Mateson',
            url: 'http://localhost:3001/api/asdf',
            likes: 6,
            __v: 0
        }
        
    ]
    test('of several blogs', () => {
        const result = listHelper.mostBlogs(listOfSeveralBlogs)
        let output = {author: "Mate Mateson", blogs: 2}
        expect(result).toEqual(output)
    })
})

describe('most likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.mostLikes();
        expect(result).toEqual({})
    })
    
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Mate Mateson',
            post: 'blah blah blah',
            likes: 5,
            __v: 0
        }
    ]
    
    test('one blog', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        let output = {author: "Mate Mateson", likes: 5}
        expect(result).toEqual(output)
    })
    
    const listOfSeveralBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Mate Mateson',
            post: 'blah blah blah',
            likes: 4,
            __v: 0
        },
        {
            _id: '112222111',
            title: 'Blog 2',
            author: 'Joe Blogg',
            post: 'blah blah blah',
            likes: 5,
            __v: 0
        },
        {
            _id: '22232332222',
            title: 'Blog 3',
            author: 'Mate Mateson',
            post: 'blah blah blah',
            likes: 6,
            __v: 0
        }
        
    ]
    test('of several blogs', () => {
        const result = listHelper.mostLikes(listOfSeveralBlogs)
        let output = {author: "Mate Mateson", likes: 10}
        expect(result).toEqual(output)
    })
})