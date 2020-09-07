const commandsRouter = require('express').Router()
const Command = require('../models/commands')

commandsRouter.get('/', async (request, response, next) => {
    let commands = await Command
      .find({})
    response.json(commands)
})

commandsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const command = new Command({
        command: body.command,
        description: body.description,
    })
    const savedCommand = await command.save()
    response.status(201).json(savedCommand)
})

commandsRouter.delete('/:id', async (request, response) => {
        await Command.findByIdAndRemove(request.params.id)
        return response.status(204).end();    
})

commandsRouter.put('/:id', async (request, response) => {
    const updatedCommand = await Command.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.json(updatedCommand.toJSON())
})

module.exports = commandsRouter
