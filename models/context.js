const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const contextSchema = mongoose.Schema({
    context: {
        type: String,
        required: true
    },
    commands: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Command'
        }
    ],
})

contextSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

        if (returnedObject.user) returnedObject.user = returnedObject.user.toString()
    }
})

module.exports = mongoose.model("Context", contextSchema)
