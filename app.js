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

const today_date = new Date();
const year = today_date.getUTCFullYear();
const month = (today_date.getUTCMonth() + 1).toString().padStart(2, '0');
const day = today_date.getUTCDate().toString().padStart(2, '0');
const hours = today_date.getUTCHours().toString().padStart(2, '0');
const minutes = today_date.getUTCMinutes().toString().padStart(2, '0');
const seconds = today_date.getUTCSeconds().toString().padStart(2, '0');

app.get('/api', (req, res) => {
    try {
        console.log(req.body);
        const { slack_name, track } = req.query;

        return res.json({
            slack_name,
            track,
            current_day: today_date.toLocaleDateString('en-US', { weekday: 'long' }),
            utc_time: today_date,
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
