"use client";

import { useFetchFormCount } from "@/apis/workers";
import FormLink from "@/components/form-link/FormLink";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [draftFormCount, setDraftFormCount] = useState(0);

  // Load draft form count from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const drafts = JSON.parse(localStorage.getItem("formDrafts") || "[]");
      setDraftFormCount(drafts.length);
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        px: 2,
        mt: 10,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Hi, Health Worker
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Choose an option below to continue your work.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 4,
            minHeight: 100,
          }}
        >
          <FormLink title="Submitted Forms" link="form-submit" />

          <FormLink
            title="Saved Forms"
            link="form-sync"
            count={draftFormCount}
          />
        </Box>

        <Button
          variant="contained"
          size="large"
          LinkComponent={Link}
          href="/entry-new"
          sx={{
            px: 4,
            fontWeight: 600,
          }}
        >
          Make New Entry
        </Button>
      </Container>
    </Box>
  );
}
