const express = require('express');

// router
const router = express.Router();

// ping service
router.get('/api/v1/ping', (req, res) => {
	res.status(200).json({
		status: 'Up',
		date: new Date()
	});
});

// export the module
module.exports = router;
