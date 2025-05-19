"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@/components/common/cards/profile/ProfileCard";
import CustomSearchInput from "@/components/common/search/CustomSearch";
import { Box, Button, Container, Typography } from "@mui/material";
import theme from "@/utils/theme";

import { FormData } from "@/components/form/MultiStepForm";
import { useSyncForm } from "@/apis/workers";
import { toast } from "react-toastify";

export default function FormSyncPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [draftForms, setDraftForms] = useState<FormData[]>([]);

  const { mutate, isPending } = useSyncForm();

  const handleSyncData = () => {
    const drafts = JSON.parse(localStorage.getItem("formDrafts") || "[]");

    if (!drafts || drafts.length === 0) {
      toast.info("No Data to be synced!!");
    }

    if (drafts.length > 0) {
      mutate(
        {
          forms: drafts,
        },
        {
          onSuccess: () => {
            localStorage.removeItem("formDrafts");
            router.push("/");
            toast("Sync Successful");
          },
        }
      );
    }
  };

  // Load drafts from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDrafts = JSON.parse(
        localStorage.getItem("formDrafts") || "[]"
      );
      setDraftForms(savedDrafts);
    }
  }, []);

  // Delete draft by ID
  const handleDeleteDraft = (uuid: string | undefined) => {
    if (!uuid) return;

    // Filter out the draft with the given UUID
    const updatedDrafts = draftForms.filter((form) => form.uuid !== uuid);

    // Update the state and localStorage
    setDraftForms(updatedDrafts);
    localStorage.setItem("formDrafts", JSON.stringify(updatedDrafts));

    // Show a success toast
    toast.success("Draft deleted successfully!");
  };

  // Filter based on search input
  const filteredDrafts = draftForms.filter((form) => {
    const search = searchValue.toLowerCase();
    return (
      [form.firstName, form.lastName]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search) || form.gender?.toLowerCase().includes(search)
    );
  });

  return (
    <Box
      sx={{
        py: 6,
        color: theme.palette.text.primary,
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" fontWeight={700} color="text.primary">
            Form Sync Page
          </Typography>
          <Button
            variant="contained"
            disableElevation
            disabled={isPending}
            onClick={() => router.push("/")}
          >
            Back
          </Button>
        </Box>

        <Typography variant="subtitle1" color="text.primary" mb={4}>
          List of all the forms waiting to be synced with the server.
        </Typography>

        <Box textAlign="center" my={2}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSyncData}
          >
            Sync Data
          </Button>
        </Box>

        <Box mb={4}>
          <CustomSearchInput
            value={searchValue}
            setValue={setSearchValue}
            placeholder="Search by name or ID..."
          />
        </Box>

        <Box display="flex" flexDirection="column" gap={3} mb={5}>
          {filteredDrafts.length > 0 ? (
            filteredDrafts.map((form, index) => (
              <ProfileCard
                link={`/form-sync/${form.uuid}`}
                key={index}
                id={form.uuid}
                firstName={form.firstName}
                lastName={form.lastName}
                age={form.age}
                gender={form.gender}
                state={form.state}
                nutritionStatus={form.nutritionStatus}
                onDelete={handleDeleteDraft}
                showDeleteButton={true}
                showEditButton={true}
                editLink={`/entry-new?uuid=${form.uuid}&edit=true`}
              />
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No forms to sync.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}
