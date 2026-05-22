const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    doctorName:  { type: String, required: true },
    date:        { type: String, required: true },
    time:        { type: String, required: true },
    problem:     { type: String, required: true }
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;