const Bootcamp = require("../models/Bootcamp");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Show all bootcamps"
  });
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Show bootcamp"
  });
};

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamp/
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
      message: "New bootcamp created"
    });
  } catch (error) {
    res.status(400).json({
      success: false
    });
  }
};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamp/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Update bootcamp"
  });
};

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamp/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Delete bootcamp"
  });
};
