const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/';

export const apiService = {
  // Add a new school
  async addSchool(schoolData) {
    try {
      const response = await fetch(`${API_BASE_URL}addSchool`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: schoolData.schoolName,
          address: schoolData.address,
          city: schoolData.city,
          state: schoolData.state,
          contact: schoolData.contact,
          pictureUrl: schoolData.pictureUrl,
          email: schoolData.email,
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

  // Search schools
  async searchSchools(query) {
    try {
      const response = await fetch(`${API_BASE_URL}search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to search schools');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Get all schools
  async getAllSchools() {
    try {
      const response = await fetch(`${API_BASE_URL}getAllSchools`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

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
      const response = await fetch(`${API_BASE_URL}`, {
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
