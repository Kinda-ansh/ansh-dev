
const express = require('express');

const Payment_Controller = require('../../../controller/Payment_Controller');


const router = express.Router();


// ====================== || Doctor Routes || ==========================
router.route('/create').post( Payment_Controller.createPaymentIntent)
router.route('/all').get( Payment_Controller.getAllTransactions)

module.exports = router 
