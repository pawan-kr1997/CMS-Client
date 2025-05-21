"use client";

import { CreateFormInput } from "@/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
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
  const [profile, setProfile] = useState<CreateFormInput | null>(null);

  useEffect(() => {
    console.log("iinside");
    const data = localStorage.getItem("formDrafts");

    if (data) {
      const parsed: CreateFormInput[] = JSON.parse(data);
      const matchingProfile = parsed.find((item) => item.uuid === uuid);
      setProfile(matchingProfile || null);
    }
  }, [uuid]);

  console.log("Profile", profile);

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
        <Grid container spacing={{ xs: 0, md: 4 }}>
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
              value={`${(
                Number(profile.weightKg) +
                Number(profile.weightGrams) / 1000
              ).toFixed(2)} kg`}
            />
            <Field label="BMI" value={Number(profile.bmi).toFixed(1)} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Status Info */}
        <Grid container spacing={{ xs: 0, md: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Field
              label="Vaccination Status"
              value={profile.vaccinationStatus}
            />
            <Field label="Nutrition Status" value={profile.nutritionStatus} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Field
              label="Feeding program status"
              value={
                profile.enrolledFeedingProgram ? "Enrolled" : "Not Enrolled"
              }
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
    <Typography
      variant="body1"
      color="text.primary"
      textTransform={"capitalize"}
    >
      {value}
    </Typography>
  </Box>
);

const capitalize = (text: string) =>
  text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";
