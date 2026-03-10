const express = require('express');
const router = express.Router();
const { registerEvent } = require('../controllers/registrationController');

router.post('/', registerEvent);

module.exports = router;
