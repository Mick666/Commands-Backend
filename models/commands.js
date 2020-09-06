const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const commandSchema = mongoose.Schema({
    command: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

commandSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

        if (returnedObject.user) returnedObject.user = returnedObject.user.toString()
    }
})

module.exports = mongoose.model("Command", commandSchema)
