import "./App.css";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import { Home } from "./components/Home";

const theme = createTheme({
  palette: {
    primary: { main: "#00539f" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <div className="App-body">
          <Home />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
