const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment({
      patientName: req.body.patientName,
      doctorName:  req.body.doctorName,
      date:        req.body.date,
      time:        req.body.time,
      problem:     req.body.problem
    });
    const saved = await appointment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE appointment
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment cancelled!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;