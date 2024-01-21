import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/formHelper";
import { getToken, getUserDetails, removeSessions, setToken, setUserDetails } from "../helper/sessionHelper";
import { hideLoader, showLoader } from "../redux/state/settingSlice";
import store from "../redux/store/store";
import { setProfile } from "../redux/state/profileSlice";
import { setsearchUsers } from "../redux/state/chatSlice";
import { socket } from "../components/ChatBox";

const BaseURL = "https://chat-app-backend-d8yt.onrender.com/api";
const AxiosHeader = { headers: { "token": getToken() } };

export const RegistrationRequest = (firstname, lastname, email, password) => {
    store.dispatch(showLoader());
    let URL = `${BaseURL}/auth/register`;  // Corrected URL
    let PostBody = { firstname: firstname, lastname: lastname, email: email, password: password };
    return axios.post(URL, PostBody).then((res) => {
        store.dispatch(hideLoader());
        if (res.status === 200) {
            SuccessToast("Registration Successful.");
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader());
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message);
            return false;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    });
};

export const LoginRequest = (email, password) => {
    store.dispatch(showLoader());
    let URL = `${BaseURL}/auth/login`;  // Corrected URL
    let PostBody = { email: email, password: password };
    return axios.post(URL, PostBody).then((res) => {
        store.dispatch(hideLoader());
        if (res.status === 200) {
            setToken(res.data.token);
            setUserDetails(res.data.data);
            SuccessToast("Login Successful.");
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader());
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message);
            return false;
        } else if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message);
            return false;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    });
};

export const Logout = async () => {
    store.dispatch(showLoader());
    let URL = `${BaseURL}/auth/logout`;  // Corrected URL

    return await axios.get(URL, AxiosHeader).then((res) => {
        store.dispatch(hideLoader());
        if (res.status === 200) {
            socket.emit("logout", getUserDetails()._id);
            removeSessions();
            SuccessToast("Logout Successful.");
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader());
        ErrorToast("Something Went Wrong");
        return false;
    });
};

export const ForgetPasswordRequest = (email) => {
    store.dispatch(showLoader());
    let URL = `${BaseURL}/auth/forgotPassword`;  // Corrected URL
    let PostBody = { email: email };
    return axios.post(URL, PostBody).then((res) => {
        store.dispatch(hideLoader());
        if (res.status === 200) {
            SuccessToast(res.data);
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader());
        if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message);
            return false;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    });
};

export const ResetPasswordRequest = (password, resetToken) => {
    store.dispatch(showLoader());
    let PostBody = { password: password };
    let URL = `${BaseURL}/auth/resetPassword/${resetToken}`;  // Corrected URL
    return axios.put(URL, PostBody).then((res) => {
        store.dispatch(hideLoader());
        if (res.status === 200) {
            SuccessToast(res.data);
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader());
        if (err.response.data.status === 401) {
            ErrorToast(err.response.data.message);
            return false;
        } else if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message);
            return false;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    });
};

export const ProfileDetailsRequest = () => {
    store.dispatch(showLoader());
    let URL = `${BaseURL}/auth/profile/details`;  // Corrected URL
    return axios.get(URL, AxiosHeader).then((res) => {
        store.dispatch(hideLoader());
        if (res.status === 200) {
            store.dispatch(setProfile(res.data.data));
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader());
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message);
            return false;
        } else if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message);
            return false;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    });
};

export const UpdateProfileRequest = async (fname, lname, photo) => {
    store.dispatch(showLoader());
    let URL = `${BaseURL}/auth/updateProfile`;  // Corrected URL
    let PostBody = { firstname: fname, lastname: lname, photo: photo };
    return await axios.put(URL, PostBody, AxiosHeader).then((res) => {
        store.dispatch(hideLoader());
        if (res.status === 200) {
            SuccessToast("Profile Updated Successfully.");
            store.dispatch(setProfile(res.data.data));
            setUserDetails(res.data.data);
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader());
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message);
            return false;
        } else if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message);
            return false;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    });
};

export const ChangePasswordRequest = (oldPass, newPass) => {
    store.dispatch(showLoader());
    let URL = `${BaseURL}/auth/change/password`;  // Corrected URL
    let PostBody = { oldPassword: oldPass, newPassword: newPass };
    return axios.put(URL, PostBody, AxiosHeader).then((res) => {
        store.dispatch(hideLoader());
        if (res.status === 200) {
            SuccessToast(res.data);
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        store.dispatch(hideLoader());
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message);
            return false;
        } else if (err.response.data.status === 401) {
            ErrorToast(err.response.data.message);
            return false;
        } else if (err.response.data.status === 403) {
            ErrorToast(err.response.data.message);
            return false;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    });
};

export const searchUserRequest = async (search) => {
    let URL = `${BaseURL}/user?search=${search}`;  // Corrected URL
    return await axios.get(URL, AxiosHeader).then((res) => {
        if (res.status === 200) {
            store.dispatch(setsearchUsers(res.data));
            return true;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err) => {
        if (err.response.data.status === 400) {
            ErrorToast(err.response.data.message);
            return false;
        } else if (err.response.data.status === 404) {
            ErrorToast(err.response.data.message);
            return false;
        } else {
            ErrorToast("Something Went Wrong");
            return false;
        }
    });
};

// ... (rest of the code for other functions)
