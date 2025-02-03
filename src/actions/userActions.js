import axios from "axios";
import { updateUserProfileSuccess } from "../reducers/authReducer";

export const updateUserProfile =
  (profileData) => async (dispatch, getState) => {
    try {
      const token = getState().auth.token;

      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        profileData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(updateUserProfileSuccess(response.data.body));
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };
