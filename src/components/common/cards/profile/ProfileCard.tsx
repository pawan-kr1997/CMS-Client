"use client";

import theme from "@/utils/theme";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NextLink from "next/link";
import React from "react";

type ProfileCardProps = {
  id: string | undefined;
  familyId?: string;
  firstName: string;
  lastName: string;
  age: string;
  link: string;
  gender: string;
  state: string;
  cohort: string;
  nutritionStatus: string;
  showDeleteButton?: boolean;
  showEditButton?: boolean;
  onDelete?: (id: string | undefined) => void;
  editLink?: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  link,
  familyId,
  firstName,
  lastName,
  age,
  cohort,
  gender,
  state,
  showDeleteButton = false,
  showEditButton = false,
  onDelete,
  editLink,
}) => {
  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    onDelete?.(id);
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (editLink) {
      window.location.href = editLink; // Redirect to edit page
    }
  };

  return (
    <Link
      component={NextLink}
      sx={{ textDecoration: "none" }}
      href={link || ""}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: "none",
          position: "relative",
        }}
      >
        {showDeleteButton && (
          <IconButton
            onClick={handleDeleteClick}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
            aria-label="delete"
          >
            <DeleteIcon color="error" />
          </IconButton>
        )}

        {showEditButton && editLink && (
          <IconButton
            onClick={handleEditClick}
            sx={{
              position: "absolute",
              top: 8,
              right: showDeleteButton ? 48 : 8,
              zIndex: 1,
            }}
            aria-label="edit"
          >
            <EditIcon color="primary" />
          </IconButton>
        )}

        <CardActionArea>
          <CardContent>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                color="text.primary"
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginBottom: 1,
                }}
              >
                {firstName} {lastName}
              </Typography>

              <Typography
                sx={{ fontWeight: "bold", color: "gray", fontSize: 14 }}
              >
                {familyId}
              </Typography>
            </Stack>

            <Box
              display="flex"
              justifyContent={"space-between"}
              flexWrap="wrap"
              mb={1}
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ textTransform: "capitalize" }}
              >
                Age: {age} yrs
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ textTransform: "capitalize" }}
              >
                Gender: {gender}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent={"space-between"}
              flexWrap="wrap"
              mb={1}
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ textTransform: "capitalize" }}
              >
                State: {state}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ textTransform: "capitalize" }}
              >
                Cohort: {cohort}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ProfileCard;
