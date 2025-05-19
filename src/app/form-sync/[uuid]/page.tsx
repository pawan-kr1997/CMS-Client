"use client";

import { Form } from "@/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FormSyncSinglePage() {
  const router = useRouter();
  const { uuid } = useParams() as { uuid: string };
  const [profile, setProfile] = useState<Form | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("formDrafts");

    if (data) {
      const parsed: Form[] = JSON.parse(data);
      const matchingProfile = parsed.find((item) => item.uuid === uuid);
      setProfile(matchingProfile || null);
    }
  }, [uuid]);

  if (!profile) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h6" color="text.secondary">
          Loading profile...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow: 3,
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Field label="Family ID" value={profile.familyId} />
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Basic Info */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Field
              label="Full Name"
              value={`${profile.firstName} ${profile.lastName}`}
            />
            <Field
              label="Date of Birth"
              value={dayjs(profile.dob).format("MMMM D, YYYY")}
            />
            <Field label="Age" value={`${profile.age} years`} />
            <Field label="Gender" value={capitalize(profile.gender)} />
            <Field label="State" value={capitalize(profile.state)} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field label="Cohort" value={profile.cohort} />
            <Field label="Height" value={`${profile.height} cm`} />
            <Field
              label="Weight"
              value={`${(profile.weight / 1000).toFixed(2)} kg`}
            />
            <Field label="BMI" value={profile.bmi.toFixed(1)} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        {/* Status Info */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Nutrition Status
            </Typography>
            <Chip
              label={capitalize(profile.nutritionStatus)}
              color={profile.nutritionStatus === "poor" ? "error" : "success"}
              variant="filled"
              sx={{ mt: 1 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Vaccination Status
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {capitalize(profile.vaccinationStatus)}
            </Typography>
          </Grid>

          <Grid size={12}>
            <Typography variant="subtitle1" fontWeight={600}>
              Enrolled in Feeding Program
            </Typography>
            <Chip
              label={profile.enrolledFeedingProgram ? "Yes" : "No"}
              color={profile.enrolledFeedingProgram ? "success" : "default"}
              variant="filled"
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

// Helper components
const Field = ({ label, value }: { label: string; value: string | number }) => (
  <Box mb={2}>
    <Typography
      variant="subtitle2"
      fontWeight={600}
      color="text.secondary"
      gutterBottom
    >
      {label}
    </Typography>
    <Typography variant="body1" color="text.primary">
      {value}
    </Typography>
  </Box>
);

const capitalize = (text: string) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";
