import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { GeneralDetails } from "./MultiStepForm";

interface Props {
  data: GeneralDetails;
  onNext: (data: Partial<GeneralDetails>) => void;
}

const validationSchema = Yup.object({
  familyId: Yup.string().required("Please provide family ID"),
  cohort: Yup.string().required("Please select cohort"),
  firstName: Yup.string().required("Please provide first name"),
  lastName: Yup.string().required("Please provide last name"),
  dob: Yup.date().required("Please select date of birth"),
  age: Yup.number()
    .min(0, "Age must be more than 0")
    .max(10, "Age must not be more than 10"),
  gender: Yup.string().required("Please select a gender"),
  state: Yup.string().required("Please select a state"),
});

const MultiStepFormOne: React.FC<Props> = ({ data, onNext }) => {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        General Details
      </Typography>

      <Formik
        initialValues={data}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values) => onNext(values)}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                name="familyId"
                label="Family ID"
                value={values.familyId}
                onChange={handleChange}
                error={touched.familyId && Boolean(errors.familyId)}
                helperText={touched.familyId && errors.familyId}
              />
              <TextField
                select
                name="cohort"
                label="Cohort"
                value={values.cohort}
                onChange={handleChange}
                error={touched.cohort && Boolean(errors.cohort)}
                helperText={touched.cohort && errors.cohort}
              >
                <MenuItem value="2022-23">2022-23</MenuItem>
                <MenuItem value="2023-24">2023-24</MenuItem>
                <MenuItem value="2024-25">2024-25</MenuItem>
              </TextField>

              <TextField
                name="firstName"
                label="First Name"
                value={values.firstName}
                onChange={handleChange}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
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
                    },
                  }}
                />
              </LocalizationProvider>

              <TextField
                name="age"
                label="Age"
                type="number"
                value={values.age}
                disabled
                onChange={handleChange}
                error={touched.age && Boolean(errors.age)}
                helperText={touched.age && errors.age}
              />

              <TextField
                select
                name="gender"
                label="Gender"
                value={values.gender}
                onChange={handleChange}
                error={touched.gender && Boolean(errors.gender)}
                helperText={touched.gender && errors.gender}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </TextField>

              <TextField
                select
                name="state"
                label="State"
                value={values.state}
                onChange={handleChange}
                error={touched.state && Boolean(errors.state)}
                helperText={touched.state && errors.state}
              >
                <MenuItem value="karnataka">Karnataka</MenuItem>
                <MenuItem value="madhya pradesh">Madhya Pradesh</MenuItem>
                <MenuItem value="uttar pradesh">Uttar Pradesh</MenuItem>
              </TextField>

              <Button type="submit" variant="contained">
                Continue
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default MultiStepFormOne;
