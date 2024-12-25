/**
 * UserAuthRoutes.js
 * @description :: API routes for User Auth Controller.
 */


const express = require('express');
const employerAuthController = require('../../controller/auth/employerAuthController');
// const {
//     checkUserAuthenticate
//   } = require("../../middleware/Authenticate");
const {   checkEmployerAuthenticate } = require('../../middleware/EmployerMiddleware');


const router = express.Router();


// ====================== || Employee Routes || ==========================
router.route('/p/add').post(checkAuthenticate, createEmployee)
router.route('/p/all').get(getAllEmployees)
router.route('/p/:id').put(checkAuthenticate, updateEmployee)
router.route('/p/:id').delete(checkAuthenticate, deleteEmployee)

module.exports = router 
