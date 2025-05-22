import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, useFormikContext } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import { VaccinationDetails } from "./MultiStepForm";

interface Props {
  isPending: boolean;
  data: VaccinationDetails;
  onSubmit: (data: Partial<VaccinationDetails>) => void;
  onSaveDraft: (data: Partial<VaccinationDetails>) => void;
}

const validationSchema = Yup.object({
  vaccinationStatus: Yup.string().required(
    "Please select a vaccination status"
  ),
  height: Yup.number()
    .required("Please provide height")
    .min(1, "Please provide valid height"),
  weightKg: Yup.number()
    .required("Please provide weight")
    .min(0, "Please provide valid weight"),
  weightGrams: Yup.number()
    .required("Please provide weight")
    .min(0, "Please provide valid weight"),
  bmi: Yup.number()
    .required("Please provide BMI")
    .min(1, "Please provide valid BMI"),
  nutritionStatus: Yup.string().required("Please select nutrition status"),
});

const MultiStepFormTwo: React.FC<Props> = ({
  isPending,
  data,
  onSubmit,
  onSaveDraft,
}) => {
  const actionRef = useRef("submit");

  const BMIWatcher = () => {
    const { values, setFieldValue } = useFormikContext<VaccinationDetails>();

    useEffect(() => {
      const weight =
        Number(values.weightKg || 0) + Number(values.weightGrams || 0) / 1000;
      const height = Number(values.height || 0) / 100;

      const bmi = weight / (height * height);

      if (weight && height && isFinite(bmi)) {
        setFieldValue("bmi", parseFloat(bmi.toFixed(2)));
      } else {
        setFieldValue("bmi", "");
      }
    }, [values.weightKg, values.weightGrams, values.height, setFieldValue]);

    return null;
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Vaccination & Nutrition
      </Typography>

      <Formik
        initialValues={data}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => {
          if (actionRef.current === "draft") {
            onSaveDraft(values);
          }
          if (actionRef.current === "submit") {
            onSubmit(values);
          }
        }}
      >
        {({ values, handleChange, setFieldValue, touched, errors }) => (
          <>
            <BMIWatcher />
            <Form>
              <Box display="flex" flexDirection="column" gap={3}>
                <TextField
                  select
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
                >
                  <MenuItem value="fully">Fully</MenuItem>
                  <MenuItem value="partially">Partial</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                </TextField>

                <TextField
                  name="height"
                  label="Height (cm)"
                  type="number"
                  value={values.height}
                  onChange={handleChange}
                  slotProps={{ htmlInput: { min: 0 } }}
                  error={touched.height && Boolean(errors.height)}
                  helperText={touched.height && errors.height}
                />
                <Box display="flex" gap={2}>
                  <TextField
                    name="weightKg"
                    label="Weight (kg)"
                    type="number"
                    slotProps={{ htmlInput: { min: 0 } }}
                    onChange={handleChange}
                    value={values.weightKg}
                    error={touched.weightKg && Boolean(errors.weightKg)}
                    helperText={touched.weightKg && errors.weightKg}
                  />
                  <TextField
                    name="weightGrams"
                    label="Weight (g)"
                    type="number"
                    slotProps={{ htmlInput: { min: 0 } }}
                    onChange={handleChange}
                    value={values.weightGrams}
                    error={touched.weightGrams && Boolean(errors.weightGrams)}
                    helperText={touched.weightGrams && errors.weightGrams}
                  />
                </Box>
                <TextField
                  name="bmi"
                  label="BMI"
                  value={values.bmi}
                  disabled
                  error={touched.bmi && Boolean(errors.bmi)}
                  helperText={touched.bmi && errors.bmi}
                />

                <TextField
                  select
                  name="nutritionStatus"
                  label="Nutrition Status"
                  value={values.nutritionStatus}
                  onChange={handleChange}
                  error={
                    touched.nutritionStatus && Boolean(errors.nutritionStatus)
                  }
                  helperText={touched.nutritionStatus && errors.nutritionStatus}
                >
                  <MenuItem value="good">Good</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="poor">Poor</MenuItem>
                </TextField>

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

                <Box display="flex" justifyContent="space-between" gap={2}>
                  <Button
                    fullWidth
                    disabled={isPending}
                    onClick={() => {
                      actionRef.current = "draft";
                    }}
                    type="submit"
                    variant="outlined"
                  >
                    Save Draft
                  </Button>
                  <Button
                    fullWidth
                    disabled={isPending}
                    disableElevation
                    onClick={() => {
                      actionRef.current = "submit";
                    }}
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Form>
          </>
        )}
      </Formik>
    </Paper>
  );
};

export default MultiStepFormTwo;
