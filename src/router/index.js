import { createRouter, createWebHistory } from "vue-router";
import EmailForm from "../views/common/EmailForm.vue";
import InstructorSignUp from "../views/instructor/InstructorSignup.vue";
import StudentSignUp from "../views/student/StudentSignup.vue";
import SignInForm from "../views/common/SignIn";
import InstructorHomePage from "../views/instructor/InstructorHomePage";
import App from "../App";

const routes = [
  {
    path: "/",
    redirect: EmailForm,
  },
  {
    path: "/signup/email/:id",
    name: "EmailForm",
    component: EmailForm,
  },
  {
    path: "/instructor/signup",
    name: "InstructorSignUp",
    component: InstructorSignUp,
    beforeEnter: (to, from, next) => {
      if (otpValidationIsComplete()) {
        next();
      } else {
        next("/instructor/signup/email");
      }
    },
  },
  {
    path: "/student/signup",
    name: "StudentSignUp",
    component: StudentSignUp,
    beforeEnter: (to, from, next) => {
      if (otpValidationIsComplete()) {
        next();
      } else {
        next("/student/signup/email");
      }
    },
  },
  {
    path: "/instructor/home",
    component: InstructorHomePage,
    beforeEnter: (to, from, next) => {
      if (instructorLoggedIn()) {
        next();
      } else {
        next("/signin/instructor");
      }
    },
  },
  {
    path: "/signin/:id",
    name: "SignIn",
    component: SignInForm,
  },
];

const otpValidationIsComplete = () => {
  return true;
  // return localStorage.getItem('otpValidated');
};

const instructorLoggedIn = () => {
  const _id = localStorage.getItem("_id");
  const email = localStorage.getItem("email");
  console.log(_id);
  console.log("here");
  return _id && email;
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
