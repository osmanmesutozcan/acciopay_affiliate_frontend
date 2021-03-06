import { ToastContainer } from "react-toastify";
import "../styles/globals.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { primaryColor } from "../utils/config";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: primaryColor,
      dark: "#002884",
      contrastText: "#fff",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
