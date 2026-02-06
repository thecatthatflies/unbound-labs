require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const helmet = require('helmet');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 5004;
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(
     helmet({
          contentSecurityPolicy: {
               directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
                    fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
                    scriptSrc: ["'self'"]
               }
          }
     })
);

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

const renderPageAsync = async (res, page, data) => {
     try {
          const pageContent = await fs.readFile(path.join(__dirname, `../views/pages/${page}.ejs`), 'utf8');
          res.render('layout', { ...data, body: pageContent });
     } catch (err) {
          res.status(500).render('layout', { title: 'Error', currentPage: '', body: '<p>Page not found</p>' });
     }
};

app.get('/', async (_, res) => {
     renderPageAsync(res, 'home', { title: 'Home', currentPage: 'home' });
});

app.get('/home', (_, res) => {
     res.redirect('/');
});

app.get('/projects', async (_, res) => {
     renderPageAsync(res, 'projects', { title: 'Projects', currentPage: 'projects' });
});

app.get('/projects/unbound', async (_, res) => {
     renderPageAsync(res, 'unbound', { title: 'unbound Browser', currentPage: 'projects' });
});

app.get('/projects/uncensored', async (_, res) => {
     renderPageAsync(res, 'uncensored', { title: 'uncensored Proxy', currentPage: 'projects' });
});

app.get('/about', async (_, res) => {
     renderPageAsync(res, 'about', { title: 'About', currentPage: 'about' });
});

app.get('/contact', async (_, res) => {
     renderPageAsync(res, 'contact', { title: 'Contact', currentPage: 'contact' });
});

app.post('/api/contact', async (req, res) => {
     try {
          const { name, email, subject, message } = req.body;

          if (!name || !email || !subject || !message) {
               return res.status(400).json({ error: 'Missing required fields' });
          }

          if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
               return res.status(400).json({ error: 'Invalid email address' });
          }

          if (message.trim().length < 10) {
               return res.status(400).json({ error: 'Message must be at least 10 characters' });
          }

          const response = await resend.emails.send({
               from: 'onboarding@resend.dev',
               to: process.env.CONTACT_EMAIL,
               subject: `[${subject}] Message from ${name}`,
               html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br>')}</p>
               `
          });

          if (response.error) {
               console.error('Resend error:', response.error);
               return res.status(500).json({ error: 'Failed to send email' });
          }

          res.json({ success: true, message: 'Email sent successfully' });
     } catch (err) {
          console.error('Contact form error:', err);
          res.status(500).json({ error: 'Internal server error' });
     }
});

app.use(async (_, res) => {
     renderPageAsync(res, '404', { title: '404', currentPage: '' });
});

app.listen(PORT, () => {
     console.log(`unbound labs landing page is running on http://localhost:${PORT}`);
});