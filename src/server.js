const express = require('express');
const path = require('path');

const app = express();
const PORT = 9090;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/pages/home.html'));
});

app.get('/home', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/pages/home.html'));
});

app.get('/projects', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/pages/projects.html'));
});

app.get('/projects/unbound', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/pages/unbound.html'));
});

app.get('/projects/uncensored', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/pages/uncensored.html'));
});

app.get('/about', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/pages/about.html'));
});

app.get('/contact', (req, res) => {
     res.sendFile(path.join(__dirname, '../public/pages/contact.html'));
});

app.use((req, res) => {
     res.status(404).sendFile(path.join(__dirname, '../public/pages/404.html'));
});

app.listen(PORT, () => {
     console.log(`unbound labs landing page is running on http://localhost:${PORT}`);
});
