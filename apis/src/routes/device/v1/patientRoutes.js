/**
 * UserAuthRoutes.js
 * @description :: API routes for User Auth Controller.
 */


const express = require('express');

const Patient_Controller = require('../../../controller/Patient_Controller');
const { checkAuthenticate } = require('../../../middleware/adminAuthenticate');


const router = express.Router();


// ====================== || Patient Routes || ==========================
router.route('/add').post(checkAuthenticate,Patient_Controller.createPatient)
router.route('/all').get(checkAuthenticate,Patient_Controller.getAllPatients)
router.route('/:id').get(Patient_Controller.getPatientById)
router.route('/update/:id').put(Patient_Controller.updatePatient)
router.route('/delete/:id').delete(Patient_Controller.deletePatient)

module.exports = router 
