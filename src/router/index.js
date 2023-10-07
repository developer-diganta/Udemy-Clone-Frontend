import { createRouter, createWebHistory } from "vue-router";
import EmailForm from "../views/common/EmailForm.vue";
import InstructorSignUp from "../views/instructor/InstructorSignup.vue";
import StudentSignUp from "../views/student/StudentSignup.vue";

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
  }
];

const otpValidationIsComplete = () => {
  return true;
  // return localStorage.getItem('otpValidated');
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
