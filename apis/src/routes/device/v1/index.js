/**
 * index.js
 * @description :: index route file of admin platform.
 */

const express = require("express");
const { getTotalDataDashboardCard } = require("../../../controller/Dashboard_Controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    data: "Server is running",
  });
});

router.use("/patient", require("./patientRoutes"));
router.use("/doctor", require("./doctorRoutes"));
router.route('/dashboard/cards').get(getTotalDataDashboardCard)

module.exports = router;