"use client";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import MultiStepFormOne from "./MultiStepOne";
import MultiStepFormTwo from "./MultiStepFormTwo";
import { useCreateForm } from "@/apis/workers";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export interface UUID {
  uuid?: string;
}

export interface GeneralDetails {
  familyId: string;
  cohort: string;
  firstName: string;
  lastName: string;
  dob: any;
  age: string;
  gender: string;
  state: string;
}

export interface VaccinationDetails {
  vaccinationStatus: string;
  height: string;
  weightKg: string;
  weightGrams: string;
  bmi: string;
  nutritionStatus: string;
  enrolledFeedingProgram: boolean;
}

export type FormData = GeneralDetails & VaccinationDetails & UUID;

const steps = ["General Details", "Vaccination & Nutrition"];

const MultiStepForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isEdit = searchParams.get("edit") === "true";
  const uuid = searchParams.get("uuid");

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    familyId: "",
    cohort: "",
    firstName: "",
    lastName: "",
    dob: null,
    age: "",
    gender: "",
    state: "",
    vaccinationStatus: "",
    height: "",
    weightKg: "",
    weightGrams: "0",
    bmi: "",
    nutritionStatus: "",
    enrolledFeedingProgram: false,
  });

  const { mutate, isPending } = useCreateForm();

  const handleNext = (stepData: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setActiveStep((prev) => prev + 1);
  };

  const handleSubmit = (finalData: Partial<FormData>) => {
    const fullData: FormData = {
      ...formData,
      ...finalData,
      state: formData.state.toLowerCase(),
    };

    mutate(fullData, {
      onSuccess: () => {
        if (fullData.uuid) {
          const existingDrafts = JSON.parse(
            localStorage.getItem("formDrafts") || "[]"
          ) as FormData[];

          const updatedDrafts = existingDrafts.filter(
            (draft) => draft.uuid !== fullData.uuid
          );

          localStorage.setItem("formDrafts", JSON.stringify(updatedDrafts));
        }

        router.replace("/form-submit");
      },
    });
  };

  const handleSaveDraft = (finalData: Partial<FormData>) => {
    const updatedUUID = formData.uuid || uuidv4();

    const fullData: FormData = {
      ...formData,
      ...finalData,
      uuid: updatedUUID,
    };

    const existingDrafts = JSON.parse(
      localStorage.getItem("formDrafts") || "[]"
    ) as FormData[];

    // Check if a draft with the same UUID exists
    const draftIndex = existingDrafts.findIndex(
      (draft) => draft.uuid === updatedUUID
    );

    let updatedDrafts;
    if (draftIndex !== -1) {
      // Update existing draft
      existingDrafts[draftIndex] = fullData;
      updatedDrafts = existingDrafts;
    } else {
      // Append new draft
      updatedDrafts = [...existingDrafts, fullData];
    }

    localStorage.setItem("formDrafts", JSON.stringify(updatedDrafts));
    router.replace("/form-sync");
  };

  useEffect(() => {
    if (isEdit && uuid) {
      const drafts = JSON.parse(localStorage.getItem("formDrafts") || "[]");
      const matched = drafts.find((draft: FormData) => draft.uuid === uuid);

      if (matched) {
        setFormData({
          ...matched,
          dob: matched.dob ? dayjs(matched.dob) : null,
        });
      } else {
        // fallback in case data is not found
        console.warn(`No draft found with uuid: ${uuid}`);
      }
    }
  }, [isEdit, uuid]);

  return (
    <Box sx={{ width: "100%", maxWidth: 700, mx: "auto", py: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {activeStep === 0 && (
          <MultiStepFormOne data={formData} onNext={handleNext} />
        )}
        {activeStep === 1 && (
          <MultiStepFormTwo
            isPending={isPending}
            data={formData}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
          />
        )}
      </Box>
    </Box>
  );
};

export default MultiStepForm;
