const contextsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Context = require('../models/context')
const User = require('../models/user')

contextsRouter.get('/', async (request, response, next) => {
    let contexts = await Context
      .find({}).populate('commands', 'command description')
    response.json(contexts)
})

contextsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const context = new Context({
        context: body.context,
        commands: body.commands ? body.commands : []
    })
    const savedContext = await context.save()
    response.status(201).json(savedContext)
})

contextsRouter.delete('/:id', async (request, response) => {
    console.log(request.token)
    if (request.token === null) return response.status(401).json({error: 'Invalid token'})
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const context = await Context.findById(request.params.id)
    if (context.user.toString() === decodedToken.id.toString()) {
        await Context.findByIdAndRemove(request.params.id)
        return response.status(204).end();
    } 
    return response.status(401).json({error: 'Invalid token'})
    
})

contextsRouter.put('/:id', async (request, response) => {
    const updatedContext = await Context.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.json(updatedContext.toJSON())
})

module.exports = contextsRouter
