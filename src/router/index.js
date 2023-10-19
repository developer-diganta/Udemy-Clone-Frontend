import { createRouter, createWebHistory } from "vue-router";
import EmailForm from "../views/common/EmailForm.vue";
import InstructorSignUp from "../views/instructor/InstructorSignup.vue";
import StudentSignUp from "../views/student/StudentSignup.vue";
import SignInForm from "../views/common/SignIn";
import InstructorHomePage from "../views/instructor/InstructorHomePage";
import InstructorProfile from "../views/instructor/InstructorProfile";
import InstructorAddCourse from "../views/instructor/InstructorAddCourse";
import InstructorCourse from "../views/instructor/InstructorCourse";
import InstructorCourseLessons from "../views/instructor/InstructorCourseLessons";
import StudentHomePage from "../views/student/StudentHomePage";
import StudentEnrollPage from "../views/student/StudentEnrollPage";
import StudentCoursePage from "../views/student/StudentCoursePage";

import App from "../App";

const routes = [
  {
    path: "/",
    redirect: "/signup/email/instructor",
  },
  {
    path: "/otp",
    name: "EmailForm",
    component: EmailForm,
  },

  {
    path: "/signin/:id",
    name: "SignIn",
    component: SignInForm,
    // beforeEnter:(to, from, next) => {

    // }
  },
  /* Instructor Routes */
  {
    path: "/instructor/signup",
    name: "InstructorSignUp",
    component: InstructorSignUp,
    beforeEnter: (to, from, next) => {
      if (
        otpValidationIsComplete() &&
        localStorage.getItem("type") === "instructor"
      ) {
        next();
      } else {
        next("/instructor/signup/email");
      }
    },
  },
  {
    path: "/instructor/home",
    name: "InstructorHomePage",
    component: InstructorHomePage,
    beforeEnter: (to, from, next) => {
      const instructorStatus = instructorLoggedIn();
      if (instructorStatus === "validated") {
        next();
      } else if (instructorStatus === "otpLeft") {
        next("/otp");
      } else {
        next("/signin/instructor");
      }
    },
  },
  {
    path: "/instructor/profile",
    component: InstructorProfile,
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
    path: "/student/enroll/:id",
    name: "StudentEnroll",
    component: StudentEnrollPage,
  },

  {
    path: "/instructor/course/view/:id",
    component: InstructorCourse,
  },
  {
    path: "/instructor/course/lesson/:id",
    component: InstructorCourseLessons,
  },
  {
    path: "/instructor/course/add",
    component: InstructorAddCourse,
    beforeEnter: (to, from, next) => {
      if (instructorLoggedIn()) {
        next();
      } else {
        next("/signin/instructor");
      }
    },
  },

  {
    path: "/student/home",
    component: StudentHomePage,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("type") === "student") {
        next();
      } else {
        next("/signin/student");
      }
    },
  },
  {
    path: "/student/enroll/:id",
    component: StudentEnrollPage,
  },
  {
    path: "/student/learn",
    component: StudentCoursePage,
  },
];

const otpValidationIsComplete = () => {
  return true;
  // return localStorage.getItem('otpValidated');
};

const instructorLoggedIn = () => {
  const _id = localStorage.getItem("_id");
  const email = localStorage.getItem("email");
  const type = localStorage.getItem("type");
  const otpValidation = localStorage.getItem("otpValidation");
  if (_id && email && type === "instructor") {
    return "validated";
  } else if (otpValidation === "0") {
    return "otpLeft";
  } else {
    return "expired";
  }
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userType = localStorage.getItem("type");

  // Check if the route has the "/instructor" prefix
  if (to.path.startsWith("/instructor")) {
    // Check if the user type is "instructor"
    if (userType === "instructor" && otpValidationIsComplete()) {
      next(); // Proceed to the route
    } else {
      next("/instructor/signup/email"); // Redirect to the email signup page for instructors
    }
  } else {
    // For routes without the "/instructor" prefix, no specific check is needed
    next();
  }
});

export default router;
