const router = require('express').Router() 
const paymentCtrl = require('../controllers/paymentCtrl') 

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
 
router.route('/payment').get(auth, authAdmin, paymentCtrl.getPayments)
                        .post(auth, paymentCtrl.createPayment)
 
// PayUmoney
router.route('/payment/payUmoney').post(auth, paymentCtrl.payUmoney.sendPayment)
                                  .get(paymentCtrl.payUmoney.PaymentStatus)

module.exports = router; 