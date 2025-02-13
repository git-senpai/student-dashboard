const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { createApplicationSchema } = require("../validations/application");

// All routes are protected
router.use(auth);

// Application routes
router.post(
  "/",
  validate(createApplicationSchema),
  applicationController.createApplication
);
router.get("/", applicationController.getUserApplications);
router.get("/:id", applicationController.getApplicationById);
router.delete("/:id", applicationController.deleteApplication);

module.exports = router;
