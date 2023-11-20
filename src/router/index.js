import { createRouter, createWebHistory } from "vue-router";
import EmailForm from "../views/common/EmailForm.vue";
import InstructorSignUp from "../views/instructor/InstructorSignup.vue";
import StudentSignUp from "../views/student/StudentSignup.vue";
import SignInForm from "../views/common/SignIn";
import SearchResultsPage from "../views/common/SearchResultsPage";
import InstructorHomePage from "../views/instructor/InstructorHomePage";
import InstructorProfile from "../views/instructor/InstructorProfile";
import InstructorAddCourse from "../views/instructor/InstructorAddCourse";
import InstructorCourse from "../views/instructor/InstructorCourse";
import InstructorCourseStat from "../views/instructor/InstructorCourseStat";
import InstructorCourseLessons from "../views/instructor/InstructorCourseLessons";
import InstructorCourseList from "../views/instructor/InstructorCourseList";
import StudentHomePage from "../views/student/StudentHomePage";
import StudentEnrollPage from "../views/student/StudentEnrollPage";
import StudentCoursePage from "../views/student/StudentCoursePage";
import StudentProfilePage from "../views/student/StudentProfilePage";
import StudentEnrolledCourses from "../views/student/StudentEnrolledCourses";
import Student from "../views/student/Student";
import AdminHomePage from "../views/admin/AdminHomePage";
import AdminCourses from "../views/admin/AdminCourses";
import Admin from "../views/admin/Admin";
import AdminInstructors from "../views/admin/AdminInstructors";
import AdminStudents from "../views/admin/AdminStudents";
import AdminRevenue from "../views/admin/AdminRevenue";
import AdminSignIn from "../views/admin/AdminSignIn";
import AdminCourseStatus from "../views/admin/AdminCourseStatus";
import Instructor from "../views/instructor/Instructor";
import CoursePreview from "../views/common/CoursePreview";
import store from "@/store";
import App from "../App";
import FourZeroFour from "../views/common/FourZeroFour";
import Home from "../views/common/Home";
import backend_url from "@/globals/globals";
import axios from "axios";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    beforeEnter: async (to, from, next) => {
      try {
        const type = localStorage.getItem("type");
        if(!type) next();
        if (type === "student") {
          next("/student/home");
        } else if (type === "instructor") {
          next("/instructor/home");
        } else if (type === "admin") {
          next("/admin/home");
        } else {
          next();
        }
      } catch (error) {
        next("/signin/student");
      }
    },
  },
  /* ADMIN ROUTES */

  {
    path: "/admin/signin",
    component: AdminSignIn,
  },
  {
    path: "/admin",
    component: Admin,
    children: [
      {
        path: "home",
        component: AdminHomePage,
      },
      {
        path: "courses",
        component: AdminCourses,
      },
      {
        path: "instructors",
        component: AdminInstructors,
      },
      {
        path: "students",
        component: AdminStudents,
      },
      {
        path: "revenue",
        component: AdminRevenue,
      },
      {
        path: "coursestatus",
        component: AdminCourseStatus,
      },
      {
        path: "course",
        component: StudentCoursePage,
      },
    ],
    beforeEnter: async (to, from, next) => {
      if(localStorage.getItem("token")){
        const verifyAdmin = await axios.post(`${backend_url}/admin/verify`,{
          token:localStorage.getItem("token")
        })
        if (verifyAdmin) {
          next();
        } else {
          next("/home");
        }
      }else{
        next("/home")
      }
    },
  },

  /* Instructor Routes */
  {
    path: "/instructor/signup",
    name: "InstructorSignUp",
    component: InstructorSignUp,
  },
  {
    path: "/instructor",
    component: Instructor,
    beforeEnter: async (to, from, next) => {
      try {
        const instructorStatus = await store.dispatch("verifyToken", {
          type: "instructor",
        });
        console.log(instructorStatus);
        if (instructorStatus.data === "registered") {
          next();
        } else if (instructorStatus.data === "pending") {
          next("/otp");
        } else {
          next("/signin/instructor");
        }
      } catch (error) {
        next("/signin/instructor");
      }
    },
    children: [
      {
        path: "home",
        component: InstructorHomePage,
      },
      {
        path: "profile",
        component: InstructorProfile,
      },
      {
        path: "search",
        component: SearchResultsPage,
      },
      {
        path: "course/view/:id",
        component: InstructorCourse,
        beforeEnter: async (to, from, next) => {
          const verifyCourseOwnership = await store.dispatch(
            "verifyCourseOwnership",
            to.params.id,
          );
          if (verifyCourseOwnership) {
            next();
          } else {
            next(`coursepreview/${to.params.id}`);
          }
        },
      },
      {
        path: "course/stat/:id",
        component: InstructorCourseStat,
        beforeEnter: async (to, from, next) => {
          const verifyCourseOwnership = await store.dispatch(
            "verifyCourseOwnership",
            to.params.id,
          );
          if (verifyCourseOwnership) {
            next();
          } else {
            next("404");
          }
        },
      },

      {
        path: "course/lesson/:id",
        component: InstructorCourseLessons,
      },

      {
        path: "course/add",
        component: InstructorAddCourse,
      },
      {
        path: "courseslist",
        component: InstructorCourseList,
      },
      {
        path: "coursepreview/:id",
        component: CoursePreview,
      },
    ],
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
    beforeEnter: async (to, from, next) => {
      try {
        const type = localStorage.getItem("type");
        if (type === "student") {
          next("/student/home");
        } else if (type === "instructor") {
          next("/instructor/home");
        } else if (type === "admin") {
          next("/admin/home");
        } else {
          next();
        }
      } catch (error) {
        next("/signin/student");
      }
    },
  },

  /* Student Routes */

  {
    path: "/student",
    component: Student,
    beforeEnter: async (to, from, next) => {
      try {
        const studentStatus = await store.dispatch("verifyToken", {
          type: "student",
        });
        console.log(studentStatus);

        if (studentStatus.data === "registered") {
          next();
        } else if (studentStatus.data === "pending") {
          next("/otp");
        } else {
          localStorage.clear();
          next("/signin/student");
        }
      } catch (error) {
        console.log(error);
        localStorage.clear();
        next("/signin/student");
      }
    },
    children: [
      {
        path: "enroll/:id",
        name: "StudentEnroll",
        component: StudentEnrollPage,
        beforeEnter: async (to, from, next) => {
          try {
            const check = await axios.post(
              `${backend_url}/student/checkifenrolled`,
              {
                email: store.state.user.email,
                token: store.state.user.token,
                _id: store.state.user._id,
                courseId: to.params.id,
              },
            );
            if (!check.data.enrolled) {
              next();
            } else {
              next(`learn?courseId=${to.params.id}`);
            }
          } catch (error) {
            // next("/signin/student");
          }
        },
      },
      {
        path: "home",
        component: StudentHomePage,
      },
      {
        path: "learn",
        component: StudentCoursePage,
      },
      {
        path: "search",
        component: SearchResultsPage,
      },
      {
        path: "profile",
        component: StudentProfilePage,
      },
      {
        path: "enrolledcourses",
        component: StudentEnrolledCourses,
      },
    ],
  },
  {
    path: "/student/signup",
    name: "StudentSignUp",
    component: StudentSignUp,
    // beforeEnter: (to, from, next) => {
    //   if (otpValidationIsComplete()) {
    //     next();
    //   } else {
    //     next("/student/signup/email");
    //   }
    // },
  },
  {
    // catch all 404 - define at the very end
    path: "/:catchAll(.*)",
    component: FourZeroFour,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// beforeEnter: (to, from, next) => {
//   if (
//     otpValidationIsComplete() &&
//     localStorage.getItem("type") === "instructor"
//   ) {
//     next();
//   } else {
//     next("/instructor/signup/email");
//   }
// },

// {
//   path: "/student/enroll/:id",
//   component: StudentEnrollPage,
// },
// router.beforeEach((to, from, next) => {
//   const userType = localStorage.getItem("type");

//   // Check if the route has the "/instructor" prefix
//   if (to.path.startsWith("/instructor")) {
//     // Check if the user type is "instructor"
//     if (userType === "instructor" && otpValidationIsComplete()) {
//       next(); // Proceed to the route
//     } else {
//       next("/instructor/signup/email"); // Redirect to the email signup page for instructors
//     }
//   } else {
//     // For routes without the "/instructor" prefix, no specific check is needed
//     next();
//   }
// });
// {
//   path: "/instructor/home",
//   name: "InstructorHomePage",
//   component: InstructorHomePage,
//   beforeEnter: (to, from, next) => {
//     const instructorStatus = instructorLoggedIn();
//     if (instructorStatus === "validated") {
//       next();
//     } else if (instructorStatus === "otpLeft") {
//       next("/otp");
//     } else {
//       next("/signin/instructor");
//     }
//   },
// },
// {
//   path: "/instructor/profile",
//   component: InstructorProfile,
// },
// const otpValidationIsComplete = () => {
//   return true;
//   // return localStorage.getItem('otpValidated');
// };

// const instructorLoggedIn = () => {
//   const _id = localStorage.getItem("_id");
//   const email = localStorage.getItem("email");
//   const type = localStorage.getItem("type");
//   const otpValidation = localStorage.getItem("otpValidation");
//   if (_id && email && type === "instructor") {
//     return "validated";
//   } else if (otpValidation === "0") {
//     return "otpLeft";
//   } else {
//     return "expired";
//   }
// };
