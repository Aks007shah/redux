const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo;