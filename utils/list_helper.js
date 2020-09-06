const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    if (!blogs || blogs.length === 0) return 0;
    return blogs.map(blog => blog.likes).reduce((sum, num) => sum + num, 0);
}

const favouriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0) return {};
    return blogs.concat().sort((a, b) => b.likes - a.likes)[0]
}

const mostBlogs = (blogs) => {
    if (!blogs || blogs.length === 0) return {};

    let authorObj = {};
    for (let key in blogs) {
        let author = blogs[key].author
        if (authorObj[author]) authorObj[author]++;
        else authorObj[author] = 1;
    }
    const mostPopularAuthor = Object.keys(authorObj).reduce((a, b) => authorObj[a] > authorObj[b] ? a : b)
    return {
        author: mostPopularAuthor,
        blogs: authorObj[mostPopularAuthor]
    };
}

const mostLikes = (blogs) => {
    if (!blogs || blogs.length === 0) return {};

    let authorObj = {};
    for (let key in blogs) {
        let author = blogs[key].author
        if (authorObj[author]) authorObj[author]+= blogs[key].likes;
        else authorObj[author] = blogs[key].likes;
    }
    const mostPopularAuthor = Object.keys(authorObj).reduce((a, b) => authorObj[a] > authorObj[b] ? a : b)
    return {
        author: mostPopularAuthor,
        likes: authorObj[mostPopularAuthor]
    };
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}