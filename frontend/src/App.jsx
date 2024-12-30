// import { RouterProvider } from "react-router-dom";
// import "./App.css";

// // project import
// import router from "routes";
// import ThemeCustomization from "themes";

// import ScrollTop from "components/ScrollTop";
// import { Toaster } from "react-hot-toast";

// // ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

// export default function App() {
//   return (
//     <ThemeCustomization>
//       <Toaster />
//       <ScrollTop>
//         <RouterProvider router={router} />
//       </ScrollTop>
     
//     </ThemeCustomization>
//   );
// }

import { RouterProvider } from "react-router-dom";
import "./App.css";

// project import
import router from "routes";
import ThemeCustomization from "themes";

import ScrollTop from "components/ScrollTop";
import { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";
import { isTokenValid, logout } from "./utils/Logout"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
      <ThemeCustomization>
    <RouterProvider router={router}>
        <Toaster />
        <ScrollTop>
          <AppContent />
        </ScrollTop>
    </RouterProvider>
      </ThemeCustomization>
  );
}

const AppContent = () => {
  const navigate = useNavigate(); // Now we use navigate inside a child component of RouterProvider

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token || !isTokenValid(token)) {
      logout(); // Logs out the user
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);

  return null; // Or render other content here as needed
};
