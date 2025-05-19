"use client";
import { Box, Chip, Link, Typography, useTheme } from "@mui/material";
import NextLink from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface Props {
  link: string;
  title: string;
  count?: number;
}

const FormLink = ({ link, title, count }: Props) => {
  const theme = useTheme();

  console.log(count);

  return (
    <Link
      component={NextLink}
      href={link}
      underline="none"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        borderRadius: 2,
        border: `1.5px solid ${theme.palette.divider}`,
        boxShadow: "none",
        color: theme.palette.text.primary,
        textDecoration: "none",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {title}
        </Typography>
        {(count || false) && (
          <Chip
            sx={{
              backgroundColor: "#FFF3CD",
              fontWeight: "bold",
              color: "#856404",
            }}
            label={`Pending (${count})`}
          />
        )}
      </Box>

      <KeyboardArrowRightIcon
        sx={{
          fontSize: 28,
          color: theme.palette.text.secondary,
        }}
      />
    </Link>
  );
};

export default FormLink;
