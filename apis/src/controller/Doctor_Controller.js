const Doctor = require("../model/Doctor");
const dbService = require("../utils/dbServices");

/**
 * @description : Create a new doctor.
 */

// ==================|| CRUD For Doctors ||=================

const createDoctor = async (req, res) => {
    try {
        const { fullName, email, contactNumber, specialization, qualification, experience, address } = req.body;

        const newDoctor = await dbService.create(Doctor, {
            fullName,
            email,
            contactNumber,
            specialization,
            qualification,
            experience,
            address,
        });

        if (!newDoctor) {
            return res.status(400).json({
                status: "error",
                message: "Something went wrong, Doctor not created.",
            });
        }

        return res.status(201).json({
            status: "success",
            newDoctor,
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

/**
 * @description : Get all doctors with pagination.
 */
const getAllDoctors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const doctors = await Doctor.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalDoctors = await Doctor.countDocuments();

        if (!doctors.length) {
            return res.status(404).json({ status: "error", message: "No doctors found." });
        }

        const pagination = {
            currentPage: page,
            totalPages: Math.ceil(totalDoctors / limit),
            totalItems: totalDoctors,
            itemsPerPage: limit,
        };

        return res.status(200).json({
            status: "success",
            data: { doctors, pagination },
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

/**
 * @description : Get a single doctor by ID.
 */
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                status: "error",
                message: "Doctor not found.",
            });
        }

        return res.status(200).json({
            status: "success",
            data: doctor,
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

/**
 * @description : Update a doctor by ID.
 */
const updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doctor) {
            return res.status(404).json({
                status: "error",
                message: "Doctor not found.",
            });
        }

        return res.status(200).json({
            status: "success",
            data: doctor,
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

/**
 * @description : Delete a doctor by ID.
 */
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                status: "error",
                message: "Doctor not found.",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Doctor deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
    }
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};
