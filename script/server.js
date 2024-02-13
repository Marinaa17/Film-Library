const express = require('express');
const fs = require('fs');
const path = require('path'); // Import the Node.js path module

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/add-movie', (req, res) => {
    const movieInfo = req.body;

    // Define the file path to the movies.json file
    const filePath = path.join(__dirname, 'json', 'movies.json');

    // Read existing movies from movies.json
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        let movies = JSON.parse(data) || [];
        movies.push(movieInfo);

        // Write updated movies array back to movies.json
        fs.writeFile(filePath, JSON.stringify(movies, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            
            res.status(200).json({ message: 'Movie added successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

