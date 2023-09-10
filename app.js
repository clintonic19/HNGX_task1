const http = require('http');
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

//HNGx project for stage 1 

app.get('/', (req, res) => {
    try {
        return res.json({
            message: "Welcome to Home Page"
        })
    }
    catch (error) {
        console.error('An error occurred:', error || error.message);
        res.status(500).json({ error: 'Internal Server Error' || error.message });
    }
});


// Get the current timestamp (replace this with your desired timestamp)
const timestamp = new Date();

// Convert the timestamp to the UTC time format
const utcTime = timestamp.toISOString();

const year = timestamp.getUTCFullYear();
const month = (timestamp.getUTCMonth() + 1).toString().padStart(2, '0');
const day = timestamp.getUTCDate().toString().padStart(2, '0');
const hours = timestamp.getUTCHours().toString().padStart(2, '0');
const minutes = timestamp.getUTCMinutes().toString().padStart(2, '0');
const seconds = timestamp.getUTCSeconds().toString().padStart(2, '0');

app.get('/api', (req, res) => {
    try {
        console.log(req.body);
        const { slack_name, track } = req.query;

        return res.json({
            slack_name,
            track,
            current_day: timestamp.toLocaleDateString('en-US', { weekday: 'long' }),
            utc_time: utcTime,
            github_file_url: 'https://github.com/clintonic19/HNGX_task1/blob/master/app.js',
            github_repo_url: "https://github.com/clintonic19/HNGX_task1",
            status_code: 200,
            message: "Successful",

        })
        res.json(response);
    }
    catch (error) {
        console.error('An error occurred:', error || error.message);
        res.status(500).json({ error: 'Internal Server Error' || error.message });
    }
});

// PORT
app.listen(3000, () => {
    console.log(`Server is running on Port http://localhost:3000`)
})
