const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    programName: {
      type: String,
      required: [true, "Program name is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    details: {
      type: String,
      trim: true,
    },
    applicationId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate a unique application ID
applicationSchema.pre("save", function (next) {
  if (!this.isNew) {
    return next();
  }

  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");
  this.applicationId = `APP${year}${random}`;
  next();
});

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
