const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const Bootcamp = require("../models/Bootcamp");

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  let queryStr = JSON.stringify(req.query);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  query = Bootcamp.find(JSON.parse(queryStr))

  const bootcamps = await query;

  res.status(200).json({
    success: true,
    data: bootcamps,
    count: bootcamps.length,
    message: "Show all bootcamps"
  });
});

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp with id of ${req.params.id} not found`, 404)
    );

  res.status(200).json({
    success: true,
    data: bootcamp,
    message: "Show single bootcamp"
  });
});

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamp/
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
    message: "New bootcamp created"
  });
});

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamp/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp with id of ${req.params.id} not found`, 404)
    );

  res.status(200).json({
    success: true,
    data: bootcamp,
    message: "Bootcamp updated"
  });
});

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamp/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp)
    return next(
      new ErrorResponse(`Bootcamp with id of ${req.params.id} not found`, 404)
    );

  res.status(200).json({
    success: true,
    data: bootcamp,
    message: "Bootcamp deleted"
  });
});

// @desc    Get bootcamps within radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat & long
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calculate radius - earth's radius = (3963 mi / 6378km)
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    data: bootcamps,
    message: "Bootcamps within distance"
  });
});
