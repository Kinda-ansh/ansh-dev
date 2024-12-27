const Patient = require("../model/Patient");
const dbService = require("../utils/dbServices");

/**
 * @description : Create a new patient.
 */

// ==================|| CRUD For Patients ||=================


const createPatient = async (req, res) => {
    try {
        const { fullName, email, age, address, contactNumber, medicalHistory, assignedDoctor } = req.body;

        // Create a new patient record
        const newPatient = await dbService.create(Patient, {
            fullName,
            email,
            age,
            address,
            contactNumber,
            medicalHistory,
            assignedDoctor,
        });

        if (!newPatient) {
            return res.status(400).json({
                status: "error",
                message: "Something went wrong, Patient not created.",
            });
        }

        // Populate the assignedDoctor field with specified properties
        const populatedPatient = await Patient.findById(newPatient._id)
            .populate("assignedDoctor", "fullName contactNumber specialization");

        return res.status(201).json({
            status: "success",
            patient: populatedPatient,
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};



/**
 * @description : Get all patients with pagination.
 */


const getAllPatients = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const patients = await Patient.find()
            .populate("assignedDoctor", "fullName contactNumber specialization") // Populate the assignedDoctor field
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPatients = await Patient.countDocuments();

        if (!patients.length) {
            return res.status(404).json({ status: "error", message: "No patients found." });
        }

        const pagination = {
            currentPage: page,
            totalPages: Math.ceil(totalPatients / limit),
            totalItems: totalPatients,
            itemsPerPage: limit,
        };

        return res.status(200).json({
            status: "success",
            data: { patients, pagination },
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};




/**
 * @description : Get a single patient by ID.
 */
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id)
            .populate("assignedDoctor", "fullName contactNumber specialization"); // Populate the assignedDoctor field

        if (!patient) {
            return res.status(404).json({
                status: "error",
                message: "Patient not found.",
            });
        }

        return res.status(200).json({
            status: "success",
            data: patient,
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

/**
 * @description : Update a patient by ID.
 */
const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate("assignedDoctor", "fullName contactNumber specialization"); // Populate the assignedDoctor field

        if (!patient) {
            return res.status(404).json({
                status: "error",
                message: "Patient not found.",
            });
        }

        return res.status(200).json({
            status: "success",
            data: patient,
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

/**
 * @description : Delete a patient by ID.
 */
const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            return res.status(404).json({
                status: "error",
                message: "Patient not found.",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Patient deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

module.exports = {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
};
