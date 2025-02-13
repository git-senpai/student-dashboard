import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'
import Button from '../components/common/Button'
import Spinner from '../components/common/Spinner'
import ProgressBar from '../components/common/ProgressBar'

function Profile() {
  const { user, login } = useAuth()
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  
  // Initialize all nested objects with empty values
  const initialFormState = {
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    },
    education: {
      degree: '',
      institution: '',
      graduationYear: '',
      major: '',
    },
    interests: '',
    skills: '',
    bio: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      github: '',
    },
    preferredLanguage: '',
    timezone: '',
  }

  const [formData, setFormData] = useState(initialFormState)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      
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
        interests: data.interests?.join(', ') || '',
        skills: data.skills?.join(', ') || '',
        // Handle date
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
      })
    } catch (error) {
      showNotification(error.message, 'error')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      // Helper function to process comma-separated strings into arrays
      const processArrayField = (value) => {
        if (!value) return [];
        return value.split(',').map(item => item.trim()).filter(Boolean);
      };

      // Prepare the data for update
      let updatedData = {
        name: formData.name || '',
        dateOfBirth: formData.dateOfBirth || '',
        gender: formData.gender || '',
        phoneNumber: formData.phoneNumber || '',
        
        // Handle nested objects
        address: {
          street: formData.address?.street || '',
          city: formData.address?.city || '',
          state: formData.address?.state || '',
          country: formData.address?.country || '',
          zipCode: formData.address?.zipCode || '',
        },
        
        education: {
          degree: formData.education?.degree || '',
          institution: formData.education?.institution || '',
          graduationYear: formData.education?.graduationYear || '',
          major: formData.education?.major || '',
        },
        
        // Handle arrays
        skills: processArrayField(formData.skills),
        interests: processArrayField(formData.interests),
        
        bio: formData.bio || '',
        
        socialLinks: {
          linkedin: formData.socialLinks?.linkedin || '',
          twitter: formData.socialLinks?.twitter || '',
          github: formData.socialLinks?.github || '',
        },
        
        preferredLanguage: formData.preferredLanguage || '',
        timezone: formData.timezone || '',
      };

      // Clean up the data by removing empty values
      updatedData = Object.entries(updatedData).reduce((acc, [key, value]) => {
        // Handle nested objects
        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
          const cleanedObj = Object.entries(value).reduce((objAcc, [k, v]) => {
            if (v && v !== '') {
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
        else if (value && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});

      console.log('Sending data:', updatedData);

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      login(data.user);
      showNotification('Profile updated successfully', 'success');
      setEditing(false);
    } catch (error) {
      showNotification(error.message, 'error');
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Helper function to check if a section has data
  const hasData = (section) => {
    if (!formData[section]) return false;
    if (typeof formData[section] === 'string') return !!formData[section];
    if (Array.isArray(formData[section])) return formData[section].length > 0;
    return Object.values(formData[section]).some(value => !!value);
  }

  // Helper function to render a field if it has data or is in edit mode
  const renderField = (label, value, editComponent, required = false) => {
    if (!editing && !value) return null;
    
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {editing ? (
          editComponent
        ) : (
          <div className="mt-1 text-gray-900">{value}</div>
        )}
      </div>
    );
  }

  const calculateProfileCompletion = (formData) => {
    const fields = {
      basic: {
        fields: ['name', 'email'],
        weight: 20,
      },
      address: {
        fields: ['street', 'city', 'state', 'country', 'zipCode'],
        weight: 15,
      },
      education: {
        fields: ['degree', 'institution', 'graduationYear', 'major'],
        weight: 20,
      },
      skills: {
        fields: ['skills', 'interests'],
        weight: 15,
      },
      social: {
        fields: ['linkedin', 'twitter', 'github'],
        weight: 10,
      },
      additional: {
        fields: ['bio', 'preferredLanguage', 'timezone'],
        weight: 20,
      },
    };

    let totalScore = 0;

    // Check basic fields
    const basicCompleted = fields.basic.fields.filter(field => !!formData[field]).length;
    totalScore += (basicCompleted / fields.basic.fields.length) * fields.basic.weight;

    // Check address fields
    const addressCompleted = fields.address.fields.filter(field => !!formData.address?.[field]).length;
    totalScore += (addressCompleted / fields.address.fields.length) * fields.address.weight;

    // Check education fields
    const educationCompleted = fields.education.fields.filter(field => !!formData.education?.[field]).length;
    totalScore += (educationCompleted / fields.education.fields.length) * fields.education.weight;

    // Check skills and interests
    const skillsCompleted = fields.skills.fields.filter(field => {
      const value = formData[field];
      return value && (typeof value === 'string' ? value.trim() : value.length > 0);
    }).length;
    totalScore += (skillsCompleted / fields.skills.fields.length) * fields.skills.weight;

    // Check social links
    const socialCompleted = fields.social.fields.filter(field => !!formData.socialLinks?.[field]).length;
    totalScore += (socialCompleted / fields.social.fields.length) * fields.social.weight;

    // Check additional fields
    const additionalCompleted = fields.additional.fields.filter(field => !!formData[field]).length;
    totalScore += (additionalCompleted / fields.additional.fields.length) * fields.additional.weight;

    return Math.round(totalScore);
  };

  if (!user) {
    return <Spinner />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg mb-8 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
              <p className="mt-1 text-blue-100">
                Manage your account information and preferences
              </p>
            </div>
            {!editing && (
              <Button
                onClick={() => setEditing(true)}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                {editing && (
                  <span className="text-sm text-gray-500">* Required fields</span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField("Full Name", formData.name,
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editing}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />,
                  true
                )}

                {renderField("Email", formData.email,
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 text-gray-500 shadow-sm"
                  />
                )}

                {renderField("Date of Birth", formData.dateOfBirth,
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    disabled={!editing}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                )}

                {renderField("Gender", formData.gender,
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!editing}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                )}

                {renderField("Phone Number", formData.phoneNumber,
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    disabled={!editing}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData.address).map(key => (
                  renderField(
                    key.charAt(0).toUpperCase() + key.slice(1),
                    formData.address[key],
                    <input
                      type="text"
                      name={`address.${key}`}
                      value={formData.address[key]}
                      onChange={handleChange}
                      disabled={!editing}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  )
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Education Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData.education).map(key => (
                  renderField(
                    key.charAt(0).toUpperCase() + key.slice(1),
                    formData.education[key],
                    <input
                      type={key === 'graduationYear' ? 'number' : 'text'}
                      name={`education.${key}`}
                      value={formData.education[key]}
                      onChange={handleChange}
                      disabled={!editing}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  )
                ))}
              </div>
            </div>

            {/* Skills & Interests */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Skills & Interests</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {renderField("Skills", formData.skills,
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="Enter skills (comma-separated)"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                )}

                {renderField("Interests", formData.interests,
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder="Enter interests (comma-separated)"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Social Links</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData.socialLinks).map(key => (
                  renderField(
                    key.charAt(0).toUpperCase() + key.slice(1),
                    formData.socialLinks[key],
                    <input
                      type="url"
                      name={`socialLinks.${key}`}
                      value={formData.socialLinks[key]}
                      onChange={handleChange}
                      disabled={!editing}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  )
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            {editing && (
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setEditing(false)}
                  disabled={loading}
                  className="px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-6 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile 