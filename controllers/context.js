const contextsRouter = require('express').Router()
const Context = require('../models/context')

contextsRouter.get('/', async (request, response, next) => {
    let contexts = await Context
      .find({}).populate('commands', 'command description')
    response.json(contexts)
})


contextsRouter.get('/:id', async (request, response, next) => {
    console.log(request.params)
    let context = await Context.findById(request.params.id)
    response.json(context)
})


contextsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const context = new Context({
        context: body.context,
        commands: body.commands ? body.commands : []
    })
    const savedContext = await context.save()
    response.status(201).json(savedContext)
})

contextsRouter.delete('/:id', async (request, response) => {
    await Context.findByIdAndRemove(request.params.id)
    return response.status(204).end();
    
})

contextsRouter.put('/:id', async (request, response) => {
    const updatedContext = await Context.findByIdAndUpdate(request.params.id, request.body, { new: true });
    console.log(updatedContext)
    response.json(updatedContext.toJSON())
})

module.exports = contextsRouter
