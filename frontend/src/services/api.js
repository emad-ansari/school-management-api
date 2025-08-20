const API_BASE_URL = 'https://school-management-api-0dyr.onrender.com/';

export const apiService = {
  // Add a new school
  async addSchool(schoolData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/addSchool`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: schoolData.schoolName,
          address: schoolData.address,
          latitude: parseFloat(schoolData.latitude),
          longitude: parseFloat(schoolData.longitude),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add school');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Get schools by proximity
  async getSchoolsByProximity(latitude, longitude) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/listSchools?latitude=${latitude}&longitude=${longitude}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch schools');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Test API connection
  async testConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('API connection failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
