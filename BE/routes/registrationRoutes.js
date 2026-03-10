const express = require('express');
const router = express.Router();
const { registerEvent, getAllRegistrations } = require('../controllers/registrationController');

router.post('/', registerEvent);
router.get('/', getAllRegistrations);

module.exports = router;
