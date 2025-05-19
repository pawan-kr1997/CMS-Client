import { axiosGet, axiosPost } from "@/config/axiosClient";
import { HEALTH_WORKER_ENDPOINT } from "@/utils/urls";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Form, CreateFormInput, ApiResponse } from "@/types";
import { toast } from "react-toastify";

// --- Query Keys ---
const QUERY_KEYS = {
  forms: {
    all: ["forms"] as const,
    detail: (uuid: string) => ["forms", "detail", uuid] as const,
    count: ["forms", "count"] as const,
    create: ["forms", "create"] as const,
    sync: ["form", "sync"] as const,
  },
};

// --- Queries ---

// Fetch all forms
export const useFetchForms = () => {
  return useQuery<Form[]>({
    queryKey: QUERY_KEYS.forms.all,
    queryFn: async () => {
      const res = await axiosGet<ApiResponse<Form[]>>(
        HEALTH_WORKER_ENDPOINT.form
      );
      return res.data.body;
    },
  });
};

// Fetch form by UUID
export const useFetchFormById = (uuid: string) => {
  return useQuery<Form>({
    queryKey: QUERY_KEYS.forms.detail(uuid),
    queryFn: async () => {
      const res = await axiosGet<ApiResponse<Form>>(
        HEALTH_WORKER_ENDPOINT.formId(uuid)
      );
      return res.data.body;
    },
    enabled: !!uuid,
  });
};

// Fetch form count
export const useFetchFormCount = () => {
  return useQuery<any>({
    queryKey: QUERY_KEYS.forms.count,
    queryFn: async () => {
      const res = await axiosGet<ApiResponse<any>>(
        HEALTH_WORKER_ENDPOINT.formCount
      );
      return res.data.body;
    },
  });
};

// --- Mutations ---

// Create a new form
export const useCreateForm = () => {
  return useMutation<Form, Error, CreateFormInput>({
    mutationKey: QUERY_KEYS.forms.create,
    mutationFn: async (params) => {
      const res = await axiosPost<ApiResponse<Form>>(
        HEALTH_WORKER_ENDPOINT.postForm,
        params
      );
      return res.data.body;
    },
    onError: (error) => {
      toast.error(`Failed to submit form: ${error.message || "Unknown error"}`);
    },
  });
};

export const useSyncForm = () => {
  return useMutation<Form, Error, CreateFormInput>({
    mutationKey: QUERY_KEYS.forms.create,
    mutationFn: async (params) => {
      const res = await axiosPost<ApiResponse<Form>>(
        HEALTH_WORKER_ENDPOINT.formBulk,
        params
      );
      return res.data.body;
    },
    onError: (error) => {
      toast.error(`Sync failed: ${error.message || "Unknown error"}`);
    },
  });
};
