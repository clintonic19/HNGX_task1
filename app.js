const http = require('http');
const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

//HNGx project for stage 1 

app.get('/', (req, res) => {
    try {
        const response = {
            message: "Welcome to Home Page"
        };
        res.json(response);
    } catch (error) {
        console.error('An error occurred:', error || error.message);
        res.status(500).json({ error: 'Internal Server Error' || error.message });
    }
});

const currentDate = new Date();
      const year = currentDate.getUTCFullYear();
      const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getUTCDate().toString().padStart(2, '0');
      const hours = currentDate.getUTCHours().toString().padStart(2, '0');
      const minutes = currentDate.getUTCMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getUTCSeconds().toString().padStart(2, '0');
     
      // Create the formatted UTC time string
      const currentUTC = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`

app.get('/api', (req, res) => {
    try {
        console.log(req.body);
        const { slack_name, track } = req.query;

        const response = {
            slack_name,
            track,
            current_day: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
            utc_time: currentUTC,
            github_file_url: 'https://github.com/clintonic19/HNGX_task1/blob/master/app.js',
            github_repo_url: "https://github.com/clintonic19/HNGX_task1",
            status_code: 200,
        };
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
