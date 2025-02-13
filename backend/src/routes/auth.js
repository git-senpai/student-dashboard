const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} = require("../validations/auth");

// Public routes
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

// Protected routes
router.get("/profile", auth, authController.getProfile);
router.patch(
  "/profile",
  auth,
  validate(updateProfileSchema),
  authController.updateProfile
);

module.exports = router;
