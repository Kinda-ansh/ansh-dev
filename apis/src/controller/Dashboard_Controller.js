const Doctor = require('../model/Doctor'); // Doctor model
const Patient = require('../model/Patient'); // Patient model

const getTotalDataDashboardCard = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();

    const totalPatients = await Patient.countDocuments();

    const totalAssignedPatients = await Patient.countDocuments({ assignedDoctor: { $ne: null } });

    res.status(200).json({
      totalDoctors,
      totalPatients,
      totalAssignedPatients,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTotalDataDashboardCard,
};
