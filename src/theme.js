import { createTheme } from "@mui/material/styles";
import { purple, indigo } from "@mui/material/colors";


export const theme = createTheme({
  shadows: ["none"],
  palette: {
    primary: {
      main: '#ad1457',
    },
    secondary: {
      main: '#616161',
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
