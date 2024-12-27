const express = require('express');
const mongoose = require('mongoose');
const Doctor = require('./models/Doctor'); // Assuming your Doctor model is in 'models/Doctor'
const Patient = require('./models/Patient'); // Assuming your Patient model is in 'models/Patient'

const router = express.Router();

// Get total number of patients
const getTotalPatients = async () => {
  const patientCount = await Patient.countDocuments();
  return patientCount;
};

// Get total number of doctors
const getTotalDoctors = async () => {
  const doctorCount = await Doctor.countDocuments();
  return doctorCount;
};

// Get the total number of patients assigned to doctors
const getTotalAssignedPatients = async () => {
  const assignedPatients = await Patient.countDocuments({ assignedDoctor: { $ne: null } });
  return assignedPatients;
};

// Get total revenue (if applicable)
const getTotalRevenue = async () => {
  // Assuming you have a field `revenue` in appointments or a similar collection
  // This will vary based on how you track payments.
  let revenue = 0;
  // Example query, adjust based on your schema
  const appointments = await Appointment.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
  ]);
  if (appointments.length > 0) {
    revenue = appointments[0].totalRevenue;
  }
  return revenue;
};

// Analytical data API
router.get('/analytics', async (req, res) => {
  try {
    // Fetch required data
    const totalPatients = await getTotalPatients();
    const totalDoctors = await getTotalDoctors();
    const totalAssignedPatients = await getTotalAssignedPatients();
    const totalRevenue = await getTotalRevenue();

    // Respond with data for the cards
    return res.json({
      totalPageViews: { count: "4,42,236", percentage: 59.3, extra: "35,000" },
      totalUsers: { count: totalPatients, percentage: 70.5, extra: "8,900" },
      totalOrder: { count: "18,800", percentage: 27.4, isLoss: true, extra: "1,943" },
      totalSales: { count: `$${totalRevenue}`, percentage: 27.4, isLoss: true, extra: "$20,395" },
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return res.status(500).json({ message: 'Error fetching analytics data' });
  }
});

module.exports = router;
