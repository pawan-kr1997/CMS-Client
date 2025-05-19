// Form entity shape
export interface Form {
  uuid: string;
  title: string;
  cohort: string;
  description: string;
  first_name: string;
  last_name: string;
  age: string;
  bmi: number;
  gender: "Male" | "Female" | "Other";
  state: string;
  district: string;
  nutrition_status: "Well-nourished" | "Malnourished" | "At risk" | string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null; // ISO date string
  dob: string; // ISO date string
  enrolled_feeding_program: boolean;
  family_id: string;
  height: number;
  weight: number;
  vaccination_status: string;
  additionalNotes?: string;
}

// Input for creating a form
export interface CreateFormInput {
  familyId: string;
  cohort: string;
  firstName: string;
  lastName: string;
  dob: string | null; // ISO date string
  age: string;
  gender: string;
  state: string;
  vaccinationStatus: string;
  height: string;
  weightKg: string;
  weightGrams: string;
  bmi: string;
  nutritionStatus: string;
  enrolledFeedingProgram: boolean;
  additionalNotes?: string;
}

// API response shape
export interface ApiResponse<T> {
  body: T;
}
