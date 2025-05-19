"use client";
import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const initialValues = {
  familyId: "",
  cohort: "",
  firstName: "",
  lastName: "",
  dob: null,
  age: "",
  gender: "",
  state: "",
};

const validationSchema = Yup.object({
  familyId: Yup.string().required("Required"),
  cohort: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  dob: Yup.date().required("Required"),
  age: Yup.number().required("Required").min(0),
  gender: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
});

const MultiStepFormOne = () => {
  const handleContinueClick = (values: typeof initialValues) => {
    console.log("Draft saved (General):", values);
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: { xs: 4, md: 6 },
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 600,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          textAlign: "center",
          border: (theme) => `1.5px solid ${theme.palette.primary.main}22`,
          boxShadow: (theme) => `0 8px 32px 0 ${theme.palette.primary.main}22`,
          backdropFilter: "blur(2px)",
        }}
      >
        <Typography variant="h5" fontWeight={600} gutterBottom>
          General Details
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form One Submitted:", values);
          }}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={3}>
                <TextField
                  fullWidth
                  name="familyId"
                  label="Family ID"
                  value={values.familyId}
                  onChange={handleChange}
                  error={touched.familyId && Boolean(errors.familyId)}
                  helperText={touched.familyId && errors.familyId}
                />

                <TextField
                  select
                  fullWidth
                  name="cohort"
                  label="Cohort"
                  value={values.cohort}
                  onChange={handleChange}
                  error={touched.cohort && Boolean(errors.cohort)}
                  helperText={touched.cohort && errors.cohort}
                >
                  <MenuItem value="2025-01-01">Jan 1, 2025</MenuItem>
                  <MenuItem value="2025-02-01">Feb 1, 2025</MenuItem>
                  <MenuItem value="2025-03-01">Mar 1, 2025</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <TextField
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    value={values.dob}
                    onChange={(date) => {
                      setFieldValue("dob", date);
                      if (date) {
                        const age = dayjs().diff(date, "year");
                        setFieldValue("age", age);
                      }
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: touched.dob && Boolean(errors.dob),
                        helperText: touched.dob && errors.dob,
                      },
                    }}
                  />
                </LocalizationProvider>

                <TextField
                  fullWidth
                  name="age"
                  label="Age"
                  type="number"
                  value={values.age}
                  onChange={handleChange}
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                />

                <TextField
                  fullWidth
                  name="gender"
                  label="Gender"
                  value={values.gender}
                  onChange={handleChange}
                  error={touched.gender && Boolean(errors.gender)}
                  helperText={touched.gender && errors.gender}
                />

                <TextField
                  fullWidth
                  name="state"
                  label="State"
                  value={values.state}
                  onChange={handleChange}
                  error={touched.state && Boolean(errors.state)}
                  helperText={touched.state && errors.state}
                />

                <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: "none",
                      px: 3,
                      boxShadow: "none",
                      transition: "background 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        backgroundColor: (theme) => theme.palette.action.hover,
                        boxShadow: (theme) => theme.shadows[1],
                      },
                    }}
                    onClick={() => handleContinueClick(values)}
                  >
                    Continue
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default MultiStepFormOne;
