import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  // User Authentication Data
  email: null,
  role: null, // Either "admin" or "user"
  phoneNumber: null,
  token: null,

  // User Profile Data
  img: null, // Image path for avatar
  first_name: null,
  last_name: null,
  points: null,

  // UI/Loading States
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null,
};

// Async thunks (API calls)

/**
 * Login user with email and password
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise} API response with token
 */
const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Prepare request body
      const body = {
        email: email,
        password: password,
      };

      // Create request configuration
      const request = new Request(
        `${import.meta.env.VITE_BE_HOST}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Make API call
      const response = await fetch(request, {
        body: JSON.stringify(body),
      });

      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Parse and return successful response
      const data = await response.json();
      return data;
    } catch (error) {
      // Return error for rejected case
      return rejectWithValue(error.message);
    }
  },
);

/**
 * Get user profile data using authentication token
 * @param {Object} params - Parameters object
 * @param {string} params.token - Authentication token
 * @returns {Promise} API response with user profile data
 */
const getProfileThunk = createAsyncThunk(
  "users/profile",
  async ({ token }, { rejectWithValue }) => {
    try {
      // Create authenticated request
      const request = new Request(
        `${import.meta.env.VITE_BE_HOST}/api/v1/users/profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Make API call
      const response = await fetch(request);

      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Parse and return successful response
      const data = await response.json();

      return data;
    } catch (error) {
      // Return error for rejected case
      return rejectWithValue(error.message);
    }
  },
);

const logoutThunk = createAsyncThunk(
  "auth/logout",
  async ({ token }, { _ }) => {
    try {
      const request = new Request(
        `${import.meta.env.VITE_BE_HOST}/api/v1/auth/logout`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const response = await fetch(request);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const updateProfileThunk = createAsyncThunk(
  "user/update",
  async ({ token, changedData, originalData }, { rejectWithValue }) => {
    try {
      // Create form data dynamically
      const formdata = new FormData();
      let hasChanged = false;

      // full_name
      if (changedData.full_name !== originalData.full_name) {
        // Split full name into first_name and last_name
        const nameParts = changedData.full_name.trim().split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        formdata.append("first_name", firstName);
        formdata.append("last_name", lastName);
        hasChanged = true;
      }

      // email
      if (changedData.email !== originalData.email) {
        formdata.append("email", changedData.email);
        hasChanged = true;
      }

      // phone_number
      if (changedData.phone_number !== originalData.phone_number) {
        formdata.append(`phone_number`, changedData.phone_number);
        hasChanged = true;
      }

      // If no changes detected, return early
      if (!hasChanged) {
        throw new Error("No changes detected");
      }

      // Prepare request body
      const response = await fetch(
        `${import.meta.env.VITE_BE_HOST}/api/v1/users/profile`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formdata,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Slice definition
const loggedInSlice = createSlice({
  initialState,
  name: "loggedIn",
  reducers: {
    /**
     * Clear all logged in states and reset to initial state
     */
    clearLoggedInStates(state) {
      state.loggedIn = initialState.loggedIn;
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailed = false;
      state.error = null;
    },
  },

  // Handle async thunk actions
  extraReducers: (builder) =>
    builder
      // Login thunk cases
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        // Store authentication token
        state.role = payload.data.role;
        state.token = payload.data.token;

        // Update UI states
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        // Clear user data on failed login
        state.token = null;
        state.email = null;
        state.role = null;
        state.phoneNumber = null;
        state.img = null;
        state.first_name = null;
        state.last_name = null;

        // Update UI states
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.payload;
      })

      // Get profile thunk cases
      .addCase(getProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })

      .addCase(getProfileThunk.fulfilled, (state, { payload }) => {
        // Store profile data
        state.email = payload.data.email;
        state.first_name = payload.data.first_name;
        state.last_name = payload.data.last_name;
        state.img = payload.data.img;
        state.phoneNumber = payload.data.phone_number;
        state.points = payload.data.points;

        // Update UI states
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addCase(getProfileThunk.rejected, (state, { payload, error }) => {
        // Clear profile data on failed get profile
        state.email = null;
        state.role = null;
        state.phoneNumber = null;
        state.img = null;
        state.first_name = null;
        state.last_name = null;

        // Update UI states
        state.isLoading = false;
        state.isFailed = true;
        state.error = {
          payload,
          error,
        };
      })

      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })

      .addCase(logoutThunk.fulfilled, (state, { _ }) => {
        // If logout successful, clear the token and other information
        state.token = null;
        state.email = null;
        state.role = null;
        state.phoneNumber = null;
        state.img = null;
        state.first_name = null;
        state.last_name = null;

        // Update UI states
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addCase(logoutThunk.rejected, (state, { payload, error }) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = {
          payload,
          error,
        };
      })

      // Update profile thunk cases
      .addCase(updateProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })

      .addCase(updateProfileThunk.fulfilled, (state, { payload }) => {
        // Update profile data with new values
        if (payload.data.email) state.email = payload.data.email;
        if (payload.data.first_name) state.first_name = payload.data.first_name;
        if (payload.data.last_name) state.last_name = payload.data.last_name;
        if (payload.data.phone_number)
          state.phoneNumber = payload.data.phone_number;
        if (payload.data.img) state.img = payload.data.img;
        if (payload.data.points) state.points = payload.data.points;

        // Update UI states
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addCase(updateProfileThunk.rejected, (state, { payload }) => {
        // Update UI states
        state.isLoading = false;
        state.isFailed = true;
        state.error = payload;
      }),
});

export default loggedInSlice.reducer;

// Commented out old exports for reference
// export const { addLoggedIn, removeLoggedIn } = loggedInSlice.actions;

// Export actions
export const loggedInActions = {
  ...loggedInSlice.actions,
  loginThunk,
  getProfileThunk,
  logoutThunk,
  updateProfileThunk,
};
