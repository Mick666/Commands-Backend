const commandsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Command = require('../models/commands')

commandsRouter.get('/', async (request, response, next) => {
    let commands = await Command
      .find({})
    response.json(commands)
})

commandsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const command = new Command({
        command: body.command,
        description: body.description,
    })
    const savedCommand = await command.save()
    response.status(201).json(savedCommand)
})

commandsRouter.delete('/:id', async (request, response) => {
    console.log(request.token)
    if (request.token === null) return response.status(401).json({error: 'Invalid token'})
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const command = await Command.findById(request.params.id)
    if (command.user.toString() === decodedToken.id.toString()) {
        await Command.findByIdAndRemove(request.params.id)
        return response.status(204).end();
    } 
    return response.status(401).json({error: 'Invalid token'})
    
})

commandsRouter.put('/:id', async (request, response) => {
    const updatedCommand = await Command.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.json(updatedCommand.toJSON())
})

module.exports = commandsRouter
