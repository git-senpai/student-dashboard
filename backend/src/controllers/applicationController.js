const Application = require("../models/Application");
const User = require("../models/User");

// Create new application
exports.createApplication = async (req, res) => {
  try {
    const { programName, details } = req.body;

    const application = new Application({
      user: req.user._id,
      programName,
      details,
    });

    await application.save();

    // Add application to user's applications array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { applications: application._id },
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting application", error: error.message });
  }
};

// Get all applications for current user
exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(applications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching applications", error: error.message });
  }
};

// Get single application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching application", error: error.message });
  }
};

// Delete application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Remove application from user's applications array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { applications: req.params.id },
    });

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting application", error: error.message });
  }
};
