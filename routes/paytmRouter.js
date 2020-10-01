// const { Router } = require('express')

const router = require('express').Router()
const paytmCtrl = require('../controllers/paytmCtrl')

router.get('/sendPayment', paytmCtrl.sendPayment)
router.post('/createchecksum', paytmCtrl.createchecksum)

module.exports = router;