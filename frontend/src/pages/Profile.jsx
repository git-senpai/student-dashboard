import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { motion } from "framer-motion";

function Profile() {
  const { user, login } = useAuth();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  // Initialize all nested objects with empty values
  const initialFormState = {
    name: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    education: {
      degree: "",
      institution: "",
      graduationYear: "",
      major: "",
    },
    interests: "",
    skills: "",
    bio: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      github: "",
    },
    preferredLanguage: "",
    timezone: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();

      // Ensure nested objects exist before setting state
      setFormData({
        ...initialFormState, // Start with initial state to ensure structure
        ...data, // Spread the received data
        // Handle nested objects safely
        address: {
          ...initialFormState.address,
          ...(data.address || {}),
        },
        education: {
          ...initialFormState.education,
          ...(data.education || {}),
        },
        socialLinks: {
          ...initialFormState.socialLinks,
          ...(data.socialLinks || {}),
        },
        // Handle arrays
        interests: data.interests?.join(", ") || "",
        skills: data.skills?.join(", ") || "",
        // Handle date
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
      });
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Helper function to process comma-separated strings into arrays
      const processArrayField = (value) => {
        if (!value) return [];
        return value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      };

      // Prepare the data for update
      let updatedData = {
        name: formData.name || "",
        dateOfBirth: formData.dateOfBirth || "",
        gender: formData.gender || "",
        phoneNumber: formData.phoneNumber || "",

        // Handle nested objects
        address: {
          street: formData.address?.street || "",
          city: formData.address?.city || "",
          state: formData.address?.state || "",
          country: formData.address?.country || "",
          zipCode: formData.address?.zipCode || "",
        },

        education: {
          degree: formData.education?.degree || "",
          institution: formData.education?.institution || "",
          graduationYear: formData.education?.graduationYear || "",
          major: formData.education?.major || "",
        },

        // Handle arrays
        skills: processArrayField(formData.skills),
        interests: processArrayField(formData.interests),

        bio: formData.bio || "",

        socialLinks: {
          linkedin: formData.socialLinks?.linkedin || "",
          twitter: formData.socialLinks?.twitter || "",
          github: formData.socialLinks?.github || "",
        },

        preferredLanguage: formData.preferredLanguage || "",
        timezone: formData.timezone || "",
      };

      // Clean up the data by removing empty values
      updatedData = Object.entries(updatedData).reduce((acc, [key, value]) => {
        // Handle nested objects
        if (
          typeof value === "object" &&
          !Array.isArray(value) &&
          value !== null
        ) {
          const cleanedObj = Object.entries(value).reduce((objAcc, [k, v]) => {
            if (v && v !== "") {
              objAcc[k] = v;
            }
            return objAcc;
          }, {});

          if (Object.keys(cleanedObj).length > 0) {
            acc[key] = cleanedObj;
          }
        }
        // Handle arrays
        else if (Array.isArray(value)) {
          if (value.length > 0) {
            acc[key] = value;
          }
        }
        // Handle simple values
        else if (value && value !== "") {
          acc[key] = value;
        }
        return acc;
      }, {});

      console.log("Sending data:", updatedData);

      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await response.json();
      login(data.user);
      showNotification("Profile updated successfully", "success");
      setEditing(false);
    } catch (error) {
      showNotification(error.message, "error");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Helper function to check if a section has data
  const hasData = (section) => {
    if (!formData[section]) return false;
    if (typeof formData[section] === "string") return !!formData[section];
    if (Array.isArray(formData[section])) return formData[section].length > 0;
    return Object.values(formData[section]).some((value) => !!value);
  };

  // Helper function to render a field if it has data or is in edit mode
  const renderField = (label, value, editComponent, required = false) => {
    if (!editing && !value) return null;

    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-emerald-400 ml-1">*</span>}
        </label>
        {editing ? (
          editComponent
        ) : (
          <div className="text-gray-300 bg-gray-800/50 p-2 rounded-lg">
            {value || "Not provided"}
          </div>
        )}
      </div>
    );
  };

  const calculateProfileCompletion = (formData) => {
    const fields = {
      basic: {
        fields: ["name", "email"],
        weight: 20,
      },
      address: {
        fields: ["street", "city", "state", "country", "zipCode"],
        weight: 15,
      },
      education: {
        fields: ["degree", "institution", "graduationYear", "major"],
        weight: 20,
      },
      skills: {
        fields: ["skills", "interests"],
        weight: 15,
      },
      social: {
        fields: ["linkedin", "twitter", "github"],
        weight: 10,
      },
      additional: {
        fields: ["bio", "preferredLanguage", "timezone"],
        weight: 20,
      },
    };

    let totalScore = 0;

    // Check basic fields
    const basicCompleted = fields.basic.fields.filter(
      (field) => !!formData[field]
    ).length;
    totalScore +=
      (basicCompleted / fields.basic.fields.length) * fields.basic.weight;

    // Check address fields
    const addressCompleted = fields.address.fields.filter(
      (field) => !!formData.address?.[field]
    ).length;
    totalScore +=
      (addressCompleted / fields.address.fields.length) * fields.address.weight;

    // Check education fields
    const educationCompleted = fields.education.fields.filter(
      (field) => !!formData.education?.[field]
    ).length;
    totalScore +=
      (educationCompleted / fields.education.fields.length) *
      fields.education.weight;

    // Check skills and interests
    const skillsCompleted = fields.skills.fields.filter((field) => {
      const value = formData[field];
      return (
        value && (typeof value === "string" ? value.trim() : value.length > 0)
      );
    }).length;
    totalScore +=
      (skillsCompleted / fields.skills.fields.length) * fields.skills.weight;

    // Check social links
    const socialCompleted = fields.social.fields.filter(
      (field) => !!formData.socialLinks?.[field]
    ).length;
    totalScore +=
      (socialCompleted / fields.social.fields.length) * fields.social.weight;

    // Check additional fields
    const additionalCompleted = fields.additional.fields.filter(
      (field) => !!formData[field]
    ).length;
    totalScore +=
      (additionalCompleted / fields.additional.fields.length) *
      fields.additional.weight;

    return Math.round(totalScore);
  };

  if (!user) {
    return <Spinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0B1120] py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900/50 backdrop-filter backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        >
          {/* Profile Header */}
          <div className="relative px-6 py-8 sm:px-8 border-b border-gray-800/50">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-40 h-40 bg-emerald-500/10 rounded-full filter blur-3xl"></div>

            <div className="relative flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                  Profile Settings
                </h1>
                <p className="mt-1 text-gray-400">
                  Manage your account settings and preferences
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setEditing(!editing)}
                disabled={loading}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  editing
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-emerald-600 text-white hover:bg-emerald-500"
                } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/20`}
              >
                {editing ? "Cancel" : "Edit Profile"}
              </motion.button>
            </div>

            {/* Profile Completion */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">
                  Profile Completion
                </span>
                <span className="text-sm font-medium text-emerald-400">
                  {calculateProfileCompletion(formData)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${calculateProfileCompletion(formData)}%`,
                  }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-8 space-y-8">
            {/* Basic Information */}
            <section className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-white">
                  Basic Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField(
                  "Full Name",
                  formData.name,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    required
                  />,
                  true
                )}
                {renderField(
                  "Email",
                  formData.email,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    required
                  />,
                  true
                )}
                {renderField(
                  "Date of Birth",
                  formData.dateOfBirth,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "Gender",
                  formData.gender,
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </motion.select>
                )}
              </div>
            </section>

            {/* Contact Information */}
            <section className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-white">
                  Contact Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField(
                  "Phone Number",
                  formData.phoneNumber,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "Street Address",
                  formData.address?.street,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="address.street"
                    value={formData.address?.street}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "City",
                  formData.address?.city,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="address.city"
                    value={formData.address?.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "State",
                  formData.address?.state,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="address.state"
                    value={formData.address?.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "Country",
                  formData.address?.country,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="address.country"
                    value={formData.address?.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "ZIP Code",
                  formData.address?.zipCode,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="address.zipCode"
                    value={formData.address?.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
              </div>
            </section>

            {/* Education */}
            <section className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-1 bg-purple-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-white">Education</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField(
                  "Degree",
                  formData.education?.degree,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="education.degree"
                    value={formData.education?.degree}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "Institution",
                  formData.education?.institution,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="education.institution"
                    value={formData.education?.institution}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "Major",
                  formData.education?.major,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="education.major"
                    value={formData.education?.major}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "Graduation Year",
                  formData.education?.graduationYear,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="education.graduationYear"
                    value={formData.education?.graduationYear}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
              </div>
            </section>

            {/* Additional Information */}
            <section className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-1 bg-pink-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-white">
                  Additional Information
                </h2>
              </div>
              <div className="space-y-6">
                {renderField(
                  "Bio",
                  formData.bio,
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "Skills (comma-separated)",
                  formData.skills,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "Interests (comma-separated)",
                  formData.interests,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
              </div>
            </section>

            {/* Social Links */}
            <section className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-1 bg-yellow-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-white">
                  Social Links
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField(
                  "LinkedIn",
                  formData.socialLinks?.linkedin,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="url"
                    name="socialLinks.linkedin"
                    value={formData.socialLinks?.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "Twitter",
                  formData.socialLinks?.twitter,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="url"
                    name="socialLinks.twitter"
                    value={formData.socialLinks?.twitter}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
                {renderField(
                  "GitHub",
                  formData.socialLinks?.github,
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="url"
                    name="socialLinks.github"
                    value={formData.socialLinks?.github}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  />
                )}
              </div>
            </section>

            {/* Preferences */}
            <section className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-1 bg-red-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-white">
                  Preferences
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField(
                  "Preferred Language",
                  formData.preferredLanguage,
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select language</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </motion.select>
                )}
                {renderField(
                  "Timezone",
                  formData.timezone,
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-900/50 text-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select timezone</option>
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                  </motion.select>
                )}
              </div>
            </section>

            {/* Submit Button */}
            {editing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-end mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-emerald-900/20"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving Changes...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </motion.button>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Profile;
