"use client";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useColorScheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeToggleSwitch() {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;

  const isDark = mode === "dark";

  const toggleMode = () => {
    setMode(isDark ? "light" : "dark");
  };

  return (
    <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`}>
      <IconButton onClick={toggleMode} sx={{ ml: "auto" }} color="inherit">
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
