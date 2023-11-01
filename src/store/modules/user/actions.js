import axios from "axios";
import backend_url from "@/globals/globals";
export default {
  async studentSignUp({ commit }, { email, name, password }) {
    try {
      const res = await axios.post(`${backend_url}/student`, {
        name,
        password,
        email,
      });

      commit("setUserName", name);
      commit("setUserId", res.data._id);
      commit("setUserType", res.data.type);
      commit("setUserToken", res.data.token);
      commit("setUserEmail", res.data.email);

      return res;
    } catch (error) {
      return error;
    }
  },

  /* instructorSignUp action
      signs up an instructor and stores requisite data in localStorage and set
      takes in a data object which has email, name, password, profile image and bio
      */

  async instructorSignUp({ commit }, data) {
    console.log(data.socialLinks);
    try {
      const res = await axios.post(`${backend_url}/instructor`, {
        ...data,
      });
      localStorage.clear();
      if (res.data._id) {
        localStorage.setItem("_id", res.data._id);
      } else if (res.data.otpValidation === 0) {
        localStorage.setItem("otpValidation", res.data.otpValidation);
      }
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("type", "instructor");
      commit("setUserName", data.name);
      commit("setUserId", res.data._id);
      commit("setUserType", "instructor");
      commit("setUserToken", res.data.token);
      commit("setUserEmail", res.data.email);
    } catch (error) {
      return error;
    }
  },

  /* signIn action
      signs in exisiting user based on the endPoint and stores the data in store and localStorage for persistence
      takes in email, password and endPoint(instructor, student or admin)
    */

  async signInSubmit({ commit }, { email, password, endPoint, router }) {
    console.log(email);
    try {
      const res = await axios.post(`${backend_url}/${endPoint}/login`, {
        email,
        password,
      });

      localStorage.clear();
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("_id", res.data._id);
      localStorage.setItem("type", endPoint);
      commit("setUserName", res.data.name);
      commit("setUserId", res.data._id);
      commit("setUserType", res.data.type);
      commit("setUserToken", res.data.token);
      commit("setUserEmail", res.data.email);
      console.log(res);
      if (res.data.status === "pending") {
        console.log("HERE");
        console.log(router);
        return "otp";
      }
      return "home";
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
