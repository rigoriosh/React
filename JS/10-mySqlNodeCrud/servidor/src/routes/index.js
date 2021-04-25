const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.send('hola hola')
})
router.get('/a', (req, res) =>{
    res.send('<h1>Rigo</h1>')
})

module.exports = router;