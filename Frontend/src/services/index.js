import api from './api';

export const authService = {
  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Register
  register: async (fullName, email, password, roleId) => {
    const response = await api.post('/auth/register', {
      full_name: fullName,
      email,
      password,
      role_id: roleId,
    });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export const rolesService = {
  // Get all roles
  getRoles: async () => {
    const response = await api.get('/roles/');
    return response.data;
  },

  // Get role by name
  getRoleByName: async (roleName) => {
    const roles = await rolesService.getRoles();
    return roles.find(role => role.name === roleName);
  },
};

export const vehiclesService = {
  // Get all vehicles
  getVehicles: async () => {
    const response = await api.get('/vehicles/');
    return response.data;
  },

  // Get vehicle by ID
  getVehicle: async (id) => {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  // Create vehicle
  createVehicle: async (vehicleData) => {
    const response = await api.post('/vehicles/', vehicleData);
    return response.data;
  },

  // Update vehicle
  updateVehicle: async (id, vehicleData) => {
    const response = await api.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  },

  // Delete vehicle
  deleteVehicle: async (id) => {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  },
};

export const driversService = {
  // Get all drivers
  getDrivers: async () => {
    const response = await api.get('/drivers/');
    return response.data;
  },

  // Get driver by ID
  getDriver: async (id) => {
    const response = await api.get(`/drivers/${id}`);
    return response.data;
  },

  // Create driver
  createDriver: async (driverData) => {
    const response = await api.post('/drivers/', driverData);
    return response.data;
  },

  // Update driver
  updateDriver: async (id, driverData) => {
    const response = await api.put(`/drivers/${id}`, driverData);
    return response.data;
  },

  // Delete driver
  deleteDriver: async (id) => {
    const response = await api.delete(`/drivers/${id}`);
    return response.data;
  },
};

export const tripsService = {
  // Get all trips
  getTrips: async () => {
    const response = await api.get('/trips/');
    return response.data;
  },

  // Get trip by ID
  getTrip: async (id) => {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  },

  // Create trip
  createTrip: async (tripData) => {
    const response = await api.post('/trips/', tripData);
    return response.data;
  },

  // Update trip
  updateTrip: async (id, tripData) => {
    const response = await api.put(`/trips/${id}`, tripData);
    return response.data;
  },

  // Delete trip
  deleteTrip: async (id) => {
    const response = await api.delete(`/trips/${id}`);
    return response.data;
  },
};

export const maintenanceService = {
  // Get all maintenance records
  getMaintenance: async () => {
    const response = await api.get('/maintenance/');
    return response.data;
  },

  // Get maintenance by ID
  getMaintenanceById: async (id) => {
    const response = await api.get(`/maintenance/${id}`);
    return response.data;
  },

  // Create maintenance record
  createMaintenance: async (maintenanceData) => {
    const response = await api.post('/maintenance/', maintenanceData);
    return response.data;
  },

  // Update maintenance record
  updateMaintenance: async (id, maintenanceData) => {
    const response = await api.put(`/maintenance/${id}`, maintenanceData);
    return response.data;
  },

  // Delete maintenance record
  deleteMaintenance: async (id) => {
    const response = await api.delete(`/maintenance/${id}`);
    return response.data;
  },
};

export const expensesService = {
  // Get all expenses
  getExpenses: async () => {
    const response = await api.get('/expenses/');
    return response.data;
  },

  // Get expense by ID
  getExpense: async (id) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  // Create expense
  createExpense: async (expenseData) => {
    const response = await api.post('/expenses/', expenseData);
    return response.data;
  },

  // Update expense
  updateExpense: async (id, expenseData) => {
    const response = await api.put(`/expenses/${id}`, expenseData);
    return response.data;
  },

  // Delete expense
  deleteExpense: async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },
};

export const fuelService = {
  // Get all fuel records
  getFuelRecords: async () => {
    const response = await api.get('/fuel/');
    return response.data;
  },

  // Get fuel record by ID
  getFuelRecord: async (id) => {
    const response = await api.get(`/fuel/${id}`);
    return response.data;
  },

  // Create fuel record
  createFuelRecord: async (fuelData) => {
    const response = await api.post('/fuel/', fuelData);
    return response.data;
  },

  // Update fuel record
  updateFuelRecord: async (id, fuelData) => {
    const response = await api.put(`/fuel/${id}`, fuelData);
    return response.data;
  },

  // Delete fuel record
  deleteFuelRecord: async (id) => {
    const response = await api.delete(`/fuel/${id}`);
    return response.data;
  },
};

export const dashboardService = {
  // Get dashboard summary
  getSummary: async () => {
    const response = await api.get('/dashboard/summary');
    return response.data;
  },
};

export const analyticsService = {
  // Get analytics data
  getAnalytics: async () => {
    const response = await api.get('/analytics/');
    return response.data;
  },
};
