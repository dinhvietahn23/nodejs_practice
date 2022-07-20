import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Stack, styled, Typography } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Navbar from "./components/Navbar";
import Add from "./components/Add"

function App() {
  return (
    <Box>
      <Navbar/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Feed />
        <Rightbar />
      </Stack>
      <Add/>
    </Box>
  );
}

export default App;
