const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Dhawal@9921103174',
    database: 'mini_crm'    
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Routes
app.post('/customers', (req, res) => {
    const { name, email, total_spends, visits, last_visit } = req.body;
    const query = 'INSERT INTO customers (name, email, total_spends, visits, last_visit) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, total_spends, visits, last_visit], (err, results) => {
        if (err) {
            console.error('Error inserting customer:', err);
            res.status(500).send('Error inserting customer');
            return;
        }
        res.status(201).send('Customer added');
    });
});

app.get('/customers', (req, res) => {
    const query = 'SELECT * FROM customers';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching customers:', err);
            res.status(500).send('Error fetching customers');
            return;
        }
        res.status(200).json(results);
    });
});

app.post('/orders', (req, res) => {
    const { customer_id, amount, order_date } = req.body;
    const query = 'INSERT INTO orders (customer_id, amount, order_date) VALUES (?, ?, ?)';
    db.query(query, [customer_id, amount, order_date], (err, results) => {
        if (err) {
            console.error('Error inserting order:', err);
            res.status(500).send('Error inserting order');
            return;
        }
        res.status(201).send('Order added');
    });
});

app.get('/orders', (req, res) => {
    const query = 'SELECT * FROM orders';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            res.status(500).send('Error fetching orders');
            return;
        }
        res.status(200).json(results);
    });
});

app.post('/audiences', (req, res) => {
    const { name, criteria } = req.body;
    const query = 'INSERT INTO audiences (name, criteria) VALUES (?, ?)';
    db.query(query, [name, criteria], (err, results) => {
        if (err) {
            console.error('Error creating audience:', err);
            res.status(500).send('Error creating audience');
            return;
        }
        res.status(201).send('Audience created');
    });
});

app.get('/audiences', (req, res) => {
    const query = 'SELECT * FROM audiences';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching audiences:', err);
            res.status(500).send('Error fetching audiences');
            return;
        }
        res.status(200).json(results);
    });
});

app.post('/campaigns', (req, res) => {
    const { audience_id, message, sent_status } = req.body;
    const query = 'INSERT INTO campaigns (audience_id, message, sent_status) VALUES (?, ?, ?)';
    db.query(query, [audience_id, message, sent_status], (err, results) => {
        if (err) {
            console.error('Error sending campaign:', err);
            res.status(500).send('Error sending campaign');
            return;
        }
        res.status(201).send('Campaign sent');
    });
});

app.get('/campaigns', (req, res) => {
    const query = 'SELECT * FROM campaigns';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching campaigns:', err);
            res.status(500).send('Error fetching campaigns');
            return;
        }
        res.status(200).json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
