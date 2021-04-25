const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    //res.send('Form');
    res.render('links/add')
});

router.post('/add', async(req, res) => {    
    
    const {title, url, descriptio} = req.body;
    const newLink = {title, url, descriptio};
    await pool.query('INSERT INTO links set ?', [newLink]);
    res.send('receivedaaaa');
})

module.exports = router;