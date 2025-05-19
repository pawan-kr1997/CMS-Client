"use client";
import React from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
  vaccinationStatus: string;
  height: string;
  weightKg: string;
  weightGrams: string;
  bmi: string;
  nutritionStatus: string;
  enrolledFeedingProgram: boolean;
}

const initialValues: FormValues = {
  vaccinationStatus: "",
  height: "",
  weightKg: "",
  weightGrams: "",
  bmi: "",
  nutritionStatus: "",
  enrolledFeedingProgram: false,
};

const validationSchema = Yup.object({
  vaccinationStatus: Yup.string().required("Required"),
  height: Yup.number()
    .typeError("Must be a number")
    .required("Required")
    .min(1),
  weightKg: Yup.number()
    .typeError("Must be a number")
    .required("Required")
    .min(0),
  weightGrams: Yup.number()
    .typeError("Must be a number")
    .required("Required")
    .min(0),
  bmi: Yup.number()
    .typeError("BMI must be a number")
    .required("BMI is auto-calculated"),
  nutritionStatus: Yup.string().required("Required"),
});

const MultiStepFormTwo = () => {
  const handleSaveAsDraft = (values: FormValues) => {
    console.log("Draft saved (Vaccination):", values);
  };

  const calculateBMI = (
    values: FormValues,
    setFieldValue: FormikHelpers<FormValues>["setFieldValue"]
  ) => {
    const weight =
      Number(values.weightKg || 0) + Number(values.weightGrams || 0) / 1000;
    const heightM = Number(values.height || 0) / 100;

    if (weight > 0 && heightM > 0) {
      const bmi = weight / (heightM * heightM);
      setFieldValue("bmi", bmi.toFixed(2));
    } else {
      setFieldValue("bmi", "");
    }
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
          Vaccination & Nutrition
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form Two Submitted:", values);
          }}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap={3}>
                <TextField
                  fullWidth
                  name="vaccinationStatus"
                  label="Vaccination Status"
                  value={values.vaccinationStatus}
                  onChange={handleChange}
                  error={
                    touched.vaccinationStatus &&
                    Boolean(errors.vaccinationStatus)
                  }
                  helperText={
                    touched.vaccinationStatus && errors.vaccinationStatus
                  }
                />

                <TextField
                  fullWidth
                  name="height"
                  label="Height (cm)"
                  type="number"
                  value={values.height}
                  onChange={(e) => {
                    handleChange(e);
                    setTimeout(() => calculateBMI(values, setFieldValue), 0);
                  }}
                  error={touched.height && Boolean(errors.height)}
                  helperText={touched.height && errors.height}
                />

                <Box display="flex" gap={2}>
                  <TextField
                    fullWidth
                    name="weightKg"
                    label="Weight (kg)"
                    type="number"
                    value={values.weightKg}
                    onChange={(e) => {
                      handleChange(e);
                      setTimeout(() => calculateBMI(values, setFieldValue), 0);
                    }}
                    error={touched.weightKg && Boolean(errors.weightKg)}
                    helperText={touched.weightKg && errors.weightKg}
                  />
                  <TextField
                    fullWidth
                    name="weightGrams"
                    label="Weight (g)"
                    type="number"
                    value={values.weightGrams}
                    onChange={(e) => {
                      handleChange(e);
                      setTimeout(() => calculateBMI(values, setFieldValue), 0);
                    }}
                    error={touched.weightGrams && Boolean(errors.weightGrams)}
                    helperText={touched.weightGrams && errors.weightGrams}
                  />
                </Box>

                <TextField
                  fullWidth
                  name="bmi"
                  label="BMI"
                  value={values.bmi}
                  InputProps={{ readOnly: true }}
                  error={touched.bmi && Boolean(errors.bmi)}
                  helperText={touched.bmi && errors.bmi}
                />

                <TextField
                  fullWidth
                  name="nutritionStatus"
                  label="Nutrition Status"
                  value={values.nutritionStatus}
                  onChange={handleChange}
                  error={
                    touched.nutritionStatus && Boolean(errors.nutritionStatus)
                  }
                  helperText={touched.nutritionStatus && errors.nutritionStatus}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.enrolledFeedingProgram}
                      onChange={(e) =>
                        setFieldValue(
                          "enrolledFeedingProgram",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Are you enrolled in a feeding program?"
                />

                <Box display="flex" justifyContent="flex-end" gap={2}>
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
                    onClick={() => handleSaveAsDraft(values)}
                  >
                    Submit
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

export default MultiStepFormTwo;
