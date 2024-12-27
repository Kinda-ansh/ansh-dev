const Doctor = require('../model/Doctor'); // Doctor model
const Patient = require('../model/Patient'); // Patient model
// const Appointment = require('../model/Appointment'); // If applicable, appointment model

// Get the total number of patients
const getTotalPatients = async () => {
  const patientCount = await Patient.countDocuments();
  return patientCount;
};

// Get the total number of doctors
const getTotalDoctors = async () => {
  const doctorCount = await Doctor.countDocuments();
  return doctorCount;
};

// Get total number of assigned patients (patients with assigned doctors)
const getTotalAssignedPatients = async () => {
  const assignedPatients = await Patient.countDocuments({ assignedDoctor: { $ne: null } });
  return assignedPatients;
};

// Get total revenue (if applicable)
// const getTotalRevenue = async () => {
//   let revenue = 0;
//   const appointments = await Appointment.aggregate([
//     { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
//   ]);
//   if (appointments.length > 0) {
//     revenue = appointments[0].totalRevenue;
//   }
//   return revenue;
// };

// Controller function for analytics data
const getAnalyticsData = async (req, res) => {
  try {
    // Fetch required data
    const totalPatients = await getTotalPatients();
    const totalDoctors = await getTotalDoctors();
    const totalAssignedPatients = await getTotalAssignedPatients();
    // const totalRevenue = await getTotalRevenue();

    // Return the analytics data
    res.json({
      totalPageViews: { count: "4,42,236", percentage: 59.3, extra: "35,000" },
      totalUsers: { count: totalPatients, percentage: 70.5, extra: "8,900" },
      totalOrder: { count: "18,800", percentage: 27.4, isLoss: true, extra: "1,943" },
    //   totalSales: { count: `$${totalRevenue}`, percentage: 27.4, isLoss: true, extra: "$20,395" },
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
};

module.exports = { getAnalyticsData };
