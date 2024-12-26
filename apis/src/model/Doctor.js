/**
 * Doctor.js
 * @description :: model of a database collection doctor
 */

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const idValidator = require("mongoose-id-validator");
const { Schema } = mongoose;

const myCustomLabels = {
    totalDocs: "itemCount",
    docs: "data",
    limit: "perPage",
    page: "currentPage",
    nextPage: "next",
    prevPage: "prev",
    totalPages: "pageCount",
    pagingCounter: "slNo",
    meta: "paginator",
};

mongoosePaginate.paginate.options = { customLabels: myCustomLabels };

const schema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (value) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: "Invalid email address",
            },
        },
        contactNumber: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return /^\d{10}$/.test(value); // Validates a 10-digit number
                },
                message: "Invalid contact number",
            },
        },
        specialization: {
            type: String,
            required: true, // Example: "Cardiologist", "Dermatologist", etc.
        },
        qualification: {
            type: String,
            required: true, // Example: "MBBS, MD", "BDS, MDS", etc.
        },
        experience: {
            type: Number,
            required: true, // Number of years of experience
            min: 0,
        },
        address: {
            type: String,
            default: "",
        },
        registrationDate: {
            type: Date,
            default: Date.now, // Automatically sets the registration date to the current date
        },
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

schema.method("toJSON", function () {
    const { _id, __v, ...object } = this.toObject({ virtuals: true });
    object.id = _id;

    return object;
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const Doctor = mongoose.model("Doctor", schema);
module.exports = Doctor;
