/**
 * Patient.js
 * @description :: model of a database collection patient
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
        age: {
            type: Number,
            required: true, // Date of birth
        },
        address: {
            type: String,
            default: "",
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
        medicalHistory: {
            type: String,
            default: "", 
        },
        assignedDoctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor", 
           
        },


        
        registrationDate: {
            type: Date,
            default: Date.now, 
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

const Patient = mongoose.model("Patient", schema);
module.exports = Patient;
