import axios from "axios";

const API_URL = "https://hiring.getbasis.co/candidate/users";

const AuthService = {

    emailVerification: function (email) {
        return axios.post(API_URL + "/email", { email: email });
    },

    verifyToken: function (token, email, verificationCode) {
        return axios.put(API_URL + "/email/verify", {
            token,
            email,
            verificationCode,
        });
    },

    signUp: function (
        firstName,
        referredCodeKey,
        email,
        token,
        source = "WEB_APP",
        agreeToPrivacyPolicy = true
    ) {
        return axios.post(API_URL, {
            firstName,
            agreeToPrivacyPolicy,
            email,
            token,
            referredCodeKey,
            source,
        });
    },

    verifyReferral: function (code) {
        return axios.get(API_URL + `/referral/${code}`, {
            headers: this.authHeader(),
        });
    },

    logout: function (_id, token) {
        localStorage.removeItem("token");
        return axios.delete(API_URL + `/logout/${_id}`, {
            headers: { Authorization: `Bearer ${_id},${token}` },
        });
    },

    resendOtp: function (token,email) {
        return axios.put(API_URL + "/token/resendtoken", {
            token,
            email
        });
    },

    getToken: function () {
        return localStorage.getItem("token");
    },

    saveToken: function (token) {
        localStorage.setItem("token", token);
    },

    authHeader: function () {
        return { Authorization: this.getToken() };
    },
};

export default AuthService;
