
const express = require('express');

const Doctor_Controller = require('../../../controller/Doctor_Controller');
const { checkAuthenticate } = require('../../../middleware/adminAuthenticate');


const router = express.Router();


// ====================== || Doctor Routes || ==========================
router.route('/add').post(checkAuthenticate, Doctor_Controller.createDoctor)
router.route('/all').get(checkAuthenticate, Doctor_Controller.getAllDoctors)
router.route('/:id').get(checkAuthenticate,  Doctor_Controller.getDoctorById)
router.route('/update/:id').put(checkAuthenticate, Doctor_Controller.updateDoctor)
router.route('/delete/:id').delete(checkAuthenticate, Doctor_Controller.deleteDoctor)

module.exports = router 
