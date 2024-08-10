const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Blacklisted files
const blacklistedFiles = [
    'app.js',
    'package.json',
    'package-lock.json'
];

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/dont-open', function (req, res) {
    res.redirect('https://www.linkedin.com/in/samarth-ghante/');
});

app.get('/robots.txt', (req, res) => {
    res.render('robots');
});

// Route to render the search page
app.get('/search', (req, res) => {
    res.render('search');
});

// Route to handle file system requests
app.get('/filesystem', (req, res) => {
    const { filename } = req.query;

    // Ensure filename is a relative path
    if (!filename || path.isAbsolute(filename)) {
        return res.status(400).send('Invalid filename.');
    }

    // Get the base file name to check against the blacklist
    const baseFilename = path.basename(filename);

    // Check if the requested file is blacklisted
    if (blacklistedFiles.includes(baseFilename)) {
        return res.status(403).send('Access to this file is restricted.');
    }

    // Construct the full file path
    const filePath = path.join(__dirname, filename);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found.');
        }

        // Read and send the file content
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).send('Error reading the file.');
            }
            res.render('filesystem', { filename, content: data });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
