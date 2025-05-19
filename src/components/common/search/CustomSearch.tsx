"use client";
import React from "react";
import { TextField, InputAdornment, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}

const CustomSearchInput: React.FC<SearchInputProps> = ({
  value,
  setValue,
  placeholder = "Search...",
}) => {
  const theme = useTheme(); // Using theme to apply consistent colors

  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        borderRadius: 2,
        boxShadow: "none",
        border: `1.5px solid text.primary`,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          "& fieldset": {
            borderColor: "text.primary",
          },
          "& input": {
            backgroundColor: "transparent",
            color: "text.light",
          },
        },
        "& .MuiInputAdornment-root .MuiSvgIcon-root": {
          color:
            theme.palette.mode === "dark"
              ? theme.palette.grey[400]
              : theme.palette.grey[600],
          transition: "color 0.2s",
        },
      }}
    />
  );
};

export default CustomSearchInput;
