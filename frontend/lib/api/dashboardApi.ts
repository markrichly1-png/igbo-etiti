import axios from 'axios'

const BACKEND_URL = 'https://igbo-etiti.onrender.com'

export const dashboardApi = {
  /**
   * Fetch user's applications
   */
  async getApplications(token: string) {
    try {
      const response = await axios.get(`${BACKEND_URL}/api2/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error: any) {
      console.error('Failed to fetch applications:', error)
      throw error
    }
  },

  /**
   * Fetch single application details
   */
  async getApplication(id: string, token: string) {
    try {
      const response = await axios.get(`${BACKEND_URL}/api2/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error: any) {
      console.error('Failed to fetch application:', error)
      throw error
    }
  },

  /**
   * Submit new application
   */
  async submitApplication(data: any, token: string) {
    try {
      const response = await axios.post(`${BACKEND_URL}/api2/applications`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return response.data
    } catch (error: any) {
      console.error('Failed to submit application:', error)
      throw error
    }
  },

  /**
   * Update application
   */
  async updateApplication(id: string, data: any, token: string) {
    try {
      const response = await axios.patch(`${BACKEND_URL}/api2/applications/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error: any) {
      console.error('Failed to update application:', error)
      throw error
    }
  },

  /**
   * Cancel application
   */
  async cancelApplication(id: string, token: string) {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api2/applications/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error: any) {
      console.error('Failed to cancel application:', error)
      throw error
    }
  },

  /**
   * Download certificate/document
   */
  async downloadDocument(id: string, token: string) {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api2/applications/${id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        }
      )
      return response.data
    } catch (error: any) {
      console.error('Failed to download document:', error)
      throw error
    }
  },
}
