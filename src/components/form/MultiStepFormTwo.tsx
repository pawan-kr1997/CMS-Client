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
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { VaccinationDetails } from "./MultiStepForm";

interface Props {
  isPending: boolean;
  data: VaccinationDetails;
  onSubmit: (data: Partial<VaccinationDetails>) => void;
  onSaveDraft: (data: Partial<VaccinationDetails>) => void;
}

const validationSchema = Yup.object({
  vaccinationStatus: Yup.string().required("Required"),
  height: Yup.number().required("Required").min(1),
  weightKg: Yup.number().required("Required").min(0),
  weightGrams: Yup.number().required("Required").min(0),
  bmi: Yup.number().required("Required"),
  nutritionStatus: Yup.string().required("Required"),
});

const MultiStepFormTwo: React.FC<Props> = ({
  isPending,
  data,
  onSubmit,
  onSaveDraft,
}) => {
  const calculateBMI = (
    values: VaccinationDetails,
    setFieldValue: FormikHelpers<VaccinationDetails>["setFieldValue"]
  ) => {
    const weight =
      Number(values.weightKg || 0) + Number(values.weightGrams || 0) / 1000;
    const heightM = Number(values.height || 0) / 100;

    if (weight > 0 && heightM > 0) {
      const bmi = weight / (heightM * heightM);
      setFieldValue("bmi", parseFloat(bmi.toFixed(2)));
    } else {
      setFieldValue("bmi", "");
    }
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
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values, handleChange, setFieldValue, touched, errors }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                select
                name="vaccinationStatus"
                label="Vaccination Status"
                value={values.vaccinationStatus}
                onChange={handleChange}
                error={
                  touched.vaccinationStatus && Boolean(errors.vaccinationStatus)
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
                onChange={(e) => {
                  handleChange(e);
                  setTimeout(() => calculateBMI(values, setFieldValue), 0);
                }}
                error={touched.height && Boolean(errors.height)}
                helperText={touched.height && errors.height}
              />
              <Box display="flex" gap={2}>
                <TextField
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
                name="bmi"
                label="BMI"
                value={values.bmi}
                InputProps={{ readOnly: true }}
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
                      setFieldValue("enrolledFeedingProgram", e.target.checked)
                    }
                  />
                }
                label="Are you enrolled in a feeding program?"
              />

              <Box display="flex" justifyContent="space-between" gap={2}>
                <Button
                  fullWidth
                  disabled={isPending}
                  onClick={() => onSaveDraft(values)}
                  type="button"
                  variant="outlined"
                >
                  Save Draft
                </Button>
                <Button
                  fullWidth
                  disabled={isPending}
                  disableElevation
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default MultiStepFormTwo;
