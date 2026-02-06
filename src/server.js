const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');

const app = express();
const PORT = 9090;

app.use(helmet());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
     const pageContent = fs.readFileSync(path.join(__dirname, '../views/pages/home.ejs'), 'utf8');
     res.render('layout', { title: 'Home', currentPage: 'home', body: pageContent });
});

app.get('/home', (req, res) => {
     res.redirect('/');
});

app.get('/projects', (req, res) => {
     const pageContent = fs.readFileSync(path.join(__dirname, '../views/pages/projects.ejs'), 'utf8');
     res.render('layout', { title: 'Projects', currentPage: 'projects', body: pageContent });
});

app.get('/projects/unbound', (req, res) => {
     const pageContent = fs.readFileSync(path.join(__dirname, '../views/pages/unbound.ejs'), 'utf8');
     res.render('layout', { title: 'unbound Browser', currentPage: 'projects', body: pageContent });
});

app.get('/projects/uncensored', (req, res) => {
     const pageContent = fs.readFileSync(path.join(__dirname, '../views/pages/uncensored.ejs'), 'utf8');
     res.render('layout', { title: 'uncensored Proxy', currentPage: 'projects', body: pageContent });
});

app.get('/about', (req, res) => {
     const pageContent = fs.readFileSync(path.join(__dirname, '../views/pages/about.ejs'), 'utf8');
     res.render('layout', { title: 'About', currentPage: 'about', body: pageContent });
});

app.get('/contact', (req, res) => {
     const pageContent = fs.readFileSync(path.join(__dirname, '../views/pages/contact.ejs'), 'utf8');
     res.render('layout', { title: 'Contact', currentPage: 'contact', body: pageContent });
});

app.use((req, res) => {
     const pageContent = fs.readFileSync(path.join(__dirname, '../views/pages/404.ejs'), 'utf8');
     res.status(404).render('layout', { title: '404', currentPage: '', body: pageContent });
});

app.listen(PORT, () => {
     console.log(`unbound labs landing page is running on http://localhost:${PORT}`);
});