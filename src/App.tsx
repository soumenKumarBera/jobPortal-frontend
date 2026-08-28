import { createTheme, MantineProvider } from "@mantine/core";


// @ts-ignore: side-effect CSS import has no type declarations
import "@mantine/core/styles.css";
// @ts-ignore: side-effect CSS import has no type declarations
import "@mantine/carousel/styles.css";
// @ts-ignore: side-effect CSS import has no type declarations
import "@mantine/tiptap/styles.css";
import HomePage from "./Pages/HomePage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import FindJobsPage from "./Pages/FindJobsPage";
import FindTalentPage from "./Pages/FindTalentPage";
import TalentPrifilePage from "./Pages/TalentProfilePage";
import PostJobPage from "./Pages/PostJobPage";
import JobdescPage from "./Pages/jobDescPage";
import ApplyJobPage from "./Pages/ApplyJobPage";
import CompanyPage from "./Pages/CompannyPage";
import PostedJOb from "./Pages/PostedJobPage";
import PostedJobPage from "./Pages/PostedJobPage";
// @ts-ignore: side-effect CSS import has no type declarations
import "@mantine/dates/styles.css";
import JobHistoryPage from "./Pages/JobHistoryPage";
import SignUpPage from "./Pages/SignUpPage";
import ProfilePage from "./Pages/ProfilePage";
// @ts-ignore: side-effect CSS import has no type declarations
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import Store from "./Store";
import AppRoutes from "./Pages/AppRoutes";
import { useEffect } from "react";
import { setupResponseInterceptor } from "./Intercepter/AxiosIntercepter";
// ‼️ import dates styles after core package styles

// import { IconArrowLeft, IconSettings } from '@tabler/icons-react';

function App() {
  


  const theme = createTheme({
    focusRing: "never",
    fontFamilyMonospace: "poppins, sans-serif",
    primaryColor: "bright-sun",
    primaryShade: 4,
    colors: {
      "mine-shaft": [
        "#212121",
        "#1e1e1e",
        "#1b1b1b",
        "#181818",
        "#151515",
        "#121212",
        "#0f0f0f",
        "#0c0c0c",
        "#090909",
        "#060606",
      ],
      "bright-sun": [
        "#ffcc00",
        "#ffbf00",
        "#ffb300",
        "#ffa600",
        "#ff9900",
        "#ff8d00",
        "#ff8000",
        "#ff7300",
        "#ff6600",
        "#ff5a00",
      ],
    },
    fontFamily: "Poppins, sans-serif",
  });

  return (

    <Provider store={Store}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Notifications position="top-center" zIndex={1000} />
        <AppRoutes />
       
      </MantineProvider>
    </Provider>
  );
}

export default App;
