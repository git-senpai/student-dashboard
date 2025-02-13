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
  const renderField = (label, value, editComponent) => {
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
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          {!editing && (
            <Button onClick={() => setEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Completion Progress */}
        <div className="mb-8">
          <ProgressBar percentage={calculateProfileCompletion(formData)} />
          {!editing && calculateProfileCompletion(formData) < 100 && (
            <p className="mt-2 text-sm text-gray-600">
              Complete your profile to help us serve you better.
              <button
                onClick={() => setEditing(true)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                Complete Now
              </button>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information - Always show */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField("Name", formData.name,
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              )}
              {renderField("Email", formData.email,
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
                />
              )}
            </div>
          </div>

          {/* Address Section */}
          {(editing || hasData('address')) && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField("Street", formData.address.street,
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
                {renderField("City", formData.address.city,
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
                {renderField("State", formData.address.state,
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
                {renderField("Country", formData.address.country,
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
                {renderField("ZIP Code", formData.address.zipCode,
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
              </div>
              </div>
          )}

          {/* Education Section */}
          {(editing || hasData('education')) && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Education</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField("Degree", formData.education.degree,
                  <input
                    type="text"
                    name="education.degree"
                    value={formData.education.degree}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
                {renderField("Institution", formData.education.institution,
                  <input
                    type="text"
                    name="education.institution"
                    value={formData.education.institution}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
                {renderField("Graduation Year", formData.education.graduationYear,
                  <input
                    type="number"
                    name="education.graduationYear"
                    value={formData.education.graduationYear}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
                {renderField("Major", formData.education.major,
                  <input
                    type="text"
                    name="education.major"
                    value={formData.education.major}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>
          )}

          {/* Skills and Interests */}
          {(editing || hasData('skills') || hasData('interests')) && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Skills & Interests</h2>
              <div className="grid grid-cols-1 gap-6">
                {renderField("Skills", formData.skills,
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="Enter skills (comma-separated)"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
                {renderField("Interests", formData.interests,
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder="Enter interests (comma-separated)"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
              </div>
              </div>
          )}

          {/* Social Links */}
          {(editing || hasData('socialLinks')) && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Social Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderField("LinkedIn", formData.socialLinks.linkedin,
                  <input
                    type="url"
                    name="socialLinks.linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
                {renderField("Twitter", formData.socialLinks.twitter,
                  <input
                    type="url"
                    name="socialLinks.twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
                {renderField("GitHub", formData.socialLinks.github,
                  <input
                    type="url"
                    name="socialLinks.github"
                    value={formData.socialLinks.github}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Additional Information</h2>
            <div className="grid grid-cols-1 gap-6">
              {renderField("Bio", formData.bio,
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField("Preferred Language", formData.preferredLanguage,
                <input
                  type="text"
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              )}
              {renderField("Timezone", formData.timezone,
                <input
                  type="text"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              )}
            </div>
          </div>

          {editing && (
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditing(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
        </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Profile 