const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const Person = require('./models/users');

//setting up express app
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//HNGx project for stage 1 
//Landing page
// app.get('/', (req, res) => {
//     try {
//         const response = {
//             message: "Welcome to Home Page"
//         };
//         res.json(response);
//     } catch (error) {
//         console.error('An error occurred:', error || error.message);
//         res.status(500).json({ error: 'Internal Server Error' || error.message });
//     }
// });

// app.get('/api', (req, res) => {
//     try {
//         const { slack_name, track } = req.query;

//         // Create the formatted UTC time string
//         const currentDate = new Date();
//         const year = currentDate.getUTCFullYear();
//         const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0');
//         const day = currentDate.getUTCDate().toString().padStart(2, '0');
//         const hours = currentDate.getUTCHours().toString().padStart(2, '0');
//         const minutes = currentDate.getUTCMinutes().toString().padStart(2, '0');
//         const seconds = currentDate.getUTCSeconds().toString().padStart(2, '0');

//         // Create the formatted UTC time string
//         const currentUTC = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`

//         const response = {
//             slack_name,
//             track,
//             current_day: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
//             utc_time: currentUTC,
//             github_file_url: 'https://github.com/clintonic19/HNGX_task1/blob/master/app.js',
//             github_repo_url: "https://github.com/clintonic19/HNGX_task1",
//             status_code: 200,
//         };
//         res.json(response);
//     }
//     catch (error) {
//         console.error('An error occurred:', error || error.message);
//         res.status(500).json({ error: 'Internal Server Error' || error.message });
//     }
// });

//POST USERS INTO THE DB
app.post('/api', async (req, res) => {
    try {
        const persons = await Person.create(req.body)
        res.status(200).json(persons);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
});

//GET ALL USERS FROM DB
app.get('/api/user_id', async (req, res) => {
    try {
        const persons = await Person.find({});
        res.status(200).json(persons);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
});

//GET USER BY ID FROM DB
app.get('/api/user_id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const person = await Person.findById(id)
        res.status(200).json(person);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
});

//UPDATE A USER IN DB
app.put('/api/user_id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const person = await Person.findByIdAndUpdate(id, req.body);

        //condition if user is not found in DB
        if (!person) {
            return res.status(404).json({ message: `User with ID: ${id} Not Found ` })
        }
        const update_person = await Person.findById(id);
        res.status(200).json(update_person);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
});

//Delete users from DB
app.delete('/api/user_id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const person = await Person.findByIdAndDelete(id);

        //condition if user to delete is not found in DB
        if (!person) {
            return res.status(404).json({ message: `User with ID: ${id} Does Not Exist ` })
        }
        // const delete_person = await Person.findById(id);
        res.status(200).json({ message: `User with ID: ${id} Deleted Successfully `, person });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// PORT
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://admin:tendency19@stagetwotask.pklci9a.mongodb.net/Node-api?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected successfully to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on ${port}`)
        });

    }).catch((error) => {
        console.log(error);
    });