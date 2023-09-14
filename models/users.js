const mongoose = require('mongoose');

const person = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        gender: {
            type: String,
            required: [true, "Please enter gender"]
        },

        email: {
            type: String,
            required: false
        },

        address: {
            type: String,
            required: false
        }
    },

    {
        timestamps: true
    }
)

const Person = mongoose.model('Person', person);

module.exports = Person;